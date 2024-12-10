package com.example.movieproject;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.session.data.mongo.config.annotation.web.http.EnableMongoHttpSession;

@Configuration
@EnableMongoRepositories
@EnableMongoHttpSession
public class SessionConfig {
  // No additional configuration needed
}
