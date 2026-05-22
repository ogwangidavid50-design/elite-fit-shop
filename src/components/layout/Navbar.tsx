import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from '@/components/ui/badge';

const LOGO_URL = 'https://storage.googleapis.com/dala-prod-public-storage/attachments/f621980b-50c6-4ea3-a798-8b5f79fb7223/1779424812676_file_000000001bd071f48d3afc9cd1534db6.png';

export const Navbar = () => {
  const { cart } = useApp();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const NavLinks = () => (
    <>
      <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
      <Link to="/shop" className="text-sm font-medium hover:text-primary transition-colors">Shop</Link>
      <Link to="/tracking" className="text-sm font-medium hover:text-primary transition-colors">Track Order</Link>
      <Link to="/admin/login" className="text-sm font-medium hover:text-primary transition-colors">Admin</Link>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-4 mt-8">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="flex items-center gap-2">
            <img src={LOGO_URL} alt="David's Elite Fit" className="h-10 w-auto rounded-md" />
            <span className="hidden sm:inline-block font-bold text-lg tracking-tight">David's Elite Fit</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <NavLinks />
        </div>

        <div className="flex items-center gap-2">
          <Link to="/checkout">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};