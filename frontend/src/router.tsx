/**
 * Application Router
 *
 * Defines all application routes using React Router v6
 * MindHealth Analytics routes
 */

import { createBrowserRouter } from 'react-router-dom';
import {
  Dashboard,
  DatosRegistros,
  AnalisisAvanzado,
  AnalisisCostes,
  Configuracion,
  Login
} from './pages';
import { MainLayout } from './components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
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
  {
    path: '/login',
    element: <Login />,
  },
]);

export default router;

