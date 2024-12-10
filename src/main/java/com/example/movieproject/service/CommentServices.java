package com.example.movieproject.service;

import com.example.movieproject.collection.comment;
import com.example.movieproject.repository.CommentRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentServices {


  private final CommentRepository commentRepository;

  @Autowired
  public CommentServices(CommentRepository commentRepository) {

    this.commentRepository = commentRepository;
  }

  public comment postComment(comment comment) {

    return commentRepository.save(comment);
  }

  public void deleteComment(String id) {

    commentRepository.deleteById(id);
  }


  public List<comment> getMostRecentComments() {

    return commentRepository.findAllByOrderByCreatedAtDesc();

  }
}
