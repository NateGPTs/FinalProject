package com.example.movieproject.service;

import com.example.movieproject.collection.post;
import com.example.movieproject.collection.User;
import com.example.movieproject.collection.comment;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

  User getUserById(String id);

  User createUser(User user);

  List<post> getPostHistory(String id);

  void deleteUser(String id);

  User updateUser(User user);

  List<comment> getCommentHistory(String id);

  User getUserByUsername(String username);


}
