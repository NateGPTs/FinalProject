package com.example.movieproject.repository;

import com.example.movieproject.collection.User;
import java.util.List;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

  User findByUsername(String username);

  User findByPassword(String password);

  // Find users whose followers list contains the given ID
  List<User> findByFollowersContains(String followerId);

  // Query for users being followed by a given user
  @Query("{ '_id': { $in: ?0 } }")
  List<User> findUsersByIds(List<String> userIds);

  @Query(value = "{'id': ?0}")
  @Update("{'$set': {?1: ?2}}")
  void updateField(String userId, String fieldName, Object value);

  @Query("{ 'username': { $regex: ?0, $options: 'i' }}")
  List<User> findByUsernameRegex(String regexPattern);

  List<User> findByModPermsIsFalseOrModPermsIsNull();

}
