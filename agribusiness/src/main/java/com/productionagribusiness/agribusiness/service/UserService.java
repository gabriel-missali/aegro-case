package com.productionagribusiness.agribusiness.service;

import com.productionagribusiness.agribusiness.exception.BadRequestException;
import com.productionagribusiness.agribusiness.exception.NotFoundException;
import com.productionagribusiness.agribusiness.model.User;
import com.productionagribusiness.agribusiness.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public User newUser(User user) {
        try {
            String encodedString = "";
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

            encodedString = encoder.encode(user.getPassword());

            user.setPassword(encodedString);
            User newUser = userRepository.save(user);

            newUser.setPassword("");
            return newUser;
        } catch(BadRequestException badRequestException) {
            throw new BadRequestException("Error to create new user");
        }
    }

    public User getUserByEmail(String email) {
        try {
            Optional<User> user = Optional.ofNullable(userRepository.findByEmail(email));

            if (!user.isPresent()) {
                throw new NotFoundException("User not found with email - " + email);
            }

            return user.get();
        } catch (BadRequestException badRequestException) {
            throw new BadRequestException("Error to find user");
        }
    }

}
