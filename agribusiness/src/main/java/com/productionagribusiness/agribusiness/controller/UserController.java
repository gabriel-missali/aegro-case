package com.productionagribusiness.agribusiness.controller;

import com.productionagribusiness.agribusiness.model.User;
import com.productionagribusiness.agribusiness.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/user")
    public ResponseEntity<User> newUser(@RequestBody User user){
        User newUser = userService.newUser(user);

        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

}
