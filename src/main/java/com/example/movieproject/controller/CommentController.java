package com.example.movieproject.controller;

import com.example.movieproject.collection.comment;
import com.example.movieproject.service.CommentServices;
import java.util.List;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/comment")
public class CommentController {

  private final CommentServices commentServices;

  public CommentController(CommentServices commentServices) {
    this.commentServices = commentServices;
  }

  @PostMapping("/post")
  public comment postComment(@RequestBody comment comment) {

    return commentServices.postComment(comment);
  }

  @DeleteMapping("/delete")
  public void deleteComment(@RequestBody comment comment) {
    System.out.print("deleting comment: " + comment);
    commentServices.deleteComment(comment);
  }

  @GetMapping
  public List<comment> getMostRecentComments() {

    return commentServices.getMostRecentComments();
  }


}
