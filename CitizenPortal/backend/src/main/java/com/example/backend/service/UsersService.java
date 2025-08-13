package com.example.backend.service;

import com.example.backend.dto.ApiResponse;
import com.example.backend.entity.Users;
import com.example.backend.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class UsersService {
    private final UsersRepository usersRepository;

    @Autowired
    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public ResponseEntity<ApiResponse<Users>> addNewUsers(Users users){
        Optional<Users> optionalUsers = usersRepository.findByEmail(users.getEmail());
        if(optionalUsers.isPresent()){
            return ResponseEntity.ok(
                    new ApiResponse<>("You Already SignedUp.Please Login.", optionalUsers.get())
            );
        }
        users.setDateCreated(new Date(System.currentTimeMillis()));
        Users savedUser = usersRepository.save(users);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Successfully Created Users.", savedUser));
    }
}
