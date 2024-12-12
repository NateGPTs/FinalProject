package com.example.movieproject.controller;

import com.example.movieproject.collection.User;
import com.example.movieproject.collection.Watchlist;
import com.example.movieproject.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/watchlist")
public class WatchListController {

  private final UserRepository userRepository;

  @Autowired
  public WatchListController(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @GetMapping("/get/{userId}")
  public List<String> getWatchList(@PathVariable String userId) {

    Optional<User> user = userRepository.findById(userId);

    return user.map(value -> value.getWatchlist().getMovies()).orElse(null);

  }

  @PostMapping("/add/{userId}")
  public boolean addToWatchList(@PathVariable String userId, @RequestBody String imdbId) {

    System.out.println("User: " + userId + " is requesting to add: " + imdbId + " to watchlist");
    Optional<User> user = userRepository.findById(userId);
    System.out.println("User: " + user);
    User user1 = user.get();

    Watchlist watchlist = user1.getWatchlist();
    System.out.println("Watchlist: " + watchlist.getMovies());
    List<String> newWatchlist = watchlist.getMovies();

    newWatchlist.add(imdbId);
    System.out.println("New Watchlist: " + newWatchlist);
    watchlist.setMovies(newWatchlist);
    System.out.println("Watchlist: " + watchlist.getMovies());
    user1.setWatchlist(watchlist);
    System.out.println("User: " + userId + " watchlist is now: " + watchlist.getMovies());
    userRepository.save(user1);
    System.out.println("User: " + userId + " has added " + imdbId + " to watchlist");
    return true;
  }

  @DeleteMapping("/delete/{userId}")
  public boolean deleteFromWatchList(@PathVariable String userId, @RequestBody String imdbId) {
    System.out.println("Requesting deletion.");
    Optional<User> user = userRepository.findById(userId);
    User user1 = user.get();
    Watchlist watchlist = user1.getWatchlist();
    List<String> newWatchlist = watchlist.getMovies();
    newWatchlist.remove(imdbId);
    watchlist.setMovies(newWatchlist);
    user1.setWatchlist(watchlist);
    userRepository.save(user1);
    return true;
  }



}
