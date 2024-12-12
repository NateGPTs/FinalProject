package com.example.movieproject.controller;

import com.example.movieproject.collection.comment;
import com.example.movieproject.collection.post;
import com.example.movieproject.collection.User;
import com.example.movieproject.repository.UserRepository;
import com.example.movieproject.service.UserService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
  private final UserRepository userRepository;

  @Autowired
  public UserController(UserService userService, UserRepository userRepository) {
    this.userService = userService;
    this.userRepository = userRepository;
  }

  @GetMapping("/{id}")
  public User getUserById(@PathVariable String id) {

    return userService.getUserById(id);
  }

  @GetMapping("/nonMod")
  public List<User> getAllNonModUsers() {

    return userRepository.findByModPermsIsFalseOrModPermsIsNull();
  }

  @PutMapping("/promote/{userId}")
  public User modUser(@PathVariable String userId) {

    System.out.println("Attempting to modUser");
    User user = userRepository.findById(userId)
        .orElseThrow(() -> new RuntimeException("User not found"));
    System.out.println("User found " + user);

    user.setModPerms(true);
    System.out.println("Modified user: " + user);

    return userRepository.save(user);

  }


  @GetMapping("/search/{term}")
  public List<User> searchUsers(@PathVariable String term) {
    return userRepository.findByUsernameRegex(".*" + term + ".*");
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

  @GetMapping("/{id}/username")
  public String getUsername(@PathVariable String id) {
    System.out.println("fetching username, the id is:" + id);
    return userService.getUsernameById(id);
  }

  @DeleteMapping("/{id}/delete")
  public void deleteUser(@PathVariable String id) {

    userService.deleteUser(id);
  }




}
