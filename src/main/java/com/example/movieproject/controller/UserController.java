package com.example.movieproject.controller;

import com.example.movieproject.collection.comment;
import com.example.movieproject.collection.post;
import com.example.movieproject.collection.User;
import com.example.movieproject.service.UserService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {

  private final UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/{id}")
  public User getUserById(@PathVariable String id) {

    return userService.getUserById(id);
  }

  @PutMapping
  public User updateUser(@RequestBody User user) {

    return userService.updateUser(user);

  }

  @PostMapping
  public void createUser(@RequestBody User user) {
    userService.createUser(user);
  }

  @GetMapping("/{id}/posts")
  public List<post> getPostHistory(@PathVariable String id) {
    return userService.getPostHistory(id);
  }

  @GetMapping("/{id}/comments")
  public List<comment> getCommentHistory(@PathVariable String id) {
    return userService.getCommentHistory(id);
  }

  @DeleteMapping("/{id}/delete")
  public void deleteUser(@PathVariable String id) {

    userService.deleteUser(id);
  }


}
