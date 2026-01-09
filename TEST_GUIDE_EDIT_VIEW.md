# Quick Test Guide - Edit & View Features

## Start the Application

```bash
# Terminal 1: Start Backend
cd d:\My Projects\e-learning-platform\backend
npm run dev

# Terminal 2: Start Frontend
cd d:\My Projects\e-learning-platform\elearn-live
npm run dev
```

Navigate to: `http://localhost:5173/instructor/courses`

---

## Feature Testing

### 1️⃣ View Course Details
```
1. Go to "My Courses" section
2. Find any course (Draft or Active)
3. Click the "View" button (emerald color)
   Expected: ViewCourseModal opens showing:
   ✓ Course title at top
   ✓ Video player with controls
   ✓ Course level badge
   ✓ Enrollment numbers (X/Capacity)
   ✓ Rating and review count
   ✓ Revenue generated
   ✓ Timestamps
   ✓ Instructor info
4. Click X button to close
```

### 2️⃣ Edit Draft Course - Fields Only
```
1. Find a Draft course
2. Click the "Edit" button (blue color)
   Expected: EditCourseModal opens with:
   ✓ Form pre-filled with course data
   ✓ Title field has current title
   ✓ Description shows current text
   ✓ Level shows selected level
   ✓ Video URL and preview visible
3. Change title and description
4. Change level from dropdown
5. Click "Update Course"
   Expected:
   ✓ Loading spinner appears
   ✓ Success message: "Course updated successfully!"
   ✓ Modal closes after 1.5 seconds
   ✓ Course list refreshes
   ✓ Changes visible in course card
6. Click View to confirm changes saved
```

### 3️⃣ Edit Draft Course - Replace Video
```
1. Find a Draft course
2. Click the "Edit" button
3. Click "Upload Video" button
   Expected: File picker opens
4. Select a new video file (MP4, MOV, etc)
   Expected:
   ✓ File validation runs (size max 500MB)
   ✓ "Getting upload signature from backend..." message
   ✓ "Starting Cloudinary upload..." message
   ✓ Progress bar or loading indicator
   ✓ "✓ Video uploaded successfully!" success
   ✓ Video preview updates (if applicable)
5. Keep other fields as is
6. Click "Update Course"
   Expected:
   ✓ New video saved to database
   ✓ Cloudinary URL stored
7. View course to verify new video plays
```

### 4️⃣ Publish Draft Course
```
1. Find a Draft course (blue status badge)
2. Click the "Publish" button (green color)
   Expected:
   ✓ Course status changes to "Active" (green badge)
   ✓ Edit and Delete buttons disappear
   ✓ Only View and Edit buttons remain
3. Switch to "Public Courses" page
4. Course should now be visible in the list
5. Click course card to verify it's available for enrollment
```

### 5️⃣ Edit Active Course
```
1. Find an Active course (published)
2. Click the "Edit" button (still available)
   Expected: EditCourseModal opens
3. Can modify title, description, and level
4. Can replace video if needed
5. Click "Update Course"
   Expected:
   ✓ Active course updates without status change
   ✓ Remains Active and public
   ✓ Delete button NOT available for Active courses
```

### 6️⃣ Delete Draft Course
```
1. Find a Draft course
2. Click the "Delete" button (red color)
   Expected:
   ✓ Course removed immediately
   ✓ No longer appears in course list
   ✓ No confirmation dialog (instant delete)
   Alternative: Add confirmation if needed
```

---

## Debug Console Checks

### Frontend Console (Browser DevTools)
Look for these messages:

```
✅ Successfully fetched courses
🔐 Getting upload signature from backend...
📤 Starting Cloudinary upload...
✓ Video uploaded successfully!
```

### Backend Console (Node Terminal)
Look for these messages:

```
📥 Signature request received
✅ Signature generated successfully!
✓ Course created successfully
✓ Course updated successfully
✓ Course published successfully
✓ Course deleted successfully
```

---

## Common Issues & Solutions

