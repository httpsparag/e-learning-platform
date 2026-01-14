# Student Dashboard - Quick Start Guide

## 🎯 How to Access the Student Dashboard

After logging in as a student, you can access the student dashboard at:
```
/student
```

## 📍 Available Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/student` | StudentDashboard | Main dashboard with stats and enrolled courses |
| `/student/courses` | StudentCourses | Browse all courses with search & filter |
| `/student/instructors` | StudentCourses (instructors view) | View all instructors |
| `/student/attend-class` | AttendClass | Browse and join live classes |
| `/student/live-class/:classId` | StudentLiveClass | Live video classroom |

## 🧭 Navigation Menu

The StudentShell provides a collapsible sidebar with these menu items:

```
📊 Dashboard         → Main dashboard view
📚 My Courses        → Enrolled courses list
👥 Instructors       → Instructor directory
🎥 Attend Class      → Live class sessions
```

## 💡 Features Overview

### 1. Dashboard (`/student`)
- **Statistics Cards**: Shows courses, hours, ratings, certificates
- **My Courses Section**: Displays enrolled courses with progress bars
- **Quick Links**: Join class, schedule, messages
- **Upcoming Sessions**: Next scheduled classes with join buttons

### 2. My Courses (`/student/courses`)
- **Course Grid**: Browse available courses
- **Search**: Find courses by title or instructor
- **Filter**: Filter by category
- **Course Info**: Rating, students count, instructor details

### 3. Instructors (`/student/instructors`)
- **Instructor Cards**: View all instructors
- **Teaching Info**: Number of courses per instructor
- **Contact**: Message instructor button
- **Search**: Find instructors by name

### 4. Attend Class (`/student/attend-class`)
- **Live Sessions**: Browse live and upcoming classes
- **Status Filters**: View All, Live Now, Upcoming
- **Search**: Find classes by title/instructor/course
- **Join Buttons**: Easy join for any class

### 5. Live Class (`/student/live-class/:classId`)
- **Video Area**: Instructor video + student grid
- **Controls**: Mic, Camera, Hand raise buttons
- **Chat Sidebar**: Real-time messaging
- **Participants**: List of attendees
- **Leave Button**: Exit class

## 🎨 Design Features

✅ **Responsive Layout**: Works on mobile, tablet, and desktop
✅ **Smooth Animations**: Framer Motion animations for polish
✅ **Collapsible Sidebar**: Toggle sidebar for more screen space
✅ **Color-coded Status**: Live (red), Upcoming (blue), Ended (gray)
✅ **Loading States**: Spinner while fetching data
✅ **Empty States**: Helpful messages when no data

## 🔧 Component Architecture

```
StudentShell (Main container)
├── StudentDashboard (Route: /student)
├── StudentCourses (Route: /student/courses, /student/instructors)
├── AttendClass (Route: /student/attend-class)
└── StudentLiveClass (Route: /student/live-class/:id)
```

## 🔐 Access Control

All student routes are protected with `ProtectedRoute` component:
- Requires valid `accessToken` in localStorage
- Requires `userRole` to be "student"
- Redirects to login if not authenticated

## 📱 Mobile Responsive

- ✅ Sidebar collapses on mobile
- ✅ Grid layouts adjust (1 column on mobile, 2+ on desktop)
- ✅ Touch-friendly buttons and controls
- ✅ Readable text on small screens

## 🧪 Testing Checklist

- [ ] Can navigate between all menu items
- [ ] Sidebar toggle works
- [ ] Search functionality works
- [ ] Filters update results
- [ ] Course cards are clickable
- [ ] Join buttons navigate correctly
- [ ] Live class page loads video controls
- [ ] Chat sends and receives messages
- [ ] Logout works properly
- [ ] Responsive on mobile devices

## 🚀 Backend Integration

To fully integrate with backend:

1. **Course Data**: Connect `CourseService.getAllCourses()` to your API
2. **Instructor Data**: Extract from course instructor field
3. **Live Sessions**: Create API endpoint for live class data
4. **Chat**: Implement WebSocket for real-time messaging
5. **Video**: Integrate WebRTC or Zoom/Jitsi API

## 📝 Notes

- Mock data is included for demonstration
- All components use TypeScript for type safety
- Tailwind CSS for styling
- Lucide React for icons
- Framer Motion for animations

---

**Status**: ✅ Fully Implemented & Ready for Testing
