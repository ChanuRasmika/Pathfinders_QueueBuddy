package com.example.backend.controller;


import com.example.backend.dto.AppointmentRequest;
import com.example.backend.service.AppointmentService;
import com.example.backend.util.CustomUserDetails;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/appointments")
@PreAuthorize("hasRole('CITIZEN')")
public class AppointmentController {
    private final AppointmentService service;
    public AppointmentController(AppointmentService service) { this.service = service; }

    @PostMapping
    public Integer book(@Valid @RequestBody AppointmentRequest request,
                        @AuthenticationPrincipal CustomUserDetails userDetails) {
        return service.book(userDetails.getUser().getUserId(), request);
    }
}
