package com.example.movieproject.service;

import com.example.movieproject.collection.comment;
import com.example.movieproject.collection.post;
import com.example.movieproject.repository.CommentRepository;
import com.example.movieproject.repository.PostRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServices {


  private final CommentRepository commentRepository;
  private final PostRepository postRepository;

  @Autowired
  public CommentServices(CommentRepository commentRepository, PostRepository postRepository) {

    this.commentRepository = commentRepository;
    this.postRepository = postRepository;
  }

  public comment postComment(comment comment) {
    comment.setCreatedAt(LocalDateTime.now());
    // Save comment first to get MongoDB-generated ID
    comment savedComment = commentRepository.save(comment);


    String postId = comment.getPostId();
    Optional<post> post = postRepository.findById(postId);
    if(post.isPresent()) {
      post.get().getComments().add(savedComment);
      postRepository.save(post.get());
    }

    return savedComment;
  }

  public void deleteComment(comment comment) {

    System.out.println("Service layer commencing deletion of comments. Comment:" + comment);
    commentRepository.deleteById(comment.getId());
    System.out.println("comment deleted from comment rep sucessfully.");
    postRepository.deleteCommentById(comment.getPostId(), comment.getId());
    System.out.println("Post deleted from post rep sucessfully.");
  }


  public List<comment> getMostRecentComments() {

    return commentRepository.findAllByOrderByCreatedAtDesc();

  }
}
