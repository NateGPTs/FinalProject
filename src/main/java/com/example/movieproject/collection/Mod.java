package com.example.movieproject.collection;

import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "user")
public class Mod extends User {

  private List<String> moderatedSubforums;
  private LocalDateTime lastModAction;
  private boolean isActive;


}
