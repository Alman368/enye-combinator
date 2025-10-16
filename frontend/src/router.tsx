/**
 * Application Router
 *
 * Defines all application routes using React Router v6
 * MindHealth Analytics routes with protected routes
 */

import { createBrowserRouter } from 'react-router-dom';
import {
  Dashboard,
  DatosRegistros,
  AnalisisAvanzado,
  AnalisisCostes,
  Configuracion,
  Login,
  Logout
} from './pages';
import { MainLayout } from './components';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/logout',
    element: <Logout />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'datos',
        element: <DatosRegistros />,
      },
      {
        path: 'analisis',
        element: <AnalisisAvanzado />,
      },
      {
        path: 'costes',
        element: <AnalisisCostes />,
      },
      {
        path: 'configuracion',
        element: <Configuracion />,
      },
    ],
  },
]);

export default router;

