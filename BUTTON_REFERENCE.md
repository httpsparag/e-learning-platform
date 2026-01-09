# Instructor Course Dashboard - Button Reference

## Course Action Buttons

Each course card in "My Courses" now displays up to 5 action buttons based on course status:

---

## Button Visibility Matrix

```
┌─────────────────────────────────────────────────────────────┐
│           COURSE STATUS: DRAFT (Blue Badge)                │
├─────────────┬─────────────────────────────────────────────┤
│ Button      │ Visible │ Color   │ Action                  │
├─────────────┼─────────┼─────────┼─────────────────────────┤
│ View        │ ✅ Yes  │ Emerald │ Open ViewCourseModal    │
│ Edit        │ ✅ Yes  │ Blue    │ Open EditCourseModal    │
│ Publish     │ ✅ Yes  │ Green   │ Change to Active        │
│ Delete      │ ✅ Yes  │ Red     │ Remove course           │
└─────────────┴─────────┴─────────┴─────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│          COURSE STATUS: ACTIVE (Green Badge)               │
├─────────────┬─────────────────────────────────────────────┤
│ Button      │ Visible │ Color   │ Action                  │
├─────────────┼─────────┼─────────┼─────────────────────────┤
│ View        │ ✅ Yes  │ Emerald │ Open ViewCourseModal    │
│ Edit        │ ✅ Yes  │ Blue    │ Open EditCourseModal    │
│ Publish     │ ❌ No   │ —       │ (Course already active) │
│ Delete      │ ❌ No   │ —       │ (Can't delete active)   │
└─────────────┴─────────┴─────────┴─────────────────────────┘
```

---

## Button Details

### 👁️ View Button (Emerald)
- **Status:** Always visible for Draft & Active courses
- **Color:** Emerald/Teal gradient
- **Icon:** Eye icon
- **Action:** `handleViewCourse(course)`
- **Opens:** ViewCourseModal
- **Functionality:**
  - Display course title, description, level
  - Play video in HTML5 player
  - Show enrollment numbers
  - Show rating and reviews
  - Display revenue generated
  - Show timestamps
  - Read-only (no editing)
  - Click X to close

### ✏️ Edit Button (Blue)
- **Status:** Visible for Draft & Active courses
- **Color:** Blue gradient
- **Icon:** Edit (pencil) icon
- **Action:** `handleEditCourse(course)`
- **Opens:** EditCourseModal
- **Functionality:**
  - Pre-fill form with existing data
  - Edit title, description, level
  - Upload replacement video
  - Save changes to database
  - Refresh course list on success
  - Auto-close modal after success

### 📤 Publish Button (Green) - Draft Only
- **Status:** Only visible for Draft courses
- **Color:** Green gradient
- **Icon:** Edit (pencil) icon (could be Upload)
- **Action:** `handlePublishCourse(course._id)`
- **Functionality:**
  - Change course status from "Draft" → "Active"
  - Make course visible on public page
  - Disable delete button after publish
  - Button disappears after click
  - Course becomes available for enrollment

### 🗑️ Delete Button (Red) - Draft Only
- **Status:** Only visible for Draft courses
- **Color:** Red gradient
- **Icon:** Trash icon
- **Action:** `handleDeleteCourse(course._id)`
- **Functionality:**
  - Immediately remove course from database
  - Course disappears from list
  - No confirmation dialog (instant delete)
  - Cannot delete Active courses

---

## Button Layout

### Visual Button Row
```
┌─────────────────────────────────────────────────────────────┐
│ [View] [Edit] [Publish] [Delete]     ← Draft Course       │
├─────────────────────────────────────────────────────────────┤
│ [View] [Edit]                         ← Active Course      │
└─────────────────────────────────────────────────────────────┘
```

### CSS Classes
All buttons use consistent styling:
```css
.flex-1                          /* Equal width distribution */
.flex.items-center.justify-center /* Center icon and text */
.gap-2                           /* Space between icon and text */
.py-2                            /* Vertical padding */
.rounded-lg                       /* Border radius */
.transition-colors              /* Smooth hover effect */
.font-semibold                  /* Bold text */
```

