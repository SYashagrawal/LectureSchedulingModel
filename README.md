# Online Lecture Scheduling Module

A comprehensive MERN stack application for managing lecture scheduling with role-based access control for admins and instructors. The system prevents scheduling conflicts by ensuring no instructor has two lectures on the same date.

## 🎯 Features

### Admin Panel
- **Instructor Management**: View list of all registered instructors
- **Course Management**: Add courses with details (Name, Level, Description, Image)
- **Lecture Management**: Add multiple lectures/batches to courses and assign to instructors
- **Conflict Prevention**: Automatic validation ensures no instructor is assigned multiple lectures on the same date
- **Course Deletion**: Remove courses and all associated lectures

### Instructor Panel
- **My Lectures Dashboard**: View all assigned lectures
- **Lecture Details**: See course information, dates, times, and descriptions
- **Schedule Overview**: Get a clear view of your teaching schedule

### System Features
- **User Authentication**: JWT-based authentication with role-based access control
- **Conflict Detection**: Backend validation prevents scheduling conflicts
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Feedback**: Clear error messages and validation feedback

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS3 with responsive design

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or remote connection string)
- npm or yarn

## 🔧 Installation

### 1. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the server directory:
```
MONGODB_URI=mongodb://localhost:27017/lecture-scheduling
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
NODE_ENV=development
```

Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
cd client
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 🔐 Demo Credentials

For testing the admin functionality:

```
Email: admin@example.com
Password: admin123
Role: Admin
```

To create an instructor account:
1. Click "Register" on the login page
2. Fill in the details
3. Select "Instructor" as the role

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get current user profile
- `GET /api/auth/instructors` - Get all instructors (Protected)

### Courses
- `GET /api/courses` - Get all courses (Protected)
- `POST /api/courses` - Create a new course (Protected, Admin only)
- `GET /api/courses/:id` - Get course by ID (Protected)
- `PUT /api/courses/:id` - Update course (Protected, Admin only)
- `DELETE /api/courses/:id` - Delete course (Protected, Admin only)

### Lectures
- `GET /api/lectures` - Get all lectures (Protected)
- `POST /api/lectures` - Add new lecture (Protected, Admin only)
- `GET /api/lectures/course/:courseId` - Get lectures by course (Protected)
- `GET /api/lectures/instructor/my-lectures` - Get my lectures (Protected)
- `PUT /api/lectures/:id` - Update lecture (Protected, Admin only)
- `DELETE /api/lectures/:id` - Delete lecture (Protected, Admin only)
- `GET /api/lectures/availability/check` - Check instructor availability (Protected, Admin only)

## 🔒 Conflict Prevention Logic

The system implements a sophisticated conflict detection mechanism:

1. **Date-based Check**: When assigning a lecture to an instructor on a specific date, the system checks if the instructor already has any lecture scheduled that day.

2. **Time-based Check**: If needed, the system can validate time slot conflicts to prevent overlapping lectures.

3. **Real-time Validation**: The frontend provides immediate feedback when a conflict is detected.

4. **Backend Enforcement**: All validations are also performed on the backend to ensure data integrity.

## 📁 Project Structure

```
├── server/
│   ├── src/
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Course.js
│   │   │   └── Lecture.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── courseController.js
│   │   │   └── lectureController.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── courseRoutes.js
│   │   │   └── lectureRoutes.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── utils/
│   │   │   └── scheduleValidator.js
│   │   └── server.js
│   ├── package.json
│   └── .env
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.css
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── CoursesPage.jsx
│   │   │   ├── InstructorDashboard.jsx
│   │   │   └── *.css files
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── App.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
```

## 🧪 Testing the Application

### 1. Register Users
- Register an admin account
- Register instructor accounts

### 2. Test Admin Features
- Login as admin
- Create courses with different levels
- Add instructors to the system
- Add lectures to courses with different dates
- Try to assign the same instructor multiple lectures on the same date (should fail)

### 3. Test Instructor Features
- Login as instructor
- View all assigned lectures
- Verify schedule information

### 4. Test Conflict Prevention
- Try to assign a lecture to an instructor who already has a lecture on that date
- System should display an error message
- The conflict check happens both in frontend and backend

## 🎨 UI Components

### Admin Dashboard
- Displays list of all instructors
- Shows instructor details and join dates

### Courses Page
- Course management interface
- Add new courses form
- Add lectures to courses modal
- Course cards with actions
- Instructor selection dropdown

### Instructor Dashboard
- Table view of assigned lectures
- Displays course name, level, lecture title, date, time
- Sortable by date

## 🔄 Data Flow

1. **User Registration/Login**
   - User submits credentials
   - Backend validates and creates JWT token
   - Token stored in localStorage
   - Frontend redirects based on user role

2. **Adding Lecture**
   - Admin selects course and instructor
   - Admin chooses date and time
   - Frontend checks availability
   - Backend performs conflict validation
   - Lecture created or error returned

3. **Viewing Schedule**
   - Instructor views dashboard
   - Frontend fetches assigned lectures
   - Backend returns filtered lectures for logged-in instructor
   - UI displays formatted schedule

## ⚠️ Important Notes

- **Database**: Ensure MongoDB is running before starting the backend
- **Environment Variables**: Update the `.env` file with your actual MongoDB connection string
- **JWT Secret**: Change the JWT_SECRET in production
- **CORS**: The frontend makes requests to the backend API with proper CORS configuration

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Ensure MongoDB is running:
- Local: `mongod` command
- Remote: Update MONGODB_URI in .env
```

### Port Already in Use
```
Backend: npm run dev will use port 5000
Frontend: npm run dev will use port 3000
If ports are busy, update vite.config.js or use PORT=xxxx
```

### CORS Issues
```
The vite.config.js includes proxy configuration to handle CORS
If issues persist, check the baseURL in client/src/services/api.js
```

## 📝 License

This project is open source and available under the MIT License.

## 👨‍💻 Future Enhancements

- Email notifications for lecture assignments
- Lecture recordings management
- Student enrollment system
- Payment integration for courses
- Video conferencing integration
- Advanced analytics and reporting
- Mobile app version
- Dark mode support

## 🤝 Support

For issues or questions, please create an issue in the repository.
