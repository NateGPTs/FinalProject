package com.example.movieproject.repository;

import com.example.movieproject.collection.post;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends MongoRepository<post, String> {
  List<post> findAllByOrderByCreatedAtDesc();

  List<post> findByMovieIdOrderByCreatedAtDesc(String movieId);

  List<post> findByUserIdOrderByCreatedAtDesc(String userId);

  @Query(value = "{'id': ?0}")
  @Update("{'$set': {?1: ?2}}")
  void updateField(String postId, String fieldName, Object value);
}
