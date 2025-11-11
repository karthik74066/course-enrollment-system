package com.college.enrollment.service;

import com.college.enrollment.dto.StudentDTO;
import com.college.enrollment.entity.Student;
import com.college.enrollment.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class StudentService {
    
    @Autowired
    private StudentRepository studentRepository;
    
    public List<StudentDTO> getAllStudents() {
        return studentRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public StudentDTO getStudentById(Long id) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
        return convertToDTO(student);
    }
    
    public StudentDTO createStudent(StudentDTO studentDTO) {
        if (studentRepository.existsByEmail(studentDTO.getEmail())) {
            throw new RuntimeException("Email already exists: " + studentDTO.getEmail());
        }
        if (studentRepository.existsByStudentId(studentDTO.getStudentId())) {
            throw new RuntimeException("Student ID already exists: " + studentDTO.getStudentId());
        }
        
        Student student = new Student();
        student.setFirstName(studentDTO.getFirstName());
        student.setLastName(studentDTO.getLastName());
        student.setEmail(studentDTO.getEmail());
        student.setStudentId(studentDTO.getStudentId());
        student.setMajor(studentDTO.getMajor());
        
        Student savedStudent = studentRepository.save(student);
        return convertToDTO(savedStudent);
    }
    
    public StudentDTO updateStudent(Long id, StudentDTO studentDTO) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
        
        student.setFirstName(studentDTO.getFirstName());
        student.setLastName(studentDTO.getLastName());
        student.setMajor(studentDTO.getMajor());
        
        Student updatedStudent = studentRepository.save(student);
        return convertToDTO(updatedStudent);
    }
    
    public void deleteStudent(Long id) {
        if (!studentRepository.existsById(id)) {
            throw new RuntimeException("Student not found with id: " + id);
        }
        studentRepository.deleteById(id);
    }
    
    private StudentDTO convertToDTO(Student student) {
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