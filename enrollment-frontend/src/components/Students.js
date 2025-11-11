import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { studentAPI } from '../services/api';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const response = await studentAPI.getAll();
      setStudents(response.data);
    } catch (error) {
      message.error('Failed to fetch students');
    }
    setLoading(false);
  };

  const handleAdd = () => {
    setEditingStudent(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingStudent(record);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await studentAPI.delete(id);
      message.success('Student deleted successfully');
      fetchStudents();
    } catch (error) {
      message.error('Failed to delete student');
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingStudent) {
        await studentAPI.update(editingStudent.id, values);
        message.success('Student updated successfully');
      } else {
        await studentAPI.create(values);
        message.success('Student created successfully');
      }
      setModalVisible(false);
      fetchStudents();
      form.resetFields();
    } catch (error) {
      message.error(error.response?.data || 'Operation failed');
    }
  };

  const columns = [
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
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record)}
            size="small"
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this student?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteOutlined />} size="small">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Students Management</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          Add Student
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={students}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingStudent ? 'Edit Student' : 'Add Student'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={() => form.submit()}
        okText={editingStudent ? 'Update' : 'Create'}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="studentId"
            label="Student ID"
            rules={[{ required: true, message: 'Please input student ID!' }]}
          >
            <Input disabled={editingStudent !== null} />
          </Form.Item>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: 'Please input first name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: 'Please input last name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input disabled={editingStudent !== null} />
          </Form.Item>
          <Form.Item name="major" label="Major">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Students;