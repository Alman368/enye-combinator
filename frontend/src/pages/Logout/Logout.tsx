/**
 * Logout Page
 * 
 * Automáticamente hace logout y redirige al login
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import authService from '@/services/authService';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Call backend logout endpoint
        await authService.logout();
      } catch (error) {
        console.error('Logout error:', error);
        // Continue with logout even if backend call fails
      } finally {
        // Always redirect to login
        navigate('/login', { replace: true });
      }
    };

    performLogout();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
        <p className="text-muted-foreground">Cerrando sesión...</p>
      </div>
    </div>
  );
};

export default Logout;
