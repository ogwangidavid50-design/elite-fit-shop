import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Tracking from './pages/Tracking';
import Checkout from './pages/Checkout';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { Toaster } from './components/ui/sonner';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuth = localStorage.getItem('admin_auth') === 'true';
  if (!isAuth) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-background text-foreground font-sans selection:bg-primary/20">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/tracking" element={<Tracking />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              
              {/* Protected Admin Route */}
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Catch-all redirect to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-center" expand={true} richColors />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;