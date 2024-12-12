package com.example.movieproject.controller;

import com.example.movieproject.collection.post;

import com.example.movieproject.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/flagged")
public class FlaggedPostController {

  private final PostRepository postRepository;

  @Autowired
  public FlaggedPostController(PostRepository postRepository) {
    this.postRepository = postRepository;
  }
}