### Color Scheme
| Button   | Base Color       | Hover Color      |
|----------|------------------|------------------|
| View     | `bg-emerald-50`  | `hover:bg-emerald-100` |
|          | `text-emerald-700` | — |
| Edit     | `bg-blue-50`     | `hover:bg-blue-100` |
|          | `text-blue-700`  | — |
| Publish  | `bg-green-50`    | `hover:bg-green-100` |
|          | `text-green-700` | — |
| Delete   | `bg-red-50`      | `hover:bg-red-100` |
|          | `text-red-700`   | — |

---

## Modal Interactions

### ViewCourseModal
```
View Button Click
    ↓
handleViewCourse(course)
    ↓
setSelectedCourse(course)
setIsViewModalOpen(true)
    ↓
Modal appears with:
├─ Course title in header
├─ Video player (HTML5)
├─ Course stats (level, enrollment, rating, revenue)
├─ Timestamps and instructor info
└─ Close button (X)

User closes modal → setIsViewModalOpen(false)
```

### EditCourseModal
```
Edit Button Click
    ↓
handleEditCourse(course)
    ↓
setSelectedCourse(course)
setIsEditModalOpen(true)
    ↓
Modal appears with form pre-filled:
├─ Title field
├─ Description field
├─ Level dropdown
├─ Video upload button
└─ Submit/Cancel buttons

User submits → handleSubmit()
    ↓
CourseService.updateCourse(id, data)
    ↓
PATCH /api/courses/:courseId
    ↓
Success message appears
    ↓
Modal closes automatically (1.5s delay)
    ↓
fetchCourses() refreshes list
```

---

## State Management

### Component State Variables
```typescript
// Modal visibility
const [isModalOpen, setIsModalOpen] = useState(false);           // Add new
const [isEditModalOpen, setIsEditModalOpen] = useState(false);   // Edit existing
const [isViewModalOpen, setIsViewModalOpen] = useState(false);   // View details

// Selected course for modals
const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

// Course list
const [courses, setCourses] = useState<Course[]>([]);
const [filterStatus, setFilterStatus] = useState("all");
const [searchTerm, setSearchTerm] = useState("");
```

### Event Handlers
```typescript
const handleViewCourse = (course: Course) => {
  setSelectedCourse(course);
  setIsViewModalOpen(true);
};

const handleEditCourse = (course: Course) => {
  setSelectedCourse(course);
  setIsEditModalOpen(true);
};

const handlePublishCourse = async (courseId: string) => {
  // API call to PATCH /courses/:courseId/publish
  // Refresh course list after success
  await fetchCourses();
};

const handleDeleteCourse = async (courseId: string) => {
  // API call to DELETE /courses/:courseId
  // Refresh course list after success
  await fetchCourses();
};
```

---

## Form State (EditCourseModal)

When edit modal opens, form is pre-populated:

```typescript
useEffect(() => {
  if (isOpen && course) {
    setTitle(course.title);                 // e.g., "React Basics"
    setDescription(course.description);     // e.g., "Learn React..."
    setLevel(course.level);                 // e.g., "Beginner"
    setVideoUrl(course.videoUrl);           // e.g., "https://res.cloudinary..."
    setVideoPublicId(course.videoPublicId); // e.g., "courses/video_abc123"
    setError('');
    setSuccess('');
  }
}, [isOpen, course]);
```

User can then:
1. **Modify text fields** → Update state variables
2. **Change dropdown** → Update level state
3. **Upload new video** → Replace videoUrl and videoPublicId
4. **Click Update** → Submit form with all changes
5. **Click Cancel/X** → Close modal without saving

---

## Error Handling

### Validation Errors
```
User tries to update without title
    ↓
Form validation fails
    ↓
Error message: "Title is required"
    ↓
Modal stays open
    ↓
User can retry
```

