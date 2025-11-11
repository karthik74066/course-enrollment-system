package com.college.enrollment.controller;

import com.college.enrollment.dto.CourseDTO;
import com.college.enrollment.dto.EnrollmentDTO;
import com.college.enrollment.dto.StudentDTO;
import com.college.enrollment.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*")
public class EnrollmentController {
    
    @Autowired
    private EnrollmentService enrollmentService;
    
    @PostMapping("/enroll")
    public ResponseEntity<?> enrollStudent(@RequestBody EnrollmentDTO enrollmentDTO) {
        try {
            String message = enrollmentService.enrollStudent(
                enrollmentDTO.getStudentId(), 
                enrollmentDTO.getCourseId()
            );
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @PostMapping("/unenroll")
    public ResponseEntity<?> unenrollStudent(@RequestBody EnrollmentDTO enrollmentDTO) {
        try {
            String message = enrollmentService.unenrollStudent(
                enrollmentDTO.getStudentId(), 
                enrollmentDTO.getCourseId()
            );
            return ResponseEntity.ok(message);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    @GetMapping("/student/{studentId}/courses")
    public ResponseEntity<List<CourseDTO>> getStudentCourses(@PathVariable Long studentId) {
        try {
            return ResponseEntity.ok(enrollmentService.getStudentCourses(studentId));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/course/{courseId}/students")
    public ResponseEntity<List<StudentDTO>> getCourseStudents(@PathVariable Long courseId) {
        try {
            return ResponseEntity.ok(enrollmentService.getCourseStudents(courseId));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}