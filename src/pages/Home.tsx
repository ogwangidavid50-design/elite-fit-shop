import { motion } from 'framer-motion';
import { ArrowRight, Star, ShieldCheck, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col gap-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Luxury Fashion"
        />
        <div className="container relative z-20 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
          >
            Elite Style for the <br /> <span className="text-primary italic">Modern Leader</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Discover premium trousers, shirts, and trench coats crafted for excellence.
            Kabarak's finest apparel destination.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/shop">
              <Button size="lg" className="h-14 px-8 text-lg">
                Shop Collection <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/tracking">
              <Button size="lg" variant="secondary" className="h-14 px-8 text-lg">
                Track My Order
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Star, title: "Premium Quality", desc: "Only the finest fabrics for our elite clientele." },
            { icon: ShieldCheck, title: "Easy Payment", desc: "Secure Pochi la Biashara payment options." },
            { icon: Truck, title: "Order Tracking", desc: "Real-time updates on your product delivery." }
          ].map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center p-8 rounded-2xl bg-card border shadow-sm">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 pb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Browse Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Link to="/shop?category=Men" className="group relative overflow-hidden rounded-3xl aspect-[16/9]">
            <img 
              src="https://images.unsplash.com/photo-1594932224828-b4b059b6f68e?q=80&w=2080&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              alt="Men's Fashion"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <h3 className="text-4xl font-bold text-white italic">Men's Sector</h3>
            </div>
          </Link>
          <Link to="/shop?category=Ladies" className="group relative overflow-hidden rounded-3xl aspect-[16/9]">
            <img 
              src="https://images.unsplash.com/photo-1539109132314-3477524c859c?q=80&w=1974&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              alt="Ladies' Fashion"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <h3 className="text-4xl font-bold text-white italic">Ladies' Sector</h3>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}