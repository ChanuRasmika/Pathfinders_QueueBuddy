package com.example.backend.service;

import com.example.backend.dto.ApiResponse;
import com.example.backend.dto.LogInRequestDto;
import com.example.backend.dto.UserDto;
import com.example.backend.entity.Users;
import com.example.backend.repository.UsersRepository;
import com.example.backend.util.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UsersRepository usersRepository;

    @Autowired
    public AuthenticationService(AuthenticationManager authenticationManager, JwtService jwtService, UsersRepository usersRepository) {
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.usersRepository = usersRepository;
    }

    public ResponseEntity<ApiResponse<Map<String, Object>>> login(LogInRequestDto loginUserDto) {
        // Authenticate credentials
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginUserDto.getEmail(),
                        loginUserDto.getPassword()
                )
        );

        // Retrieve user
        Users user = usersRepository.findByEmail(loginUserDto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Generate JWT
        String jwtToken = jwtService.generateToken(new CustomUserDetails(user));

        // Prepare response data
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("token", jwtToken);
        responseData.put("expiresIn", jwtService.getExpirationTime());

        // Return wrapped in ApiResponse
        return ResponseEntity.ok(
                new ApiResponse<>("Login successful", responseData)
        );
    }

}
