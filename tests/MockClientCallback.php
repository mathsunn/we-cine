<?php

declare(strict_types=1);

namespace App\Tests;

use Psr\Log\LoggerAwareInterface;
use Psr\Log\LoggerAwareTrait;
use Psr\Log\NullLogger;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpClient\Response\MockResponse;
use Symfony\Component\String\Slugger\AsciiSlugger;
use function Symfony\Component\String\u;
use Symfony\Contracts\HttpClient\HttpClientInterface;
use Symfony\Contracts\HttpClient\ResponseInterface;
use Symfony\Contracts\Service\ResetInterface;

class MockClientCallback implements ResetInterface, LoggerAwareInterface
{
    use LoggerAwareTrait;

    /** @var ResponseInterface[] */
    private array $responses = [];

    private array $requests = [];

    private string $fixtureDir;

    private HttpClientInterface $client;
    private Filesystem $filesystem;
    private bool $record;

    public function __construct(string $fixtureDir, HttpClientInterface $client, Filesystem $filesystem, bool $record = false)
    {
        $this->fixtureDir = $fixtureDir;
        $this->client = $client;
        $this->logger = new NullLogger();
        $this->filesystem = $filesystem;
        $this->record = $record;
    }

    /**
     * @throws \Exception
     */
    public function __invoke(string $method, string $url, array $options = []): ResponseInterface
    {
        $this->requests[] = [$method, $url, $options];

        if (empty($this->responses)) {
            return $this->generateResponse($method, $url, $options);
        }

        return array_shift($this->responses);
    }

    /**
     * @return $this
     */
    public function addResponse(ResponseInterface $response): self
    {
        $this->responses[] = $response;

        return $this;
    }

    public function getRequests(): array
    {
        return $this->requests;
    }

    /**
     * {@inheritdoc}
     */
    public function reset(): void
    {
        $this->responses = [];
        $this->requests = [];
    }

    /**
     * @throws \Exception
     */
    private function generateResponse(string $method, string $url, array $options): ResponseInterface
    {
        $useHash = false;
        $ctx = hash_init('md5');
        $parts = [
            strtoupper($method),
            (new AsciiSlugger())->slug(u($url)->replaceMatches('/api_key=\w+/', '')->toString()),
        ];

        if (!empty($options['query'])) {
            hash_update($ctx, http_build_query($options['query']));
            $useHash = true;
        }

        if ($body = $options['body'] ?? null) {
            hash_update($ctx, $body);
            $useHash = true;
        }

        if ($useHash) {
            $parts[] = u(hash_final($ctx))->slice(0, 6)->toString();
        }

        $filename = sprintf('%s/%s.json', $this->fixtureDir, implode('_', $parts));
        $this->logger->debug('[HTTP_CLIENT][TEST] Calculated filename: "{filename}".', compact('filename'));

        if (!$this->filesystem->exists($filename)) {
            if (!$this->record) {
                $this->logger->critical('[HTTP_CLIENT][TEST] You must create file "{filename}"', compact('filename'));

                throw new \Exception(sprintf('Please create "%s".', $filename));
            }

            $response = $this->client->request($method, $url, $options);

            $this->filesystem->dumpFile($filename, $response->getContent());

            $this->logger->critical('[HTTP_CLIENT][TEST] Fixture file "{filename}" created, please update content.', compact('filename'));

            return $response;
        }

        $this->logger->debug('[HTTP_CLIENT][TEST] Cache HIT.');

        return new MockResponse(file_get_contents($filename));
    }
}