### API Errors
```
Network request fails
    ↓
Error caught in try/catch
    ↓
Error message displayed in red banner
    ↓
Example: "Failed to update course: Server error"
    ↓
Modal stays open for retry
    ↓
Auto-dismiss after 5 seconds
```

### Video Upload Errors
```
Large file (> 500MB)
    ↓
Validation fails
    ↓
Error: "File size exceeds 500MB limit"
    ↓
Try again with different file

Invalid format (e.g., .txt)
    ↓
Validation fails
    ↓
Error: "Only video files are supported"
    ↓
Try again with video file
```

---

## Success Flow

```
User fills form and clicks "Update Course"
    ↓
setIsSubmitting(true) - Button disabled, loading state
    ↓
Prepare updateData object with changed fields
    ↓
Call CourseService.updateCourse(courseId, updateData)
    ↓
PATCH request to backend
    ↓
Backend updates MongoDB document
    ↓
Backend returns updated course object
    ↓
Frontend displays: "Course updated successfully!"
    ↓
Green success banner appears for 1.5 seconds
    ↓
Modal automatically closes
    ↓
fetchCourses() called
    ↓
Course list refreshes with new data
    ↓
User sees updated course in card
```

---

## Quick Reference: What Each Button Does

| Button | Prerequisites | On Click | Result |
|--------|---------------|----------|--------|
| **View** | Any course | Show read-only modal | Display all course info + video |
| **Edit** | Any course | Show edit form | Allow changes to title, desc, level, video |
| **Publish** | Draft course only | Publish course | Change status Draft → Active, remove buttons |
| **Delete** | Draft course only | Delete course | Remove course from database and list |

---

## CSS Grid Layout

Buttons are laid out in a single row using Tailwind CSS flex:

```tsx
<div className="flex gap-3">              {/* Flex row with 3px gap */}
  <button className="flex-1 ...">View</button>      {/* 25% width */}
  <button className="flex-1 ...">Edit</button>      {/* 25% width */}
  <button className="flex-1 ...">Publish</button>   {/* 25% width */}
  <button className="flex-1 ...">Delete</button>    {/* 25% width */}
</div>
```

When buttons are hidden (Active course):
```tsx
<div className="flex gap-3">
  <button className="flex-1 ...">View</button>      {/* 50% width */}
  <button className="flex-1 ...">Edit</button>      {/* 50% width */}
  {/* Publish and Delete hidden */}
</div>
```

---

## Backend Integration

### API Endpoints Used

| Endpoint | Method | Purpose | Auth |
|----------|--------|---------|------|
| `/api/courses/:courseId/publish` | PATCH | Publish course | Required |
| `/api/courses/:courseId` | PATCH | Update course fields | Required |
| `/api/courses/:courseId` | DELETE | Delete course | Required |
| `/api/courses/instructor/my-courses` | GET | Fetch all courses | Required |

### Request/Response Format

**Update Course Request:**
```json
PATCH /api/courses/62d1a8c9...

{
  "title": "New Title",
  "description": "New Description",
  "level": "Intermediate",
  "videoUrl": "https://res.cloudinary.com/...",
  "videoPublicId": "courses/video_id"
}
```

**Update Course Response:**
```json
{
  "_id": "62d1a8c9...",
  "title": "New Title",
  "description": "New Description",
  "level": "Intermediate",
  "status": "Draft",
  "videoUrl": "https://res.cloudinary.com/...",
  "lastUpdated": "2024-01-15T10:30:00Z",
  ...
}
```

---

## Troubleshooting Quick Links

| Issue | Check |
|-------|-------|
| Buttons not showing | Verify InstructorCourses component imports modals |
| Buttons not clickable | Check browser console for JavaScript errors |
| Modal doesn't open | Verify `selectedCourse` has `_id` field |
| Form doesn't pre-fill | Check EditCourseModal useEffect dependency array |
| Changes not saving | Verify backend PATCH endpoint is working |
| Video upload fails | Check Cloudinary credentials and backend signature generation |
| List doesn't refresh | Verify `fetchCourses()` called in modal callbacks |

