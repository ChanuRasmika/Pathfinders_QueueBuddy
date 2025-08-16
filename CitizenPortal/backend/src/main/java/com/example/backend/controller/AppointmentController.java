package com.example.backend.controller;

import com.example.backend.dto.AppointmentRequest;
import com.example.backend.entity.Users;
import com.example.backend.service.AppointmentService;
import com.example.backend.service.UsersService;
import com.example.backend.util.CustomUserDetails;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/appointments")
@PreAuthorize("hasRole('CITIZEN')")
public class AppointmentController {
    private final AppointmentService service;
    private final UsersService usersService;

    @Autowired
    public AppointmentController(AppointmentService service, UsersService usersService) {
        this.service = service;
        this.usersService = usersService;
    }

    @PostMapping
    public Integer book(@Valid @RequestBody AppointmentRequest request,
                        @AuthenticationPrincipal CustomUserDetails userDetails) {
        // Lookup citizen entity by username/email
        Users currentUser = usersService.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Citizen not found"));

        // Pass userId to the service
        return service.book(currentUser.getUserId(), request);
    }
}