import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
// auth
import { AuthGuard } from 'src/auth/guard';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
// components
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/one'));
const ManageVisitor = lazy(() => import('src/pages/dashboard/manageVisitor'));
const Security = lazy(() => import('src/pages/dashboard/security'));
const Reports = lazy(() => import('src/pages/dashboard/reports'));
const DashboardSecurity = lazy(() => import('src/pages/dashboard/dashboardSecurity'));
const DashboardEmployee=lazy(() => import('src/pages/dashboard/dashboardEmployee'));
const EmployeeManageVisitor=lazy(() => import('src/pages/dashboard/employeeManageVisitor'));
// ----------------------------------------------------------------------

// const userSession = JSON.parse(sessionStorage.getItem('user'));;
// const dashboardRoutes=[];
// console.log('dashboard',userSession);
// if( userSession.role==='admin')
// {
//   dashboardRoutes.push(
//     {
//       path: 'dashboard',
//       element: (
//         <AuthGuard>
//           <DashboardLayout>
//             <Suspense fallback={<LoadingScreen />}>
//               <Outlet />
//             </Suspense>
//           </DashboardLayout>
//         </AuthGuard>
//       ),
//       children: [
//         { element: <IndexPage />, index: true },
//         { path: 'manageVisitor', element: <ManageVisitor /> },
//         { path: 'security', element: <Security /> },
//         { path: 'reports', element: <Reports /> },
//       ],
//     },
//   );
// } else if (userSession.role==='employee') {
//   dashboardRoutes.push(
//     {
//       path: 'dashboard',
//       element: (
//         <AuthGuard>
//           <DashboardLayout>
//             <Suspense fallback={<LoadingScreen />}>
//               <Outlet />
//             </Suspense>
//           </DashboardLayout>
//         </AuthGuard>
//       ),
//       children: [
//         { element: <IndexPage />, index: true },
//         { path: 'dashboardEmployee', element: <DashboardEmployee /> },
//         { path: 'employeeManageVisitor', element: <EmployeeManageVisitor /> },
//       ],
//     },
//   );
// } else {
//   dashboardRoutes.push(
//     {
//       path: 'dashboard',
//       element: (
//         <AuthGuard>
//           <DashboardLayout>
//             <Suspense fallback={<LoadingScreen />}>
//               <Outlet />
//             </Suspense>
//           </DashboardLayout>
//         </AuthGuard>
//       ),
//       children: [
//         { element: <IndexPage />, index: true },
       
//         { path: 'dashboardSecurity', element: <DashboardSecurity /> },
       
//       ],
//     },
//   );
// }
// export { dashboardRoutes };
export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <IndexPage />, index: true },
      { path: 'manageVisitor', element: <ManageVisitor /> },
      { path: 'security', element: <Security /> },
      { path: 'reports', element: <Reports /> },
      { path: 'dashboardSecurity', element: <DashboardSecurity /> },
      { path: 'dashboardEmployee', element: <DashboardEmployee /> },
      { path: 'employeeManageVisitor', element: <EmployeeManageVisitor /> },
    ],
  },
];
