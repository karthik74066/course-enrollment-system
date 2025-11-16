import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Select, Button, Table, message, Popconfirm, Tag } from 'antd';
import { UserAddOutlined, UserDeleteOutlined } from '@ant-design/icons';
import { studentAPI, courseAPI, enrollmentAPI } from '../services/api';

const { Option } = Select;

const Enrollments = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [studentCourses, setStudentCourses] = useState([]);
  const [courseStudents, setCourseStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewStudentId, setViewStudentId] = useState(null);
  const [viewCourseId, setViewCourseId] = useState(null);

  useEffect(() => {
    fetchStudents();
    fetchCourses();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await studentAPI.getAll();
      setStudents(response.data);
    } catch (error) {
      message.error('Failed to fetch students');
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await courseAPI.getAll();
      setCourses(response.data);
    } catch (error) {
      message.error('Failed to fetch courses');
    }
  };

  const handleEnroll = async () => {
    if (!selectedStudent || !selectedCourse) {
      message.warning('Please select both student and course');
      return;
    }

    setLoading(true);
    try {
      await enrollmentAPI.enroll(selectedStudent, selectedCourse);
      message.success('Student enrolled successfully');
      
      // Refresh the tables if they're viewing
      if (viewStudentId === selectedStudent) {
        fetchStudentCourses(selectedStudent);
      }
      if (viewCourseId === selectedCourse) {
        fetchCourseStudents(selectedCourse);
      }
      
      // Refresh courses dropdown to update capacity
      fetchCourses();
    } catch (error) {
      message.error(error.response?.data || 'Enrollment failed');
    }
    setLoading(false);
  };

  const handleUnenroll = async (studentId, courseId) => {
    setLoading(true);
    try {
      await enrollmentAPI.unenroll(studentId, courseId);
      message.success('Student unenrolled successfully');
      
      if (viewStudentId) fetchStudentCourses(viewStudentId);
      if (viewCourseId) fetchCourseStudents(viewCourseId);
      
      // Refresh courses dropdown to update capacity
      fetchCourses();
    } catch (error) {
      message.error(error.response?.data || 'Unenrollment failed');
    }
    setLoading(false);
  };

  const fetchStudentCourses = async (studentId) => {
    setLoading(true);
    try {
      const response = await enrollmentAPI.getStudentCourses(studentId);
      setStudentCourses(response.data);
    } catch (error) {
      message.error('Failed to fetch student courses');
      setStudentCourses([]);
    }
    setLoading(false);
  };

  const fetchCourseStudents = async (courseId) => {
    setLoading(true);
    try {
      const response = await enrollmentAPI.getCourseStudents(courseId);
      setCourseStudents(response.data);
    } catch (error) {
      message.error('Failed to fetch course students');
      setCourseStudents([]);
    }
    setLoading(false);
  };

  const handleViewStudentChange = (value) => {
    setViewStudentId(value);
    if (value) {
      fetchStudentCourses(value);
    } else {
      setStudentCourses([]);
    }
  };

  const handleViewCourseChange = (value) => {
    setViewCourseId(value);
    if (value) {
      fetchCourseStudents(value);
    } else {
      setCourseStudents([]);
    }
  };

  const studentCoursesColumns = [
    {
      title: 'Course Code',
      dataIndex: 'courseCode',
      key: 'courseCode',
    },
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName',
    },
    {
      title: 'Credits',
      dataIndex: 'credits',
      key: 'credits',
    },
    {
      title: 'Enrolled',
      key: 'enrolled',
      render: (_, record) => (
        <Tag color="green">{record.enrolledCount}/{record.capacity}</Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to unenroll from this course?"
          onConfirm={() => handleUnenroll(viewStudentId, record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button 
            type="primary" 
            danger 
            icon={<UserDeleteOutlined />} 
            size="small"
          >
            Unenroll
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const courseStudentsColumns = [
    {
      title: 'Student ID',
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Major',
      dataIndex: 'major',
      key: 'major',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to remove this student from the course?"
          onConfirm={() => handleUnenroll(record.id, viewCourseId)}
          okText="Yes"
          cancelText="No"
        >
          <Button 
            type="primary" 
            danger 
            icon={<UserDeleteOutlined />} 
            size="small"
          >
            Remove
          </Button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h2>Course Enrollments</h2>

      <Card title="Enroll Student in Course" style={{ marginBottom: '24px' }}>
        <Row gutter={16} align="middle">
          <Col span={10}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Select Student:
            </label>
            <Select
              showSearch
              placeholder="Select a student"
              style={{ width: '100%' }}
              onChange={(value) => setSelectedStudent(value)}
              value={selectedStudent}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {students.map((student) => (
                <Option key={student.id} value={student.id}>
                  {student.studentId} - {student.firstName} {student.lastName}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={10}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Select Course:
            </label>
            <Select
              showSearch
              placeholder="Select a course"
              style={{ width: '100%' }}
              onChange={(value) => setSelectedCourse(value)}
              value={selectedCourse}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {courses.map((course) => (
                <Option key={course.id} value={course.id}>
                  {course.courseCode} - {course.courseName} ({course.enrolledCount}/{course.capacity})
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              onClick={handleEnroll}
              loading={loading}
              block
              style={{ marginTop: '30px' }}
            >
              Enroll
            </Button>
          </Col>
        </Row>
      </Card>

      <Row gutter={16}>
        <Col span={12}>
          <Card title="View Student's Enrolled Courses">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Select Student to View:
            </label>
            <Select
              showSearch
              placeholder="Select a student"
              style={{ width: '100%', marginBottom: '16px' }}
              onChange={handleViewStudentChange}
              value={viewStudentId}
              allowClear
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {students.map((student) => (
                <Option key={student.id} value={student.id}>
                  {student.studentId} - {student.firstName} {student.lastName}
                </Option>
              ))}
            </Select>
            
            {viewStudentId ? (
              <Table
                columns={studentCoursesColumns}
                dataSource={studentCourses}
                loading={loading}
                rowKey="id"
                pagination={{ pageSize: 5 }}
              />
            ) : (
              <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
                Select a student to view their enrolled courses
              </p>
            )}
          </Card>
        </Col>

        <Col span={12}>
          <Card title="View Course's Enrolled Students">
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Select Course to View:
            </label>
            <Select
              showSearch
              placeholder="Select a course"
              style={{ width: '100%', marginBottom: '16px' }}
              onChange={handleViewCourseChange}
              value={viewCourseId}
              allowClear
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {courses.map((course) => (
                <Option key={course.id} value={course.id}>
                  {course.courseCode} - {course.courseName}
                </Option>
              ))}
            </Select>
            
            {viewCourseId ? (
              <Table
                columns={courseStudentsColumns}
                dataSource={courseStudents}
                loading={loading}
                rowKey="id"
                pagination={{ pageSize: 5 }}
              />
            ) : (
              <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
                Select a course to view its enrolled students
              </p>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Enrollments;