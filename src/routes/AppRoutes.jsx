import { Suspense, lazy } from "react";
import { HashRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";

// Auth
const Login = lazy(() => import("../features/auth/Login"));
const SchoolSetup = lazy(() => import("../pages/SchoolSetup"));

// Lazy load pagest
const SchoolSelector = lazy(() => import("../pages/SchoolSelector"));
const AdminDashboard = lazy(() => import("../components/layout/AdminDashboard"));
const School = lazy(() => import("../pages/School"));
const Teachers = lazy(() => import("../pages/Teachers"));
const AddSchools = lazy(() => import("../pages/AddSchools"));

// Enrollment
const EnrollmentDashboard = lazy(() => import("../pages/enrollment/EnrollmentDashboard"));
const NewInquiry = lazy(() => import("../pages/enrollment/NewInquiry"));
const ApplicationForm = lazy(() => import("../pages/enrollment/ApplicationForm"));
const ApplicationReview = lazy(() => import("../pages/enrollment/ApplicationReview"));

// Students
const StudentList = lazy(() => import("../pages/students/StudentList"));
const AddStudent = lazy(() => import("../pages/students/AddStudent"));
const EditStudent = lazy(() => import("../pages/students/EditStudent"));
const StudentProfile = lazy(() => import("../pages/students/StudentProfile"));
const StudentAttendance = lazy(() => import("../pages/students/Attendance"));

// Classes
const ClassList = lazy(() => import("../pages/classes/ClassList"));
const AddClass = lazy(() => import("../pages/classes/AddClass"));
const EditClass = lazy(() => import("../pages/classes/EditClass"));
const ClassProfile = lazy(() => import("../pages/classes/ClassProfile"));

// Staff
const StaffList = lazy(() => import("../pages/staff/StaffList"));
const AddStaff = lazy(() => import("../pages/staff/AddStaff"));
const StaffProfile = lazy(() => import("../pages/staff/StaffProfile"));

// Animated loading spinner
const Loading = () => (
  <div className="flex flex-col justify-center items-center h-screen bg-[#f0f4ff]">
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-4 border-blue-100" />
      <div
        className="absolute inset-0 w-12 h-12 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-400"
        style={{ animation: "spinGlow 1s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}
      />
    </div>
    <div className="flex gap-1.5 mt-5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-blue-500"
          style={{ animation: `dotPulse 1.4s ease-in-out ${i * 0.16}s infinite` }}
        />
      ))}
    </div>
    <p className="mt-3 text-sm font-medium text-slate-400 animate-pulse">Loading...</p>
  </div>
);

// Page transition wrapper — animates on route change
const PageTransition = ({ children }) => {
  const location = useLocation();
  return (
    <div key={location.pathname} className="animate-page">
      {children}
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      {/* Auth Routes */}
      <Route path="/login" element={
        <PageTransition><Login /></PageTransition>
      } />
      <Route path="/setup" element={
        <ProtectedRoute>
          <PageTransition><SchoolSetup /></PageTransition>
        </ProtectedRoute>
      } />

      {/* School Selector — shown after login */}
      <Route path="/select-school" element={
        <ProtectedRoute>
          <PageTransition><SchoolSelector /></PageTransition>
        </ProtectedRoute>
      } />

      {/* Dashboard Routes */}
      <Route path="/" element={
        <ProtectedRoute><AdminLayout /></ProtectedRoute>
      }>
        <Route index element={<Navigate to="/select-school" replace />} />
        <Route path="dashboard" element={<PageTransition><AdminDashboard /></PageTransition>} />
        <Route path="school" element={<PageTransition><School /></PageTransition>} />
        <Route path="add-school" element={<PageTransition><AddSchools /></PageTransition>} />
        <Route path="teachers" element={<PageTransition><Teachers /></PageTransition>} />

        {/* Enrollment */}
        <Route path="enrollment" element={<PageTransition><EnrollmentDashboard /></PageTransition>} />
        <Route path="enrollment/new-inquiry" element={<PageTransition><NewInquiry /></PageTransition>} />
        <Route path="enrollment/apply" element={<PageTransition><ApplicationForm /></PageTransition>} />
        <Route path="enrollment/apply/:inquiryId" element={<PageTransition><ApplicationForm /></PageTransition>} />
        <Route path="enrollment/review/:applicationId" element={<PageTransition><ApplicationReview /></PageTransition>} />

        {/* Students */}
        <Route path="students" element={<PageTransition><StudentList /></PageTransition>} />
        <Route path="students/add" element={<PageTransition><AddStudent /></PageTransition>} />
        <Route path="students/edit/:studentId" element={<PageTransition><EditStudent /></PageTransition>} />
        <Route path="students/attendance" element={<PageTransition><StudentAttendance /></PageTransition>} />
        <Route path="students/:studentId" element={<PageTransition><StudentProfile /></PageTransition>} />

        {/* Classes */}
        <Route path="classes" element={<PageTransition><ClassList /></PageTransition>} />
        <Route path="classes/add" element={<PageTransition><AddClass /></PageTransition>} />
        <Route path="classes/edit/:classId" element={<PageTransition><EditClass /></PageTransition>} />
        <Route path="classes/:classId" element={<PageTransition><ClassProfile /></PageTransition>} />

        {/* Staff */}
        <Route path="staff" element={<PageTransition><StaffList /></PageTransition>} />
        <Route path="staff/add" element={<PageTransition><AddStaff /></PageTransition>} />
        <Route path="staff/:staffId" element={<PageTransition><StaffProfile /></PageTransition>} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

const AppRoutes = () => {
  return (
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <AnimatedRoutes />
      </Suspense>
    </HashRouter>
  );
};

export default AppRoutes;