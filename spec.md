# Free Yoga Class Hanumangarh

## Current State

The app has:
- Home page with yoga class info, photos gallery, WhatsApp/call buttons
- Admission Form page (separate page) with fields: Name, Address, Contact, Gmail, Date of Birth, ID Proof Number, ID Proof File Upload (all required) — generates YOGA001, YOGA002... confirmation codes
- Admin Panel (`/admin`) with:
  - Login (Username: Tushar 5522, Password: Yoga@32752)
  - Tab 1: "प्रवेश रिकॉर्ड" — table of all admission entries
  - Tab 2: "अटेंडेंस शीट" — date-wise attendance marking (Present/Absent checkboxes), save/view past dates
- Backend APIs: `getAllAdmissions`, `getAttendance`, `getAttendanceDates`, `saveAttendance`, `submitAdmission`

## Requested Changes (Diff)

### Add
- Tab 3: "मासिक सारांश" (Monthly Summary) in Admin Panel
  - Month + Year dropdown selectors (default = current month/year)
  - Summary table: columns — YOGA Code, Name, Present Days, Absent Days, Total Days, Attendance %
  - Export to PDF button (print-friendly layout)
  - Export to Excel/CSV button (downloads .csv file)

### Modify
- Admin Panel TabsList: add third tab trigger for Monthly Summary
- AdminDashboard component: pass attendance data/dates to new MonthlySummary component

### Remove
- Nothing

## Implementation Plan

1. Add `MonthlySummary` component in `AdminPage.tsx`:
   - Month/Year selectors (dropdowns for month 1–12, year from 2025 onward)
   - On selection change, fetch all attendance dates, filter to selected month/year
   - For each filtered date, fetch attendance records
   - Aggregate per member: count present days, absent days, total days recorded, attendance %
   - Render summary table with Badge for attendance % (green ≥75%, yellow 50-74%, red <50%)
   - "CSV डाउनलोड करें" button: generates and downloads .csv file
   - "PDF प्रिंट करें" button: uses window.print() with a print-only CSS class to render clean table
2. Add third tab trigger "मासिक सारांश" with BarChart icon
3. Add third TabsContent wrapping MonthlySummary
4. Pass credentials and actor to MonthlySummary
