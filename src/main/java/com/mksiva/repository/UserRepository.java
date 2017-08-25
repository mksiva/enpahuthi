package com.mksiva.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.mksiva.domain.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByUserName(String userName);

}
