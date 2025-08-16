package com.example.backend.repository;

import com.example.backend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

    @Query("""
     SELECT COALESCE(MAX(a.queuePlace), 0)
     FROM Appointment a
     WHERE a.departmentId = :deptId
       AND a.appointmentDate = :date
       AND a.appointmentTime = :time
  """)
    Integer maxQueuePlace(Integer deptId, java.time.LocalDate date, java.time.LocalTime time);
}
