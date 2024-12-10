package com.example.movieproject.service;

import com.example.movieproject.collection.comment;
import com.example.movieproject.collection.post;
import com.example.movieproject.collection.User;
import com.example.movieproject.repository.PostRepository;
import com.example.movieproject.repository.UserRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final PostRepository postRepository;

  @Autowired
  public UserServiceImpl(UserRepository userRepository, PostRepository postRepository) {
    this.userRepository = userRepository;
    this.postRepository = postRepository;
  }

  @Override
  public User getUserById(String id) {
    return userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
  }

  @Override
  public User createUser(User user) {
    return userRepository.save(user);
  }

  @Override
  public List<post> getPostHistory(String id) {
    return postRepository.findByUserIdOrderByCreatedAtDesc(id);
  }

  @Override
  public void deleteUser(String id) {
    userRepository.deleteById(id);
  }

  @Override
  public User updateUser(User user) {
    return userRepository.save(user);
  }

  @Override
  public List<comment> getCommentHistory(String id) {

    User getUserById = getUserById(id);

    return getUserById.getComments();
  }

  @Override
  public User getUserByUsername(String username) {
    return userRepository.findByUsername(username);
  }


}
