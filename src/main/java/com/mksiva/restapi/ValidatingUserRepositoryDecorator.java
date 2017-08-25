package com.mksiva.restapi;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.mksiva.domain.User;
import com.mksiva.repository.UserRepository;
import com.mksiva.restapi.exception.UserNotFoundException;

import java.util.Optional;

@Component
public class ValidatingUserRepositoryDecorator {
    
    public static final Logger LOGGER = LoggerFactory.getLogger(ValidatingUserRepositoryDecorator.class);

    private UserRepository userRepository;

    @Autowired
    public ValidatingUserRepositoryDecorator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findAccountValidated(String userName) {
        LOGGER.debug("findAccountValidated " + userName);
        
        Optional<User> userOptional = userRepository.findByUserName(userName);

        return userOptional.orElseThrow(
                () -> new UserNotFoundException(userName)
        );
    }

}
