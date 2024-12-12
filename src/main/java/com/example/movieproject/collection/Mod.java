package com.example.movieproject.collection;

import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Data
@Document(collection = "user")
public class Mod extends User {

  public Mod() {
    super();
    this.setModPerms(true);
  }

}
