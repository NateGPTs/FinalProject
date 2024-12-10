package com.example.movieproject.service;

import com.example.movieproject.collection.User;
import com.example.movieproject.repository.UserRepository;
import jakarta.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.Collections;
import java.util.stream.Collectors;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthServices {

  private final UserService userService;
  private UserRepository userRepository;


  @Autowired
  public AuthServices(UserService userService, UserRepository userRepository) {
    this.userService = userService;
    this.userRepository = userRepository;
  }

  public void SignUp(String username, String password) {

    if (userRepository.findByUsername(username) != null) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already exists");
    }

    User newUser = User.builder()
        .id(null) // Let MongoDB generate the ID
        .username(username)
        .password(password)
        .comments(new ArrayList<>()) // Initialize empty lists
        .post(new ArrayList<>())
        .build();

    userRepository.save(newUser);
    System.out.println("new user created successfully:" + newUser);
  }


  public boolean validateUser(String username, String password) {

    User user = userRepository.findByUsername(username);

    if (user == null) {
      throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Username not found");
    } else {
      return user.getPassword().equals(password);
    }

  }




}
