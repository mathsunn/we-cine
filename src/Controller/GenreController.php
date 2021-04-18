<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Tmdb\Repository\GenreRepository;

class GenreController extends AbstractController
{
    private GenreRepository $genreRepository;

    public function __construct(GenreRepository $genreRepository)
    {
        $this->genreRepository = $genreRepository;
    }

    /**
     * @Route("/genre", name="genre_list")
     */
    public function list(): JsonResponse
    {
        return $this->json($this->genreRepository->loadMovieCollection());
    }

    /**
     * @Route("/genre/{id}/movies", name="genre_movies")
     */
    public function movies(int $id): JsonResponse
    {
        return $this->json($this->genreRepository->getMovies($id));
    }
}
