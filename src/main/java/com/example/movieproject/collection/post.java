package com.example.movieproject.collection;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "post")
public class post {

  @Id
  private String id;
  private List<comment> comments;
  private String userId;
  private String title;
  private String description;
  private String movieName;
  private String movieId;

  @CreatedDate
  private LocalDateTime createdAt;


}
