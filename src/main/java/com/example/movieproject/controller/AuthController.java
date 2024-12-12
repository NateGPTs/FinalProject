package com.example.movieproject.controller;

import com.example.movieproject.collection.User;
import com.example.movieproject.service.AuthServices;
import com.example.movieproject.service.UserService;
import jakarta.servlet.http.HttpSession;
import java.util.ArrayList;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@Slf4j
public class AuthController {

  private final UserService userService;

  public AuthController(UserService userService, AuthServices authServices) {
    this.userService = userService;
  }

  @Data
  static
  public class LoginRequest {
    private String username;
    private String password;
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpSession session) {
    try {
      System.out.println("Received login request for username: " + loginRequest.getUsername());

      User user = userService.getUserByUsername(loginRequest.getUsername());

      if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
        session.setAttribute("USER_ID", user.getId());
        System.out.println("Login successful");
        System.out.println("Session id: " + session.getAttribute("USER_ID") +
            "Actual user id: " + user.getId());
        return ResponseEntity.ok(user);
      }

      System.out.println("Login not successful");
      return ResponseEntity.status(401).body("Invalid credentials");
    } catch (Exception e) {
      System.out.println("Error during login: " + e.getMessage());
      e.printStackTrace();
      return ResponseEntity.status(500).body("Internal server error: " + e.getMessage());
    }
  }

  @PostMapping("/register")
  public ResponseEntity<?> registerUser(@RequestBody User newUser) {

    if (userService.getUserByUsername(newUser.getUsername()) != null) {
      return ResponseEntity.badRequest().body("Username already exists");
    }

    newUser.setPost(new ArrayList<>());
    newUser.setComments(new ArrayList<>());
    User savedUser = userService.createUser(newUser);
    return ResponseEntity.ok(savedUser);
  }

  @GetMapping("/check")
  public ResponseEntity<?> checkSession(HttpSession session) {
    String userId = (String) session.getAttribute("USER_ID");
    if (userId != null) {
      User user = userService.getUserById(userId);  // Use getUserById instead
      return ResponseEntity.ok(user);
    }
    return ResponseEntity.status(401).body("Not logged in");
  }

  @PostMapping("/logout")
  public ResponseEntity<?> logout(HttpSession session) {
    session.invalidate();
    return ResponseEntity.ok("Logged out");
  }


}
