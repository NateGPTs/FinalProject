package com.example.movieproject.controller;

import com.example.movieproject.repository.UserRepository;
import com.example.movieproject.service.EditProfileServices;
import com.example.movieproject.service.UserService;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/edit/profile")
public class EditProfile {

  private final UserService userService;
  private final EditProfileServices editProfileServices;
  private final UserRepository userRepository;

  @Autowired
  public EditProfile(UserService userService, EditProfileServices editProfileServices,
      UserRepository userRepository) {
    this.userService = userService;
    this.editProfileServices = editProfileServices;
    this.userRepository = userRepository;
  }

  @PutMapping("/update")
  public void updateProfile(@RequestBody Map<String, String> requestData) {

    if (!requestData.containsKey("id")) {
      System.out.println("id is null.");
      throw new IllegalArgumentException("id is null");
    }

    if(!requestData.containsKey("username") && userRepository.findByUsername(requestData.get("username")) != null) {
      throw new IllegalArgumentException("username has been taken");
    }

    String id = requestData.get("id");
    for (Map.Entry<String, String> field : requestData.entrySet()) {
      editProfileServices.updateUserField(id, field.getKey(), field.getValue());
    }
  }

}
