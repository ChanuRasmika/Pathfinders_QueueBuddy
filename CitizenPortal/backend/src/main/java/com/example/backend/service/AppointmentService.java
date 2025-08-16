package com.example.backend.service;

import com.example.backend.dto.AppointmentRequest;
import com.example.backend.entity.Appointment;
import com.example.backend.entity.SubmittedDocument;
import com.example.backend.repository.AppointmentRepository;
import com.example.backend.repository.SubmittedDocumentRepository;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
public class AppointmentService {
    private final AppointmentRepository appointmentRepo;
    private final SubmittedDocumentRepository submittedRepo;

    public AppointmentService(AppointmentRepository appointmentRepo, SubmittedDocumentRepository submittedRepo) {
        this.appointmentRepo = appointmentRepo; this.submittedRepo = submittedRepo;
    }

    public Integer book(Integer userId, AppointmentRequest req) {
        // Ensure submitted doc exists & belongs to user & department matches
        SubmittedDocument doc = submittedRepo.findById(req.submittedId())
                .orElseThrow(() -> new IllegalArgumentException("Submitted document not found."));
        if (!doc.getUserId().equals(userId))
            throw new SecurityException("Submitted document does not belong to current user.");
        if (!doc.getDepartmentId().equals(req.departmentId()))
            throw new IllegalArgumentException("Submitted document is for a different department.");

        Integer maxQueue = appointmentRepo.maxQueuePlace(req.departmentId(), req.appointmentDate(), req.appointmentTime());
        int queuePlace = (maxQueue == null ? 0 : maxQueue) + 1;

        Appointment a = new Appointment();
        a.setDepartmentId(req.departmentId());
        a.setUserId(userId);
        a.setAppointmentDate(req.appointmentDate());
        a.setAppointmentTime(req.appointmentTime());
        a.setBookedDate(Instant.now());
        a.setQueuePlace(queuePlace);

        return appointmentRepo.save(a).getAppointmentId();
    }
}
