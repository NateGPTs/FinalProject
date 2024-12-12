package com.example.movieproject.controller;

import com.example.movieproject.collection.comment;
import com.example.movieproject.collection.post;
import com.example.movieproject.repository.PostRepository;
import com.example.movieproject.service.PostServices;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/post")
public class PostController {

  private final PostServices postServices;
  private final PostRepository postRepository;

  @Autowired
  public PostController(PostServices postServices, PostRepository postRepository) {
    this.postServices = postServices;
    this.postRepository = postRepository;
  }

  @GetMapping("/sortedPC")
  public List<post> getPostWithSortedComments() {
    System.out.println("Fetching sorted posts...");
    List<post> posts = postServices.getPostWithSortedComments();
    System.out.println("Found " + posts.size() + " posts");
    return posts;
  }

  @PostMapping("/create")
  public post createPost(@RequestBody post post) {
    System.out.println("Received post: " + post.toString());
    System.out.println("MovieId: " + post.getMovieId());
    return postServices.createPost(post);
  }

  @PostMapping("/post/comment/{postId}")
  public void addComment(@PathVariable String postId, @RequestBody comment comment) {
    postServices.addComment(postId, comment);
  }

  @DeleteMapping("/delete/{id}")
  public void deletePost(@PathVariable String id) {
    postServices.deletePost(id);
  }

  @GetMapping("/sorted/{imdbId}")
  public List<post> getMoviePostsSorted(@PathVariable String imdbId) {
    try {
      System.out.println("Fetching movie posts sorted for movieId: " + imdbId);
      List<post> posts = postServices.getMoviePostsSorted(imdbId);
      System.out.println("Found " + posts.size() + " posts");
      return posts;
    } catch (Exception e) {
      System.err.println("Error fetching posts: " + e.getMessage());
      e.printStackTrace();
      throw e;
    }
  }

  @GetMapping("/{postId}")
  public post getPost(@PathVariable String postId) {

    post post = postRepository.findById(postId).get();
    System.out.println("post contents from getPost: " + post.toString());
    return post;
  }


}
