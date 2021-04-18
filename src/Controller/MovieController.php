<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Tmdb\Repository\MovieRepository;

class MovieController extends AbstractController
{
    private MovieRepository $movieRepository;

    public function __construct(MovieRepository $movieRepository)
    {
        $this->movieRepository = $movieRepository;
    }

    /**
     * @Route("/movies/{id}", name="movie")
     */
    public function movie(int $id): Response
    {
        return $this->json($this->movieRepository->load($id));
    }
}
