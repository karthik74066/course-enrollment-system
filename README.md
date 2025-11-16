# 🎓 Course Enrollment System

<div align="center">

![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5.7-brightgreen?style=for-the-badge&logo=spring)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![SQLite](https://img.shields.io/badge/SQLite-3.43-lightblue?style=for-the-badge&logo=sqlite)
![Ant Design](https://img.shields.io/badge/Ant%20Design-5-red?style=for-the-badge&logo=antdesign)

A modern, full-stack web application for managing student course enrollments with an intuitive UI and robust backend.

[Features](#-features) • [Installation](#-installation) • [API Documentation](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📸 Screenshots

Application screenshots are available in the [`screenshots/`](screenshots/) folder.

---

## ✨ Features

### 🎯 Core Functionality
- ✅ **Student Management** - Complete CRUD operations for student records
- ✅ **Course Management** - Create, update, and delete courses with capacity limits
- ✅ **Smart Enrollment** - Enroll students with real-time capacity checking
- ✅ **View Management** - Separate views for student courses and course rosters
- ✅ **Capacity Tracking** - Real-time enrollment count vs. total capacity

### 🛡️ Backend Features
- ✅ RESTful API architecture
- ✅ SQLite database with JPA/Hibernate
- ✅ Input validation and error handling
- ✅ CORS configuration for cross-origin requests
- ✅ Transaction management
- ✅ Duplicate prevention (email, student ID, course code)

### 🎨 Frontend Features
- ✅ Responsive design with Ant Design
- ✅ Real-time data updates
- ✅ Search and filter functionality
- ✅ Loading states and error messages
- ✅ Confirmation dialogs for destructive actions
- ✅ Clean and intuitive user interface

### 🔄 CI/CD
- ✅ Automated GitHub Actions workflows
- ✅ Backend build and test pipeline
- ✅ Frontend build and deployment pipeline
- ✅ Artifact generation for releases

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Browser                        │
│                     (React + Ant Design)                     │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP/REST API
                           │ Port 3000
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     Spring Boot Backend                      │
│                         Port 8080                            │
├─────────────────────────────────────────────────────────────┤
│  Controllers → Services → Repositories → Database (SQLite)   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

<table>
<tr>
<td width="50%" valign="top">

### Backend
- **Framework:** Spring Boot 3.5.7
- **Language:** Java 17
- **Database:** SQLite 3.43
- **ORM:** Spring Data JPA (Hibernate)
- **Build Tool:** Maven
- **Dependencies:**
  - Spring Web
  - Spring Data JPA
  - Lombok
  - Hibernate Community Dialects

</td>
<td width="50%" valign="top">

### Frontend
- **Library:** React 18.2
- **UI Framework:** Ant Design 5.11
- **HTTP Client:** Axios 1.6
- **Routing:** React Router DOM 6.20
- **Icons:** Ant Design Icons 5.2
- **Build Tool:** Create React App
- **Package Manager:** npm

</td>
</tr>
</table>

---

## 📦 Project Structure

```
course-enrollment-system/
├── 📂 enrollment-system-backend/
│   ├── 📂 src/main/java/com/college/enrollment/
│   │   ├── 📂 config/         # Configuration files
│   │   ├── 📂 controller/     # REST Controllers
│   │   ├── 📂 dto/            # Data Transfer Objects
│   │   ├── 📂 entity/         # JPA Entities
│   │   ├── 📂 repository/     # Data Repositories
│   │   └── 📂 service/        # Business Logic
│   ├── 📂 src/main/resources/
│   │   └── application.properties
│   └── pom.xml
│
├── 📂 enrollment-frontend/
│   ├── 📂 public/
│   ├── 📂 src/
│   │   ├── 📂 components/     # React Components
│   │   │   ├── Students.js
│   │   │   ├── Courses.js
│   │   │   └── Enrollments.js
│   │   ├── 📂 services/       # API Services
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
├── 📂 .github/workflows/       # CI/CD Pipelines
│   ├── backend-ci.yml
│   ├── frontend-ci.yml
│   └── full-ci-cd.yml
│
├── .gitignore
└── README.md
```

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- ☕ **Java 17** or higher - [Download](https://www.oracle.com/java/technologies/downloads/)
- 📦 **Maven 3.6+** - [Download](https://maven.apache.org/download.cgi)
- 🟢 **Node.js 18+** and npm - [Download](https://nodejs.org/)
- 🔧 **Git** - [Download](https://git-scm.com/)

### Clone the Repository

```bash
git clone https://github.com/karthik74066/course-enrollment-system.git
cd course-enrollment-system
```

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd enrollment-system-backend
   ```

2. **Build the project:**
   ```bash
   mvn clean install
   ```

3. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```

4. **Backend will start on:** `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd enrollment-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Frontend will open at:** `http://localhost:3000`

---

## 📖 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Student Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/students` | Get all students |
| GET | `/students/{id}` | Get student by ID |
| POST | `/students` | Create new student |
| PUT | `/students/{id}` | Update student |
| DELETE | `/students/{id}` | Delete student |

#### Create Student Request
```json
{
  "studentId": "STU001",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@college.edu",
  "major": "Computer Science"
}
```

### Course Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/courses` | Get all courses |
| GET | `/courses/{id}` | Get course by ID |
| POST | `/courses` | Create new course |
| PUT | `/courses/{id}` | Update course |
| DELETE | `/courses/{id}` | Delete course |

#### Create Course Request
```json
{
  "courseCode": "CS101",
  "courseName": "Introduction to Programming",
  "description": "Learn basics of programming",
  "credits": 3,
  "capacity": 30
}
```

### Enrollment Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/enrollments/enroll` | Enroll student in course |
| POST | `/enrollments/unenroll` | Unenroll student from course |
| GET | `/enrollments/student/{studentId}/courses` | Get student's courses |
| GET | `/enrollments/course/{courseId}/students` | Get course's students |

#### Enroll Student Request
```json
{
  "studentId": 1,
  "courseId": 1
}
```

---

## 🧪 Testing

### Backend Tests
```bash
cd enrollment-system-backend
mvn test
```

### Frontend Tests
```bash
cd enrollment-frontend
npm test
```

---

## 🔧 Configuration

### Backend Configuration

Edit `src/main/resources/application.properties`:

```properties
# Server Port
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:sqlite:college.db
spring.datasource.driver-class-name=org.sqlite.JDBC

# JPA Configuration
spring.jpa.database-platform=org.hibernate.community.dialect.SQLiteDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Frontend Configuration

Create `.env` file in frontend directory:

```env
REACT_APP_API_URL=http://localhost:8080/api
```

---

## 🎯 Usage Guide

### 1. Adding Students
1. Click on **Students** in the sidebar
2. Click **Add Student** button
3. Fill in the required fields:
   - Student ID (unique)
   - First Name
   - Last Name
   - Email (unique)
   - Major (optional)
4. Click **Create**

### 2. Adding Courses
1. Click on **Courses** in the sidebar
2. Click **Add Course** button
3. Fill in the required fields:
   - Course Code (unique)
   - Course Name
   - Description (optional)
   - Credits
   - Capacity
4. Click **Create**

### 3. Enrolling Students
1. Click on **Enrollments** in the sidebar
2. Select a student from the dropdown
3. Select a course from the dropdown (shows available capacity)
4. Click **Enroll** button
5. System validates:
   - Student not already enrolled
   - Course has available capacity

### 4. Viewing Enrollments
- **Student's Courses**: Select a student to see their enrolled courses
- **Course Roster**: Select a course to see enrolled students

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes:**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Code Style Guidelines
- Follow Java coding conventions for backend
- Use ESLint and Prettier for frontend
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed

---

## 🗺️ Roadmap

- [ ] Add user authentication and authorization
- [ ] Implement role-based access control (Admin, Student, Teacher)
- [ ] Add course prerequisites
- [ ] Email notifications for enrollment
- [ ] Export data to PDF/Excel
- [ ] Add course schedule and timetable
- [ ] Implement waiting list for full courses
- [ ] Add student grades and GPA tracking
- [ ] Mobile responsive improvements
- [ ] Multi-language support

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Karthik S

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 Author

**Karthik S**
- GitHub: [@karthik74066](https://github.com/karthik74066)
- LinkedIn: [Karthik S](https://linkedin.com/in/karthik74066)
- Email: karthiktamilzha@gmail.com

---

## 🙏 Acknowledgments

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev/)
- [Ant Design](https://ant.design/)
- [SQLite](https://www.sqlite.org/)
- All contributors who helped improve this project

---

## 📞 Support

If you found this project helpful, please give it a ⭐!

For issues and questions:
- 🐛 [Report Bug](https://github.com/karthik74066/course-enrollment-system/issues)
- 💡 [Request Feature](https://github.com/karthik74066/course-enrollment-system/issues)
- 💬 [Discussions](https://github.com/karthik74066/course-enrollment-system/discussions)

---

<div align="center">

**Made with ❤️ for education**

[⬆ Back to Top](#-course-enrollment-system)

</div>