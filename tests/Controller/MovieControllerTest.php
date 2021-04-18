<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

/**
 * @group api
 */
class MovieControllerTest extends WebTestCase
{
    public function testgetMovie(): void
    {
        static::createClient()->request('GET', '/movies/544401');
        $this->assertResponseIsSuccessful();
    }
}
