import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { UserOutlined, BookOutlined, TeamOutlined } from '@ant-design/icons';
import Students from './components/Students';
import Courses from './components/Courses';
import Enrollments from './components/Enrollments';
import './App.css';

const { Header, Content, Sider } = Layout;

function App() {
  const [selectedMenu, setSelectedMenu] = useState('1');

  const renderContent = () => {
    switch (selectedMenu) {
      case '1':
        return <Students />;
      case '2':
        return <Courses />;
      case '3':
        return <Enrollments />;
      default:
        return <Students />;
    }
  };

  const menuItems = [
    {
      key: '1',
      icon: <UserOutlined />,
      label: 'Students',
    },
    {
      key: '2',
      icon: <BookOutlined />,
      label: 'Courses',
    },
    {
      key: '3',
      icon: <TeamOutlined />,
      label: 'Enrollments',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ 
          height: '64px', 
          margin: '16px',
          background: 'rgba(255, 255, 255, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          College System
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedMenu]}
          items={menuItems}
          onClick={(e) => setSelectedMenu(e.key)}
        />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ 
          padding: 0, 
          background: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <div style={{ 
            padding: '0 24px',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#1890ff'
          }}>
            Course Enrollment System
          </div>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ 
            padding: 24, 
            background: '#fff',
            minHeight: 'calc(100vh - 112px)'
          }}>
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;