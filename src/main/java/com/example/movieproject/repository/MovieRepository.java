package com.example.movieproject.repository;

import com.example.movieproject.collection.movie;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;

public interface MovieRepository extends MongoRepository<movie, String> {

  @Query(value = "{'id': ?0}")
  @Update("{'$set': {?1: ?2}}")
  void updateField(String movieId, String fieldName, Object value);

}
