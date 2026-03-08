# Free Yoga Class Hanumangarh

## Current State
The project is being rebuilt from scratch. No existing frontend or backend code is present.

## Requested Changes (Diff)

### Add
- Full yoga class website with mobile app-like look
- Home page with yoga class info, timings, location, WhatsApp and Call buttons
- Photo gallery section with 5 uploaded photos
- Admission Form page (separate route) with compulsory fields: Name, Address, Contact, Gmail/Email, Date of Birth, ID Proof Number, ID Proof File upload
- Unique confirmation code on form submission in format YOGA001, YOGA002, YOGA003...
- Admin Panel page (/admin route) with login (Username: Tushar 5522, Password: Yoga@32752)
- Admin Panel Tab 1: Admission Records - view all submitted forms with ID proof file view
- Admin Panel Tab 2: Attendance Sheet - select date, mark Present/Absent for each registered member, save attendance, view past attendance
- Admin Panel Tab 3: Monthly Summary - select month/year, view each member's Present count, Absent count, Attendance %, download as CSV/PDF
- Bottom navigation bar with tabs: Home, Admission Form, Contact
- PWA manifest with blue yoga silhouette app icon

### Modify
- None (fresh build)

### Remove
- None (fresh build)

## Implementation Plan

### Backend
- `submitAdmission(form: AdmissionForm): Result<ConfirmationCode, Text>` -- saves admission with auto-incremented YOGA### code, stores id proof file as blob
- `getAdmissions(): [AdmissionRecord]` -- returns all admission records (admin only via hardcoded credentials check)
- `adminLogin(username: Text, password: Text): Bool` -- validates credentials
- `markAttendance(date: Text, records: [AttendanceRecord]): Result` -- saves date-wise attendance
- `getAttendance(date: Text): [AttendanceRecord]` -- returns attendance for a date
- `getMonthlySummary(month: Nat, year: Nat): [MemberSummary]` -- returns per-member Present/Absent counts and %

### Frontend
- App.tsx with React Router: /, /admission, /admin routes
- Home page: hero section with yoga info, timings (5:00 AM daily), instructor (Ratiram Ji Saharan), location (Ambedkar Bhavan, Karni Chowk, Hanumangarh Junction), WhatsApp button (Tushar Verma - 9057036745), Call button (Ratiram Ji - +91 90247 83339), WhatsApp Channel link, photo gallery
- Admission Form page: all 7 fields required, file upload with drag-and-drop, submit shows YOGA### confirmation code
- Admin Panel page: login form, then 3 tabs (Admission Records, Attendance Sheet, Monthly Summary)
- Attendance Sheet: date picker, list of all admitted members with Present/Absent toggle, save button
- Monthly Summary: month/year picker, table with member stats, CSV download button, PDF print button
- Bottom navigation bar on all pages
- Blue yoga silhouette favicon/manifest icon
