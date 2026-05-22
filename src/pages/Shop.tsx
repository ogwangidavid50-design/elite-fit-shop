import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ExternalLink } from 'lucide-react';

export default function Shop() {
  const { products, addToCart } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('category') || 'All';

  const filteredProducts = useMemo(() => {
    if (activeTab === 'All') return products;
    if (activeTab === 'Unisex') return products.filter(p => p.category === 'Unisex');
    return products.filter(p => p.category === activeTab || p.category === 'Unisex');
  }, [products, activeTab]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Elite Catalog</h1>
          <p className="text-muted-foreground mt-2">Find your perfect fit at Kabarak University.</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={(val) => setSearchParams({ category: val })}>
          <TabsList className="h-12 p-1">
            <TabsTrigger value="All" className="px-6">All</TabsTrigger>
            <TabsTrigger value="Men" className="px-6">Men</TabsTrigger>
            <TabsTrigger value="Ladies" className="px-6">Ladies</TabsTrigger>
            <TabsTrigger value="Unisex" className="px-6">Unisex</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full flex flex-col overflow-hidden group">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.status === 'sold' && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <Badge variant="destructive" className="text-lg px-4 py-1">SOLD OUT</Badge>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="backdrop-blur-md bg-white/20 text-white border-white/30">
                      {product.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl line-clamp-1">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 border-t pt-4 bg-muted/30">
                  <div className="w-full flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">Ksh. {product.price}</span>
                  </div>
                  <Button 
                    className="w-full h-11" 
                    onClick={() => addToCart(product)}
                    disabled={product.status === 'sold'}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-20 p-8 rounded-3xl bg-primary/5 border border-primary/10 text-center">
        <h3 className="text-2xl font-bold mb-4">Need a Custom Fit or more info?</h3>
        <p className="text-muted-foreground mb-6">Connect with us directly on WhatsApp for personalized service.</p>
        <a 
          href="https://wa.me/254114257145" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="lg" className="h-12 px-8">
            Chat on WhatsApp <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </a>
      </div>
    </div>
  );
}