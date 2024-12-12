package com.example.movieproject.service;

import com.example.movieproject.collection.comment;
import com.example.movieproject.collection.post;
import com.example.movieproject.repository.PostRepository;
import com.example.movieproject.repository.UserRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostServices {

  private final PostRepository postRepository;
  private final UserRepository userRepository;

  @Autowired
  public PostServices(PostRepository postRepository, UserRepository userRepository) {
    this.postRepository = postRepository;
    this.userRepository = userRepository;
  }

  public List<post> getMostRecentPosts() {

    return postRepository.findAllByOrderByCreatedAtDesc();

  }



  public List<post> getPostWithSortedComments() {
    try {
      List<post> posts = postRepository.findAllByOrderByCreatedAtDesc();
      System.out.println("getting posts:" + posts);
      posts.forEach(post -> {
        List<comment> sortedComments = post.getComments()
            .stream()
            .sorted((c1, c2) -> c2.getCreatedAt().compareTo(c1.getCreatedAt()))
            .collect(Collectors.toList());
        post.setComments(sortedComments);
      });
      System.out.println("posts sorted" + posts);
      return posts;
    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }

  public post createPost(post post) {
    System.out.println("Received post: " + post.toString());
    System.out.println("MovieId: " + post.getMovieId());
    System.out.println("userId of post: " + post.getUserId());
    List<post> currentPosts = userRepository.findById(post.getUserId()).get().getPost();
    System.out.println("currentPosts: " + currentPosts);
    currentPosts.add(post);
    userRepository.updateField(post.getUserId(), "post", currentPosts);
    System.out.println("currentPosts: " + userRepository.findById(post.getUserId()).get().getPost());

    return postRepository.save(post);
  }

  public void deletePost(String id) {
    postRepository.deleteById(id);
  }


  public void addComment(String postId, comment comment) {

    List<comment> comments = postRepository.findById(postId).get().getComments();
    comments.add(comment);
    postRepository.updateField(postId, "comments", comments);
  }


  public List<post> getMoviePostsSorted(String imdbId) {
    return postRepository.findByMovieIdOrderByCreatedAtDesc(imdbId);
  }
}
