/**
 * Login Page
 *
 * User authentication page (placeholder for later implementation)
 */

import { Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6">
        <div className="flex flex-col items-center text-center">
          <Brain className="h-12 w-12 text-primary mb-4" />
          <h1 className="text-3xl font-bold">Mental Health Data Visualizer</h1>
          <p className="text-muted-foreground mt-2">
            Sign in to access the dashboard
          </p>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="researcher@hospital.com"
                className="w-full mt-1 px-3 py-2 rounded-lg border bg-background"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full mt-1 px-3 py-2 rounded-lg border bg-background"
              />
            </div>
            <Button className="w-full" asChild>
              <Link to="/">Sign In</Link>
            </Button>
          </div>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>Login functionality will be implemented later</p>
          <p className="mt-2">For now, click "Sign In" to access the dashboard</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

