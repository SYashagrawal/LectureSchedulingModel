# 🚀 Quick Start Guide - Lecture Scheduling Module

## ✅ Installation Status
- ✅ Backend dependencies installed
- ✅ Frontend dependencies installed
- ✅ Backend server running on port 5001
- ✅ Frontend server running on port 3000

## 🌐 Access the Application

### **Frontend (React App)**
Open your browser and navigate to: **http://localhost:3000**

### **Backend API**
API endpoint: **http://localhost:5001/api**

## 🔐 Demo Credentials

Use these credentials to login:

```
Email: admin@example.com
Password: admin123
Role: Admin
```

## 📋 How to Use

### **For Admin Users:**

1. **Login** with admin credentials
2. **View Instructors Dashboard**
   - See all registered instructors
   - Check instructor details

3. **Manage Courses**
   - Click "Manage Courses" in navigation
   - Create new courses with:
     - Course Name
     - Level (Beginner, Intermediate, Advanced)
     - Description
     - Image URL (optional)

4. **Add Lectures to Courses**
   - Click "+ Add Lecture" on any course
   - Select an instructor
   - Choose a date
   - Set start and end times
   - System will prevent conflicts (same instructor on same date)

### **For Instructor Users:**

1. **Register** as an instructor
   - Click "Register" on login page
   - Select "Instructor" role

2. **Login** with your credentials

3. **View Your Schedule**
   - See all lectures assigned to you
   - View course details, dates, and times
   - Plan your teaching schedule

## ⚠️ Scheduling Conflict Prevention

The system is designed to prevent conflicts:

✓ **No instructor can be assigned multiple lectures on the same date**

When you try to assign a lecture:
- The system checks if the instructor already has a lecture that day
- If yes → shows error message and prevents the assignment
- If no → successfully creates the lecture

## 🔄 Server Details

### Backend Server
- **URL**: http://localhost:5001
- **Status**: Running ✅
- **Database**: MongoDB (localhost:27017)
- **Port**: 5001

### Frontend Server
- **URL**: http://localhost:3000
- **Status**: Running ✅
- **Port**: 3000

## 🛑 If Servers Stop

To restart the servers, open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd C:\Users\Divyank\OneDrive\Desktop\Ideamagix\server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd C:\Users\Divyank\OneDrive\Desktop\Ideamagix\client
npm run dev
```

## 🔧 Troubleshooting

### Port Already in Use
If port 5001 or 3000 is already in use:
- Change the PORT in `.env` (for backend)
- Change the port in `vite.config.js` (for frontend)

### MongoDB Connection Error
Ensure MongoDB is running:
```bash
mongod
```

### Dependencies Not Installed
Reinstall dependencies:
```bash
cd server && npm install
cd ../client && npm install
```

## 📚 Features Demo

### Create a Demo Scenario

1. **Create Instructors**
   - Register instructors with names like:
     - Rahul Kumar
     - Priya Singh
     - Amit Patel

2. **Create Courses**
   - React Fundamentals (Beginner)
   - Node.js Backend (Intermediate)
   - Advanced TypeScript (Advanced)

3. **Add Lectures**
   - Assign lectures to different instructors
   - Try to assign same instructor on same date (will fail)
   - Try different dates (will succeed)

4. **Verify Schedules**
   - Login as instructor
   - See all assigned lectures
   - Verify dates and course information

## 💡 Key Features

✅ User authentication (Admin & Instructor)
✅ Course and lecture management
✅ Intelligent conflict prevention
✅ Real-time availability checking
✅ Responsive UI for desktop & mobile
✅ Role-based access control
✅ Clean, modern interface

## 🎯 Next Steps

1. Open http://localhost:3000 in your browser
2. Login with admin credentials
3. Explore the admin panel
4. Create courses and add lectures
5. Register as instructor and view schedule

---

**Happy Teaching! 📚✨**
