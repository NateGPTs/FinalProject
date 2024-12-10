package com.example.movieproject.service;

import com.example.movieproject.collection.User;
import com.example.movieproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EditProfileServices {

  private UserRepository userRepository;

  @Autowired
  public EditProfileServices(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  public void updateUserField(String userId, String fieldName, Object value) {
    userRepository.updateField(userId, fieldName, value);
  }

}
