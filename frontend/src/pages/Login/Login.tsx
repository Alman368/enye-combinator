/**
 * Login Page
 *
 * User authentication page with real login functionality
 */

import { useState } from 'react';
import { Brain, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import authService from '@/services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(email, password);
      // Redirect to dashboard after successful login
      navigate('/');
    } catch (err: any) {
      console.error('Login error:', err);
      
      // Handle different error types
      if (err.response?.status === 401) {
        setError('Email o contraseña incorrectos');
      } else if (err.response?.status === 400) {
        setError('Usuario inactivo. Contacte al administrador.');
      } else {
        setError('Error al iniciar sesión. Por favor intente de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Quick login buttons for development
  const quickLogin = (userEmail: string, userPassword: string) => {
    setEmail(userEmail);
    setPassword(userPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6">
        <div className="flex flex-col items-center text-center">
          <Brain className="h-12 w-12 text-primary mb-4" />
          <h1 className="text-3xl font-bold">MindHealth Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Inicia sesión para acceder al dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-lg border bg-card p-6">
          <div className="space-y-4">
            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-lg flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@mindhealth.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </Button>
          </div>
        </form>

        {/* Quick login buttons for development */}
        <div className="space-y-3">
          <p className="text-center text-sm text-muted-foreground">
            Acceso rápido (desarrollo):
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => quickLogin('admin@mindhealth.com', 'admin123')}
              type="button"
            >
              Admin
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => quickLogin('researcher@hospital.com', 'researcher123')}
              type="button"
            >
              Researcher
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => quickLogin('viewer@hospital.com', 'viewer123')}
              type="button"
            >
              Viewer
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => quickLogin('test@hospital.com', 'test123')}
              type="button"
            >
              Test (Inactivo)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;