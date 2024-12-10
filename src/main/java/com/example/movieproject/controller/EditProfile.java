package com.example.movieproject.controller;

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

  @Autowired
  public EditProfile(UserService userService, EditProfileServices editProfileServices) {
    this.userService = userService;
    this.editProfileServices = editProfileServices;
  }

  @PutMapping("/update")
  public void updateProfile(@RequestBody Map<String, String> requestData) {

    if (!requestData.containsKey("id")) {
      System.out.println("id is null.");
      throw new IllegalArgumentException("id is null");
    }
    String id = requestData.get("id");
    for (Map.Entry<String, String> field : requestData.entrySet()) {
      editProfileServices.updateUserField(id, field.getKey(), field.getValue());
    }
  }

}
