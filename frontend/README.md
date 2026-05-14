# Meeting Room Booking System — Frontend Documentation

A full-featured meeting room reservation platform built with **React 19**, **TypeScript**, **Material UI v7**, and **SCSS**. It follows the **MVVM (Model-View-ViewModel)** pattern and uses **Redux Toolkit** for global state.

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Architecture Overview](#architecture-overview)
3. [Project Structure](#project-structure)
4. [Routing & Access Control](#routing--access-control)
5. [Roles & Permissions](#roles--permissions)
6. [Pages](#pages)
7. [Components](#components)
8. [ViewModels](#viewmodels)
9. [Services](#services)
10. [Redux Store](#redux-store)
11. [Models](#models)
12. [Utilities](#utilities)
13. [Theme](#theme)
14. [Styling (SCSS)](#styling-scss)
15. [API Layer](#api-layer)
16. [Feature Highlights](#feature-highlights)

---

## Tech Stack

| Category | Library / Tool |
|---|---|
| UI Framework | React 19 + TypeScript |
| Component Library | Material UI v7 (MUI) |
| Styling | SCSS (Sass) + MUI Emotion |
| State Management | Redux Toolkit |
| Server State / Caching  |
| Routing | React Router DOM v7 |
| Forms | React Hook Form + Zod |
| HTTP Client | Axios (with interceptors) |
| Date Handling | Day.js |
| Icons | Lucide React |
| Notifications | React Toastify |
| Color Picker | react-color (SketchPicker) |
| Build Tool | Vite |

---

## Architecture Overview

The project uses a layered **MVVM** architecture:

```
Page (View)
  └── ViewModel (useXxxViewModel hook)
        └── Service (API call functions)
              └── API instance (Axios)
                    └── Backend REST API
```

- **Pages** are pure presentational shells — they render components and wire up ViewModel hooks.
- **ViewModels** (`src/viewmodels/`) are custom hooks that own all business logic, local state, and side effects for a feature.
- **Services** (`src/services/`) are thin wrappers around Axios calls — no logic, just HTTP.
- **Models** (`src/models/`) define all TypeScript interfaces and types.
- **Redux** is used only for cross-page shared state: auth tokens, the active booking form, and announcement data.

---

## Project Structure

```
src/
├── api/                    # Axios instance + auth API helpers
├── assets/scss/            # Global and component-level SCSS
│   ├── components/         # Per-component SCSS files
│   ├── layout/             # Layout SCSS
│   └── pages/              # Per-page SCSS files
├── components/             # Reusable UI components
│   ├── Announcements/
│   ├── Auth/
│   ├── BookingRooms/
│   ├── BookRoom/
│   ├── Calendar/
│   ├── Dashboard/
│   ├── Meeting-Rooms/
│   ├── Navbar/
│   ├── Participants/
│   ├── Reports/
│   ├── Settings/
│   └── ui/                 # Generic design-system primitives
├── constant/               # App-wide constants
├── helper/                 # localStorage helpers
├── hooks/                  # Shared React hooks (useAuth, usePermissions)
├── layouts/                # DashboardLayout, ProtectedRoutes
├── models/                 # TypeScript interfaces, enums, Zod schemas, mappers
├── pages/                  # Route-level page components
├── redux/                  # Redux slices + store
├── services/               # Axios service functions (one file per domain)
├── theme/                  # MUI theme configuration
├── utils/                  # Pure utility functions
├── viewmodels/             # Feature-level business logic hooks
├── App.tsx                 # Route definitions
└── main.tsx                # App entry point (providers)
```

---

## Routing & Access Control

Routes are defined in `App.tsx` using React Router DOM v7.

### Auth Routes (public)

| Path | Page | Description |
|---|---|---|
| `/` | `Login` | Email + password login |
| `/forgot-password` | `ForgotPassword` | Request OTP via email |
| `/verify-password` | `VerifyPassword` | Enter OTP code |
| `/create-password` | `CreatePassword` | Set new password after OTP |

### Dashboard Routes (protected, inside `DashboardLayout`)

| Path | Page | Allowed Roles |
|---|---|---|
| `/dashboard` | `Dashboard` | ADMIN, MANAGER, STAFF |
| `/calendar` | `Calendar` | All |
| `/book-room` | `BookRoom` | ADMIN, MANAGER |
| `/meeting-rooms` | `MeetingRooms` | ADMIN, MANAGER |
| `/room-timeslot` | `RoomTimeslot` | ADMIN, MANAGER |
| `/announcements` | `Announcements` | All |
| `/report` | `Report` | ADMIN only |
| `/participants` | `Participants` | ADMIN, MANAGER |
| `/settings` | `Settings` | All |
| `/profile` | `UserProfile` | All |
| `/upcoming-meetings` | `UpcomingMeetings` | All |

### `ProtectedRoutes` (`src/layouts/ProtectedRoutes.tsx`)

Wraps any route that requires authentication. Reads `accessToken` and `role` from Redux (`authSlice`). Redirects to `/` if no token, or to `/unauthorized` if the role is not in the allowed list.

### `DashboardLayout` (`src/layouts/DashboardLayout.tsx`)

Renders the persistent shell: `TopNavbar` at the top, `Sidebar` on the left, and the active page via `<Outlet />` in the main content area.

---

## Roles & Permissions

Three roles exist: `ADMIN`, `MANAGER`, `STAFF`. Permissions are defined in `src/utils/permissions.ts` and consumed via the `usePermissions()` hook.

| Permission | ADMIN | MANAGER | STAFF |
|---|:---:|:---:|:---:|
| `canBookRoom` | ✅ | ✅ | ❌ |
| `canManageRooms` | ✅ | ❌ | ❌ |
| `canManageUsers` | ✅ | ❌ | ❌ |
| `canAddUsers` | ✅ | ❌ | ❌ |
| `canMannageAnnouncements` | ✅ | ✅ | ❌ |
| `canManageMeetingType` | ✅ | ✅ | ❌ |

---

## Pages

### `Login` (`/`)
Email and password form built with React Hook Form and MUI `TextField`. Submits via `useLoginViewModel`, which calls the auth service, stores tokens in `localStorage` and Redux, then navigates to `/dashboard`. Includes a password visibility toggle and a "Forgot Password" link.

### `ForgotPassword` (`/forgot-password`)
Single email input. On submit, dispatches the `forgotPassword` Redux thunk. On success, stores the email in `localStorage` and navigates to `/verify-password`.

### `VerifyPassword` (`/verify-password`)
OTP entry form. Uses `verifyOtpSlice` to validate the code. Includes a resend OTP timer via `useOtpTimer`.

### `CreatePassword` (`/create-password`)
New password + confirm password form. Uses `createPasswordSlice`.

### `Dashboard` (`/dashboard`)
Overview page for ADMIN and MANAGER. Displays four stat cards (Total Rooms, Active Users, Avg Duration, Peak Hours) fetched via `useDashboardViewModel`. Also renders:
- `DashboardAnnouncements` — latest pinned announcements
- `DashboardUpMeetings` — upcoming meetings list
- `CalendarPreview` — mini calendar with date-range selection

### `Calendar` (`/calendar`)
The most complex page. Supports two views:

- **Month View** — a room-vs-date grid. Each cell shows up to 4 events for that room on that day, with a "+N more" overflow popover. Clicking a cell switches to Day View for that room and date.
- **Day View** — renders the `TimeSlotSelector` component for the selected room, allowing drag-to-select a time range and then proceeding to booking.

Features: date picker popover, room filter dropdown, meeting type color legend, event detail modal (`CalendarModal`), navigation arrows, and a "Today" jump button.

### `BookRoom` (`/book-room`)
The booking form. Fields: Meeting Title, Start Date, Start/End Time (via `TimeSlotSelector` dialog), Meeting Type, Recurrence (None/Daily/Weekly/Monthly/Yearly/Custom/Weekday), Recurrence End Date, Description, Internal Participants, External Participants.

Supports three submit modes passed via `location.state`:
- Default — create a new booking
- `editOnce` — edit a single occurrence
- `editAll` — edit all occurrences in a recurrence series

### `MeetingRooms` (`/meeting-rooms`)
Grid of `Meeting_roomCard` components. ADMIN/MANAGER can add a new room via `AddMeetingRoomForm`. Each card links to the `RoomTimeslot` page for that room.

### `RoomTimeslot` (`/room-timeslot`)
Full-page time slot selector for a specific room. Shows the room name, a color legend (selected / past / booked), and the `TimeSlotSelector`. On "Proceed to Booking", pre-fills the booking form and navigates to `/book-room`.

### `Announcements` (`/announcements`)
Lists all announcements with pinned items shown first. ADMIN/MANAGER can:
- Create new announcements (with title, message, pin toggle, start/end date)
- Edit or delete individual announcements
- Bulk-select and delete multiple announcements
- Switch between "All" and "Scheduled" tabs

Unread count is shown as a badge on the Sidebar icon.

### `Participants` (`/participants`)
Three-tab management page:
- **All Participants** — searchable/sortable table of all users. ADMIN can add, edit, or delete users.
- **Custom Groups** — card grid of user groups. ADMIN can create groups and assign members.
- **Departments** — table of departments. ADMIN can add/edit/delete departments.

### `Report` (`/report`)
ADMIN-only. MUI `DataGrid` with server-side pagination, sorting, and filtering. Columns: date, meeting title, room, start/end time, meeting type, created by. Features:
- Filter drawer (`ReportFilters`) — filter by date range, room, meeting type
- Column visibility toggle
- CSV/Excel export via `exportReport`

### `Settings` (`/settings`)
Four sections:
- **Notifications** — toggle switches for notification preferences
- **Meeting Type Colors** — ADMIN/MANAGER can add, rename, recolor, or delete meeting types using a `SketchPicker` color picker
- **Booking Preferences** — default duration, buffer time, auto-decline toggle (UI only)
- **Security** — change password form

### `UserProfile` (`/profile`)
Displays the logged-in user's info (name, email, phone, position, department, role). An "Edit Info" button switches to an inline `ProfileSection` form for updating details.

### `UpcomingMeetings` (`/upcoming-meetings`)
Card list of upcoming meetings. ADMIN/MANAGER can toggle between "All Upcoming" and "History" (past meetings booked by the current user).

---

## Components

### Layout Components

**`Sidebar`** (`src/components/Sidebar.tsx`)
MUI `Drawer` (permanent variant). Renders role-filtered navigation items. Collapses to icon-only mode via a toggle button. Shows an unread announcement badge on the Announcements item. Includes a logout button that opens the `Logout` confirmation dialog.

**`TopNavbar`** (`src/components/TopNavbar.tsx`)
MUI `AppBar`. Shows the app logo (links to `/dashboard`) and a user avatar button. Clicking the avatar opens a dropdown menu with "Profile" and "Logout" options.

**`AuthTopBar`** (`src/components/AuthTopBar.tsx`)
Minimal top bar shown on auth pages (forgot/verify/create password).

### Dashboard Components

**`DashboardCard`** — Renders the four stat cards with icon, number, title, and description. Cards for Total Rooms and Active Users are clickable and navigate to their respective pages.

**`DashboardAnnouncements`** — Shows the latest pinned announcements in a compact list.

**`DashboardUpMeetings`** — Lists the next few upcoming meetings with time, room, and meeting type chip.

**`CalendarPreview`** — Mini calendar with date-range selection. Highlights dates that have bookings. Shows a meeting list for the selected date range below the calendar.

**`PinnedAnnouncements`** — Compact pinned announcement display used in the dashboard.

### Calendar Components

**`CalendarModal`** — Popover/dialog that appears when clicking an event on the calendar. Shows: meeting title, type chip, date & time, room, booked-by, description, and a collapsible participants accordion (internal/external tabs). ADMIN/MANAGER see Edit and Delete action buttons. Supports editing a single occurrence or all occurrences of a recurring meeting.

### Meeting Room Components

**`Meeting_roomCard`** — Card displaying room name, capacity, resources, and status. Includes an edit button (opens `AddMeetingRoomForm` in edit mode) and a "View Timeslots" button.

**`Meeting_roomCard-Details`** — Expanded detail view of a room.

**`AddMeetingRoomForm`** — Modal form for creating or editing a meeting room. Fields: name, capacity, resources (checkboxes), status.

**`TimeSlotSelector`** — The core booking interaction component. Renders a 24-hour vertical timeline for a specific room and date. Features:
- Click to create a time block
- Drag to move the block
- Drag top/bottom handles to resize
- Displays existing bookings (red, non-interactive)
- Grays out past time slots
- Snaps to 5-minute intervals
- Works in three modes: standalone page, calendar day view, and dialog inside the booking form

### Booking Room Components

**`ParticipantsCard`** — Searchable list of internal users to add as participants. Supports checkbox selection.

**`ExternalCard`** — Form to add external participants (name + email). Added participants appear as chips.

**`RoomDetailsCard`** — Room selector dropdown used in the booking flow.

**`SelectTimeCard`** — Time selection card (legacy, largely replaced by `TimeSlotSelector`).

### Announcement Components

**`AnnouncementCard`** — Single announcement row. Shows title, message preview, dates, pin indicator, and read status. Supports inline edit (opens `AnnouncementModal`), delete, pin/unpin, and mark-as-read actions. In select mode, shows a checkbox.

**`AnnouncementModal`** — Create/edit modal. Fields: title, message, pin toggle, start date, end date.

**`AnnouncementDetailModal`** — Full-content view of an announcement.

### Participant Components

**`Participants-Table`** — MUI DataGrid of all users. Columns: name, email, role, department, phone. Supports edit and delete per row.

**`AddParticipants-Form`** — Modal form to add a new user. Fields: first name, last name, email, phone, role, department.

**`GroupCard`** — Card grid of custom groups. Each card shows group name and member count.

**`AddGroup-Form`** — Modal form to create a group and assign members from a searchable list.

**`Department-Table`** — Table of departments with add/edit/delete.

**`AddDepartment-Form`** — Modal form for department name.

**`RoleDropdown`** — Reusable role selector dropdown.

### Report Components

**`ReportFilters`** — Slide-in drawer with filter controls: date range, room selector, meeting type selector. Emits an `onApply` callback with the filter payload.

### Settings Components

**`ColorSection`** — Meeting type color management. Lists all types with a color swatch. Clicking the swatch opens a `SketchPicker`. Supports inline rename, add new type, and delete (with confirmation dialog).

**`NotificationSection`** — Toggle switches for notification preferences.

**`BookingSection`** — Default duration, buffer time, and auto-decline toggle.

**`SecuritySection`** — Change password form.

**`ProfileSection`** — Editable user profile form (used in both Settings and UserProfile pages).

### UI Primitives (`src/components/ui/`)

**`Button` (`MyButton`)** — Wrapper around MUI `Button` with custom variants: `dark` (filled dark), `ghost` (transparent), `danger` (red text). Accepts all standard MUI button props plus `text` and `customVariant`.

**`ConfirmDialog`** — Reusable confirmation dialog with title, content text, confirm button (customizable label and icon), and cancel button.

**`CommonDropdown`** — Generic dropdown component.

**`Spinner`** — Centered MUI `CircularProgress` loading indicator.

**`Skeleton`** — Loading skeleton placeholder.

---

## ViewModels

Each ViewModel is a custom hook that encapsulates all business logic for a feature. Pages import the ViewModel and destructure what they need.

| ViewModel | Responsibility |
|---|---|
| `useLoginViewModel` | Login, logout, token storage, Redux auth dispatch |
| `useLogoutViewModel` | Logout confirmation dialog state + confirm handler |
| `useDashboardViewModel` | Fetch dashboard stats (total rooms, users, avg duration) |
| `useCalendarEventViewModel` | Month/day event fetching, navigation, event modal, date-range selection for CalendarPreview |
| `useBookingRoomViewModel` | Booking form change handlers, submit (create/edit), meeting type fetch, time slot state, participant card toggle |
| `useRoomTimeslotViewModel` | Date navigation for the time slot selector, formatted date strings, past-day detection |
| `useTimeSlotsViewModel` | Booked slot fetching for a room+date, time click handling |
| `useMeeting_roomCardViewModel` | Room list fetch, room form open/close state, upcoming meetings fetch |
| `useAddRoomViewModel` | Add/edit room form state and submit |
| `useParticipantsViewModel` | User list fetch, participants form state |
| `useAddParticipantsViewModel` | Add participant form state and submit |
| `useGroupCardViewModel` | Group list fetch, group form state |
| `useAddGroupViewModel` | Add group form state and submit |
| `useDepartmentListViewModel` | Department list fetch, department form state |
| `useAnnouncementViewModel` | Announcement create/edit form state and submit |
| `useAnnouncementCardViewModel` | Announcement list (pinned/unpinned/scheduled), pagination, mark-read, delete, bulk-delete, pin toggle |
| `useMeetingReportViewModel` | Report data fetch with server-side pagination/sort/filter, column definitions, export |
| `useSettingsViewModel` | Meeting type CRUD, color picker state, change password |
| `useUserProfileViewModel` | Profile fetch, edit form state, save |
| `useOtpTimer` | Countdown timer for OTP resend |

---

## Services

Each service file maps to one backend domain. All functions use the shared Axios instance from `src/api/api.ts`.

| Service File | Endpoints Covered |
|---|---|
| `auth.service.ts` | `POST /api/v1/login`, `POST /api/v1/logout` |
| `bookRoom.service.ts` | Book room, edit by ID, edit by recurrence ID, get by room ID, get by meeting ID, cancel (change status) |
| `calendar.service.ts` | `POST /api/v1/calender/month`, `POST /api/v1/calender/day`, `POST /api/v1/calender/week` |
| `dashboard.service.ts` | `GET /api/v1/dashboard` |
| `announcements.service.ts` | CRUD for announcements, pin/unpin, mark-read, bulk-delete |
| `participants.service.ts` | CRUD for users |
| `groupCard.services.ts` | CRUD for groups |
| `departmentList.service.ts` | CRUD for departments |
| `Meetinf_room.service.ts` | CRUD for meeting rooms |
| `TimeSlots.service.ts` | Fetch time slots for a room |
| `roomSchedule.service.ts` | Room schedule data |
| `report.service.ts` | Paginated report fetch, export, meeting type list |
| `settings.service.ts` | Meeting type CRUD, change password |
| `UserProfile.service.ts` | Get and update user profile |

---

## Redux Store

The store (`src/redux/store.ts`) is configured with Redux Toolkit. Typed `useAppDispatch` and `useAppSelector` hooks are exported from the store file.

| Slice | State | Purpose |
|---|---|---|
| `authSlice` | `accessToken`, `refreshToken`, `role` | Persists auth state; initialized from `localStorage` |
| `bookRoomSlice` | Full `BookingRoomData` object | Shared booking form state across `BookRoom`, `TimeSlotSelector`, `RoomTimeslot`, and `Calendar` pages |
| `announcementSlice` | Announcement list state | Shared announcement data |
| `forgotSlice` | `loading`, `error` | Forgot password async thunk state |
| `verifyOtpSlice` | `loading`, `error` | OTP verification async thunk state |
| `createPasswordSlice` | `loading`, `error` | Create password async thunk state |
| `resendOtpSlice` | `loading`, `error` | Resend OTP async thunk state |
| `ParticipantsSlice` | `participants`, `selectedParticipants` | Participant selection for booking |
| `MeetingRoomSlice` | Room list and form state | Meeting room management |

### Key `bookRoomSlice` Actions

| Action | Description |
|---|---|
| `updateBookingRoomFormData` | Partial update of any booking form field |
| `setBookingRoomFormData` | Full replacement (used when editing an existing booking) |
| `toggleParticipantsSelection` | Add/remove an internal participant ID |
| `toggleExternalParticipantsSelection` | Remove an external participant by email |
| `toggleWeekDay` | Add/remove a day from the custom recurrence weekdays array |
| `clearBookingRoomFormData` | Reset form to initial state (called on unmount) |

---

## Models

All TypeScript interfaces and types live in `src/models/`.

| Model File | Key Types |
|---|---|
| `auth.model.ts` | `LoginRequest`, `LoginResponse`, `LoginFormInputs` |
| `bookRoom.model.ts` | `BookingRoomData`, `BookedRoomDataResponse`, `ExternalParticipant`, `RecurrenceType`, `WeekDays`, `MeetingTypeInfo` |
| `calendar.model.ts` | `CalendarEvent`, `CalendarItem`, `CalenderDay`, `CalenderMonth`, `MeetingType` |
| `meeting_room.model.ts` | `meeting_rooms` |
| `participants.model.ts` | `Participant`, `User` |
| `announcements.model.ts` | `Announcement` |
| `settings.model.ts` | `MeetingTypeUI`, `MeetingTypeRequest`, `changePassDataType` |
| `profileSection.model.ts` | `UserProfile` |
| `meetingReport.model.ts` | `ReportRow`, `ReportColumn` |
| `groupCard.model.ts` | `Group` |
| `departmentList.model.ts` | `Department` |
| `timeSlots.model.ts` | `TimeSlot` |

### Mappers (`src/models/mapper/`)

**`CalendarToBookRoomMapper.ts`** — Converts a `BookedRoomDataResponse` (from the event detail API) into a `BookingRoomData` object so the booking form can be pre-filled when editing from the calendar.

**`ParticipantMapper.ts`** — Maps raw API participant shapes to the internal participant model.

### Schemas (`src/models/scehma/`)

**`user.schema.ts`** and **`profileUpdate.schema.ts`** — Zod validation schemas for user creation and profile update forms.

### Constants (`src/models/constants/`)

**`Roles.ts`** — Role enum/constants.  
**`Departments.ts`** — Department list constants.

---

## Utilities

**`timeUtils.ts`** — Pure time conversion functions used throughout the app:
- `timeStringToMinutes(str)` — `"14:30"` → `870`
- `minutesToTimeString(n)` — `870` → `"14:30"`
- `formatDisplayTime(n)` — `870` → `"2:30 PM"`
- `formatDuration(start, end)` — `(870, 930)` → `"1h"`
- `snapToInterval(minutes, interval)` — snaps to nearest N-minute mark
- `clamp(val, min, max)` — bounds a number

**`permissions.ts`** — The permissions map object (role → capability flags).

**`bookingValidation.ts`** — Manual form validation for the booking form, returns a partial error record.

---

## Theme

`src/theme/muiTheme.ts` defines a custom MUI theme:

- **Primary color**: `#5B6CFF` (indigo-blue)
- **Secondary**: `#3660eb`
- **Success**: `#00A63E`
- **Font**: Roboto (loaded via `@fontsource/roboto`)
- **Typography scale**: h1 (28px/500) down to subtitle1 (16px, neutral gray)
- **Button overrides**: `textTransform: none`, `borderRadius: 10px`, no default uppercase

---

## Styling (SCSS)

Styles are organized to mirror the component/page structure:

```
src/assets/scss/
├── global.scss              # CSS variables, resets, shared utility classes
├── layout/
│   └── DashboardLayout.scss # Sidebar + content area flex layout
├── pages/                   # One file per page
│   ├── Calendar.scss        # Room grid, event chips, day view
│   ├── BookRoom.scss
│   ├── Dashboard.scss
│   └── ...
└── components/              # One file per component or component group
    ├── TimeSlotSelector.scss # Timeline, slot block, handles
    ├── Dashboard/
    ├── Calendar/
    └── ...
```

CSS custom properties (variables) are defined in `global.scss` and used across all files for consistent colors, spacing, and typography.

---

## API Layer

**`src/api/api.ts`** — Single Axios instance shared by all services.

- `baseURL` is read from `VITE_BASE_URL` in `.env`
- **Request interceptor**: automatically attaches `Authorization: Bearer <token>` from `localStorage`
- **Response interceptor**: on `401 Unauthorized`, attempts a silent token refresh via `POST /api/v1/access/token` using the stored refresh token. On success, retries the original request with the new token. On failure, clears `localStorage` and redirects to `/`

**`src/api/auth/forgotApi.ts`** — Separate Axios calls for the forgot-password OTP flow (no auth header needed).

---

## Feature Highlights

### Recurring Meetings
Bookings can be set to repeat: Daily, Weekly, Monthly, Yearly, Every Weekday, or Custom (pick specific days of the week). A recurrence end date is required for any non-NONE recurrence. When editing or deleting from the calendar, the user is prompted to modify "This Meeting" (single occurrence) or "All Meetings" (entire series).

### Interactive Time Slot Selector
The `TimeSlotSelector` component provides a drag-based time picker on a 24-hour vertical timeline. Users click to create a block, drag to move it, and drag the top/bottom handles to resize. Existing bookings are shown in red and block overlap. Past time is grayed out and non-interactive. The component is reused in three contexts: the standalone Room Timeslot page, the Calendar day view, and as a dialog inside the Book Room form.

### Calendar Month Grid
The month view renders a scrollable room-vs-date matrix. Each cell shows color-coded event chips (up to 4, with a "+N more" overflow popover). Hovering a future cell shows a "Book" shortcut. Clicking navigates to the day view for that room and date. The header date strip stays in sync with the body scroll via a JS scroll-sync mechanism.

### Role-Based UI
The sidebar, page access, and individual UI elements (add buttons, edit icons, settings sections) are all gated by the user's role. The `usePermissions()` hook provides a clean capability object so components never hard-code role strings.

### Token Refresh
The Axios response interceptor handles expired access tokens transparently. The user never sees a logout unless the refresh token itself is expired or missing.

### Announcement Badges
The sidebar Announcements item shows a live unread count badge, fetched by `useAnnouncementCardViewModel` and shared via Redux.
