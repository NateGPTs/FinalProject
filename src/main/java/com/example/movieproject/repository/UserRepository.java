package com.example.movieproject.repository;

import com.example.movieproject.collection.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

  User findByUsername(String username);

  User findByPassword(String password);

  @Query(value = "{'id': ?0}")
  @Update("{'$set': {?1: ?2}}")
  void updateField(String userId, String fieldName, Object value);


}
