<?php

namespace App\Tests;

use Symfony\Component\Panther\PantherTestCase;

/**
 * @group e2e
 */
class HomepageTest extends PantherTestCase
{
    public function testHomepageLoadsReactApp(): void
    {
        $client = static::createPantherClient();

        $client->request('GET', '/');
        $this->assertSelectorTextContains('.navbar-brand', 'WeCine');
        $client->waitFor('#genre_12');
        $client->executeScript('document.querySelector(\'#genre_12\').click()');

        $this->assertSelectorWillContain('#movie_791373 .card-title', 'Zack Snyder\'s Justice League');
    }
}
