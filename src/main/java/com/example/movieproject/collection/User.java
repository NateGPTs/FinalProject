package com.example.movieproject.collection;

import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "user")
public class User {

  @Id
  private String id;
  private String username;
  private String firstName;
  private String lastName;
  private String password;
  private List<String> following = new ArrayList<>();
  private List<String> followers = new ArrayList<>();
  private List<post> post = new ArrayList<>();
  private List<comment> comments = new ArrayList<>();
  private String description;
  private boolean modPerms = false;
  private Watchlist watchlist = new Watchlist();

}
