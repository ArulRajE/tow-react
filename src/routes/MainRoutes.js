import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

//render - driver page
const DriverPage = Loadable(lazy(() => import('pages/driver')));

//render - dispatcher page
const DispatchPage = Loadable(lazy(() => import('pages/dispatcher')));

//render - Rejected page
const RejectedJobPage = Loadable(lazy(() => import('pages/rejected-job')));

//table example Table page
const TablePage = Loadable(lazy(() => import('pages/table')));

//table example Table page
const AiPage = Loadable(lazy(() => import('pages/ai')));

//Call management Page
const CallPage = Loadable(lazy(() => import('pages/call')));

//User management Page
const UserPage = Loadable(lazy(() => import('pages/user-management')));
// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'user',
      element: <UserPage />
    },
    {
      path: 'call',
      element: <CallPage />
    },
    {
      path: 'table',
      element: <TablePage />
    },
    {
      path: 'dispatcher',
      element: <DispatchPage />
    },
    {
      path: 'driver',
      element: <DriverPage />
    },
    {
      path: 'rejected-job',
      element: <RejectedJobPage />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'ai',
      element: <AiPage />
    },

    //
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'icons/ant',
      element: <AntIcons />
    }
  ]
};

export default MainRoutes;
