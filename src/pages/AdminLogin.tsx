import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Updated credentials as per user request
    if (email === 'ogwangidavid50@gmail.com' && password === 'Elite@2026') {
      localStorage.setItem('admin_auth', 'true');
      toast.success('Welcome back, David!');
      navigate('/admin');
    } else {
      toast.error('Invalid credentials. Access restricted.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 flex justify-center items-center">
      <Card className="w-full max-w-md shadow-2xl border-primary/10">
        <CardHeader className="text-center space-y-4">
          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">Owner Login</CardTitle>
          <p className="text-sm text-muted-foreground italic">Restricted to David's Elite Fit Admin</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Admin Email</label>
              <Input 
                type="email" 
                placeholder="ogwangidavid50@gmail.com" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Password</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="h-12"
              />
            </div>
            <Button type="submit" className="w-full h-12 mt-4 text-lg font-bold">Log In to Dashboard</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}