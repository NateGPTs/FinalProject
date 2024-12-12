package com.example.movieproject.controller;

import com.example.movieproject.collection.User;
import com.example.movieproject.repository.UserRepository;
import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/follow")
public class FollowerController {

  private final UserRepository userRepository;

  @Autowired
  public FollowerController(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @GetMapping("/getFollowers/{userId}")
  public List<User> getAllFollowers(@PathVariable String userId) {

    return this.userRepository.findByFollowersContains(userId);

  }

  @GetMapping("/getFollowing/{userId}")
  public List<User> getAllFollowing(@PathVariable String userId) {

    User user = userRepository.findById(userId).orElse(null);
    List<String> following = Objects.requireNonNull(user).getFollowing();

    return this.userRepository.findUsersByIds(following);
  }

  @PutMapping("/follow/{userId}")
  public void follow(@PathVariable String userId, @RequestBody String toFollow) {

    User user = userRepository.findById(userId).orElse(null);
    List<String> following = Objects.requireNonNull(user).getFollowing();
    if(!following.contains(toFollow)) {
      following.add(toFollow);
    }
    user.setFollowing(following);

    // Add user1 to user2's follower list.
    User user2 = userRepository.findById(toFollow).orElse(null);
    List<String> followers = Objects.requireNonNull(user2).getFollowers();
    if(!followers.contains(toFollow)) {
      followers.add(toFollow);
    }
    user2.setFollowers(followers);


    userRepository.save(user);
    userRepository.save(user2);
  }

  @PutMapping("/unfollow/{userId}")
  public void unfollow(@PathVariable String userId, @RequestBody String unfollow) {

    // User that will unfollow.
    User user = userRepository.findById(userId).orElse(null);
    List<String> following = Objects.requireNonNull(user).getFollowing();
    following.remove(unfollow);
    user.setFollowing(following);

    // User will be unfollowed.
    User user2 = userRepository.findById(unfollow).orElse(null);
    List<String> followers = Objects.requireNonNull(user2).getFollowers();
    followers.remove(userId);
    user2.setFollowers(following);

    userRepository.save(user);
    userRepository.save(user2);
  }



}
