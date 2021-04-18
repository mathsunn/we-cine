<?php

namespace App\Tests\Controller;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

/**
 * @group api
 */
class GenreControllerTest extends WebTestCase
{
    public function testList(): void
    {
        static::createClient()->request('GET', '/genre');
        $this->assertResponseIsSuccessful();
    }

    public function testgetMovies(): void
    {
        static::createClient()->request('GET', '/genre/28/movies');
        $this->assertResponseIsSuccessful();
    }
}
