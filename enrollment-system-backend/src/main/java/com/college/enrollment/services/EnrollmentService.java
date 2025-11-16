package com.college.enrollment.service;

import com.college.enrollment.dto.CourseDTO;
import com.college.enrollment.dto.StudentDTO;
import com.college.enrollment.entity.Course;
import com.college.enrollment.entity.Student;
import com.college.enrollment.repository.CourseRepository;
import com.college.enrollment.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class EnrollmentService {
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private CourseRepository courseRepository;
    
    public String enrollStudent(Long studentId, Long courseId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + studentId));
        
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + courseId));
        
        // Check if already enrolled
        if (course.getEnrolledStudents().contains(student)) {
            throw new RuntimeException("Student is already enrolled in this course");
        }
        
        // Check capacity
        if (course.getEnrolledStudents().size() >= course.getCapacity()) {
            throw new RuntimeException("Course is full");
        }
        
        course.getEnrolledStudents().add(student);
        courseRepository.save(course);
        
        return "Student successfully enrolled in course";
    }
    
    public String unenrollStudent(Long studentId, Long courseId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + studentId));
        
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + courseId));
        
        if (!course.getEnrolledStudents().contains(student)) {
            throw new RuntimeException("Student is not enrolled in this course");
        }
        
        course.getEnrolledStudents().remove(student);
        courseRepository.save(course);
        
        return "Student successfully unenrolled from course";
    }
    
    public List<CourseDTO> getStudentCourses(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + studentId));
        
        return student.getEnrolledCourses().stream()
                .map(this::convertCourseToDTO)
                .collect(Collectors.toList());
    }
    
    public List<StudentDTO> getCourseStudents(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + courseId));
        
        return course.getEnrolledStudents().stream()
                .map(this::convertStudentToDTO)
                .collect(Collectors.toList());
    }
    
    private CourseDTO convertCourseToDTO(Course course) {
        CourseDTO dto = new CourseDTO();
        dto.setId(course.getId());
        dto.setCourseCode(course.getCourseCode());
        dto.setCourseName(course.getCourseName());
        dto.setDescription(course.getDescription());
        dto.setCredits(course.getCredits());
        dto.setCapacity(course.getCapacity());
        dto.setEnrolledCount(course.getEnrolledStudents().size());
        return dto;
    }
    
    private StudentDTO convertStudentToDTO(Student student) {
        StudentDTO dto = new StudentDTO();
        dto.setId(student.getId());
        dto.setFirstName(student.getFirstName());
        dto.setLastName(student.getLastName());
        dto.setEmail(student.getEmail());
        dto.setStudentId(student.getStudentId());
        dto.setMajor(student.getMajor());
        return dto;
    }
}