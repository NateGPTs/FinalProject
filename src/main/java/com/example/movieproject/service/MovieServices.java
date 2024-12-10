package com.example.movieproject.service;

import com.example.movieproject.collection.movie;
import com.example.movieproject.collection.post;
import com.example.movieproject.repository.MovieRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MovieServices {

  private final RestTemplate restTemplate;
  private final MovieRepository movieRepository;
  private final PostServices postServices;

  @Autowired
  public MovieServices(RestTemplate restTemplate, MovieRepository movieRepository,
      PostServices postServices) {
    this.restTemplate = restTemplate;
    this.movieRepository = movieRepository;
    this.postServices = postServices;
  }

  public Optional<movie> getMovieById(String imdbId) {
    return movieRepository.findById(imdbId);
  }

  public movie createMovie(String imdbId) {
    return movieRepository.save(movie.builder().id(imdbId).posts(new ArrayList<>()).build());
  }

  public post createPost(String imdbId, post post) {

    Optional<movie> movie = getMovieById(imdbId);
    if (movie.isPresent()) {
      post created = postServices.createPost(post);
      List<post> posts = movie.get().getPosts();
      posts.add(created);
      movieRepository.updateField(imdbId, "posts", posts);
      return created;
    }
    return null;
  }


}
