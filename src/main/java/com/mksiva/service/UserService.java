package com.mksiva.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.mksiva.configuration.ApplicationConfigurationProperties;
import com.mksiva.domain.User;
import com.mksiva.repository.UserRepository;
import com.mksiva.restapi.dto.CreateUserDto;
import com.mksiva.restapi.dto.ModifyUserDto;
import com.mksiva.service.exception.UpdatedUserNotFoundException;

/**
 * Created by Siva on 21.8.17.
 */

@Service
public class UserService {

    @Autowired
    private ApplicationConfigurationProperties configurationProperties;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private UserRepository userRepository;
    
    public Optional<User> findByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    public User save(CreateUserDto createUserDto) {
        User user = new User();
        updateUser(user, createUserDto);

        return userRepository.save(user);
    }

    public User save(ModifyUserDto modifyUserDto, String userName) throws UpdatedUserNotFoundException {
        Optional<User> userOptional = userRepository.findByUserName(userName);

        if (!userOptional.isPresent()) {
            throw new UpdatedUserNotFoundException(userName);
        }

        User user = userOptional.get();
        updateUser(user, modifyUserDto);

        return userRepository.save(user);
    }

    public void delete(User user) {        
        userRepository.delete(user);
    }

    private void updateUser(User user, CreateUserDto userDto) {
        user.setFullName(userDto.getFullName());
        
        user.setUserName(userDto.getUserName());
        
        user.setEmail(userDto.getEmail());
        
        user.setPhone(userDto.getPhone());
        
        user.setAddressLine1(userDto.getAddressLine1());
        user.setAddressLine2(userDto.getAddressLine2());        
        user.setState(userDto.getState());
        user.setCountry(userDto.getCountry());
        user.setZip(userDto.getZip());
        
        user.setActive(userDto.isActive());
        
        user.setPassword(
                encryptPassword(userDto.getPassword())
        );
        
        user.setRoles(configurationProperties.getDefaultUserRoles());
    }

    private void updateUser(User user, ModifyUserDto userDto) {
        user.setFullName(userDto.getFullName());
        
        if (!StringUtils.isEmpty(userDto.getPassword())) {
            user.setPassword(
                    encryptPassword(userDto.getPassword())
            );
        }
        
        user.setEmail(userDto.getEmail());
        
        user.setPhone(userDto.getPhone());
        
        user.setAddressLine1(userDto.getAddressLine1());
        user.setAddressLine2(userDto.getAddressLine2());        
        user.setState(userDto.getState());
        user.setCountry(userDto.getCountry());
        user.setZip(userDto.getZip());
        
        user.setActive(userDto.isActive());
        user.setRoles(userDto.getRoles());
    }

    private String encryptPassword(String password) {
        return passwordEncoder.encode(password);
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }
    
    public long count() {
        return userRepository.count();
    }

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