### Issue: "Video upload fails with 401 error"
```
✗ Problem: Not authenticated with backend
✓ Solution:
  1. Check localStorage for auth token
  2. Login to instructor account first
  3. Verify backend /api/courses/upload/video-signature route is accessible
```

### Issue: "Video format not accepted"
```
✗ Problem: Selected unsupported video format
✓ Supported: MP4, MOV, AVI, WebM, FLV, MKV
✓ Solution: Convert video to MP4 format
```

### Issue: "File size too large"
```
✗ Problem: Video file exceeds 500MB limit
✓ Solution: Compress video or split into multiple files
```

### Issue: "Modal doesn't open when clicking Edit"
```
✗ Problem: Component state not updating
✓ Solutions:
  1. Check browser console for errors
  2. Verify course object has _id field
  3. Ensure EditCourseModal and ViewCourseModal are imported
```

### Issue: "Changes not saved after clicking Update"
```
✗ Problem: API request failed
✓ Solutions:
  1. Check backend console for errors
  2. Verify backend /api/courses/:courseId route is working
  3. Check network tab in DevTools for failed requests
  4. Ensure course._id is correct
```

---

## Expected Behavior Summary

| Action | Input | Expected Output |
|--------|-------|-----------------|
| Click View | Any course | ViewCourseModal with read-only data |
| Click Edit | Draft course | EditCourseModal with editable form |
| Click Edit | Active course | EditCourseModal with editable form |
| Upload video | Valid video file | Success message, video preview |
| Upload video | Invalid format | Error: "Unsupported file type" |
| Upload video | File > 500MB | Error: "File size exceeds limit" |
| Update course | Valid form data | Success, modal closes, list refreshes |
| Update course | Invalid data | Error message, modal stays open |
| Click Publish | Draft course | Status changes to Active |
| Click Publish | Active course | Button not available |
| Click Delete | Draft course | Course removed immediately |
| Click Delete | Active course | Button not available |

---

## Verification Points

After implementation, verify:

- [ ] ViewCourseModal file exists: `elearn-live/src/components/instructor/ViewCourseModal.tsx`
- [ ] EditCourseModal file exists: `elearn-live/src/components/instructor/EditCourseModal.tsx`
- [ ] InstructorCourses imports both modals
- [ ] InstructorCourses has state for modals: `isViewModalOpen`, `isEditModalOpen`, `selectedCourse`
- [ ] InstructorCourses has handlers: `handleViewCourse()`, `handleEditCourse()`
- [ ] View button wired: `onClick={() => handleViewCourse(course)}`
- [ ] Edit button wired: `onClick={() => handleEditCourse(course)}`
- [ ] Both modals added to JSX at bottom of component
- [ ] Backend PATCH `/api/courses/:courseId` endpoint functional
- [ ] Cloudinary video upload working in EditCourseModal
- [ ] Course list refreshes after update
- [ ] Status-based button visibility working correctly

---

## Performance Expectations

- Modal open/close: < 200ms (smooth animation)
- Video upload: Depends on file size and internet speed
  - Small video (50MB): ~5-10 seconds
  - Large video (300MB): ~30-60 seconds
- Course update (no video): < 500ms
- Course list refresh: < 1000ms
- Modal component render: < 100ms

---

## Success Indicators

You've successfully implemented the feature when:

✅ All 6 test scenarios pass without errors
✅ Console shows no TypeScript errors
✅ Video uploads complete successfully
✅ Course changes persist after page refresh
✅ Status-based button visibility works correctly
✅ Modals open/close smoothly with animations
✅ Error messages display properly on failures
✅ Success messages appear after updates

---

## Production Readiness

Before deploying to production:

- [ ] Verify all error boundaries are in place
- [ ] Test with slow network (DevTools throttling)
- [ ] Test with slow CPU (DevTools CPU throttling)
- [ ] Test on mobile devices
- [ ] Verify auth token handling
- [ ] Test logout/login cycle
- [ ] Check CORS headers on backend
- [ ] Verify Cloudinary credentials are in .env
- [ ] Test with various video formats and sizes
- [ ] Load test with multiple concurrent users

