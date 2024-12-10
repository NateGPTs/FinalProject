package com.example.movieproject.repository;

import com.example.movieproject.collection.comment;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CommentRepository extends MongoRepository<comment, String> {
  List<comment> findAllByOrderByCreatedAtDesc();
}
