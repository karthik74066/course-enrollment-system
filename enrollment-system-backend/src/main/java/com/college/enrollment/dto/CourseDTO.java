package com.college.enrollment.dto;

import lombok.Data;

@Data
public class CourseDTO {
    private Long id;
    private String courseCode;
    private String courseName;
    private String description;
    private Integer credits;
    private Integer capacity;
    private Integer enrolledCount;
}