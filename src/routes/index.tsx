import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ProtectedRoute from './protected-route';
import Main from '@/pages';
import Register from '@/pages/auth/register';
import Login from '@/pages/auth/login';
import Scheduling from '@/pages/user/scheduling';
import SchedulingSuccess from '@/pages/user/scheduling/success';
import PatientSchedule from '@/pages/user/scheduling/patient-schedule';
import Questionnaire from '@/pages/user/questionnaire';
import QuestionnaireForm from '@/pages/user/questionnaire/form';
import QuestionnaireSent from '@/pages/user/questionnaire/sent';
import QuestionnaireStart from '@/pages/user/questionnaire/start';
import QuestionnaireFinish from '@/pages/user/questionnaire/finish';
import Dashboard from '@/pages/dashboard';
import DashboardLogin from '@/pages/dashboard/login';
import DashboardUsers from '@/pages/dashboard/users';
import DashboardPatients from '@/pages/dashboard/patients';
import DashboardSchedules from '@/pages/dashboard/schedules';
import DashboardBooks from '@/pages/dashboard/books';
import DashboardQuestionnaires from '@/pages/dashboard/questionnaires';
import DashboardAttempt from '@/pages/dashboard/detail-attempt';
import Setting from '@/pages/dashboard/settings';
import Unauthorized from '@/pages/404';

const App = () => {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: <Main />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/scheduling',
          element: <Scheduling />,
        },
        {
          path: '/scheduling/success',
          element: <SchedulingSuccess />,
        },
        {
          path: '/scheduling/my-list',
          element: <PatientSchedule />,
        },
        {
          path: '/questionnaire',
          element: <Questionnaire />,
        },
        {
          path: '/questionnaire/form',
          element: <QuestionnaireForm />,
        },
        {
          path: '/questionnaire/sent',
          element: <QuestionnaireSent />,
        },
        {
          path: '/questionnaire/start',
          element: <QuestionnaireStart />,
        },
        {
          path: '/questionnaire/finish',
          element: <QuestionnaireFinish />,
        },
        {
          path: '/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/dashboard/login',
          element: <DashboardLogin />,
        },
        {
          path: '/dashboard/patients',
          element: <DashboardPatients />,
        },
        {
          path: '/dashboard/users',
          element: <DashboardUsers />,
        },
        {
          path: '/dashboard/schedules',
          element: <DashboardSchedules />,
        },
        {
          path: '/dashboard/books',
          element: <DashboardBooks />,
        },
        {
          path: '/dashboard/questionnaires',
          element: <DashboardQuestionnaires />,
        },
        {
          path: '/dashboard/questionnaires/:attempt_id',
          element: <DashboardAttempt />,
        },
        {
          path: '/dashboard/settings',
          element: <Setting />,
        },
        {
          path: '*',
          element: <Unauthorized />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
