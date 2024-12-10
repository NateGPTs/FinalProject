package com.example.movieproject.controller;

import com.example.movieproject.collection.movie;
import com.example.movieproject.collection.post;
import com.example.movieproject.service.MovieServices;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/movie")
public class MovieController {

  private final MovieServices movieService;

  @Autowired
  public MovieController(MovieServices movieService) {
    this.movieService = movieService;
  }

  @GetMapping("/get/{imdbId}")
  public List<post> getMoviePost(@PathVariable String imdbId) {
    try {
      Optional<movie> movieData = movieService.getMovieById(imdbId);
      if (movieData.isPresent()) {
        return movieData.get().getPosts();
      }
    } catch (Exception e) {
     System.out.println("Error: " + e);
    }

    movieService.createMovie(imdbId);
    return new ArrayList<>();
  }

  @PostMapping("/createPost/{imdbId}")
  public post createPost(@PathVariable String imdbId, @RequestBody post post) {
    return movieService.createPost(imdbId, post);
  }

}
