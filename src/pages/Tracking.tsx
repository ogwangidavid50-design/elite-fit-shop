import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Package, MapPin, Calendar, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Tracking() {
  const { orders } = useApp();
  const [searchId, setSearchId] = useState('');
  const [foundOrder, setFoundOrder] = useState<any>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const order = orders.find(o => o.id.toLowerCase() === searchId.toLowerCase().trim());
    setFoundOrder(order || null);
    setHasSearched(true);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'delivered': return 'bg-green-500';
      case 'shipped': return 'bg-blue-500';
      case 'processing': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Track Your Fit</h1>
        <p className="text-muted-foreground">Enter your Order ID to see your delivery progress.</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 mb-12">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            className="pl-10 h-14 text-lg" 
            placeholder="Order ID (e.g., DEF-1234)" 
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>
        <Button type="submit" className="h-14 px-8 text-lg">Track</Button>
      </form>

      {foundOrder ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="overflow-hidden border-2 border-primary/20">
            <CardHeader className="bg-muted/50 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Order ID</p>
                  <CardTitle className="text-2xl font-mono">{foundOrder.id}</CardTitle>
                </div>
                <Badge className={`${getStatusColor(foundOrder.status)} text-white px-4 py-1 text-sm uppercase`}>
                  {foundOrder.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <div className="flex gap-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Product Details</h3>
                  <div className="mt-2 space-y-1">
                    {foundOrder.items.map((item: any) => (
                      <p key={item.id} className="text-sm text-muted-foreground">
                        {item.name} x{item.quantity}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Collection Point</h3>
                  <p className="text-sm text-muted-foreground mt-1">Kabarak University Shop / Main Gate</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Timeline</h3>
                  <p className="text-sm text-muted-foreground mt-1">Ordered on: {new Date(foundOrder.date).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="pt-8 border-t flex justify-between items-center">
                <span className="text-muted-foreground font-medium">Total Paid:</span>
                <span className="text-2xl font-bold text-primary">Ksh. {foundOrder.total}</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : hasSearched && (
        <div className="text-center p-20 bg-muted/30 rounded-3xl border-2 border-dashed">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-bold">No Order Found</h3>
          <p className="text-muted-foreground mt-2">We couldn't find an order with that ID. Please check and try again.</p>
        </div>
      )}

      <div className="mt-12 text-center text-sm text-muted-foreground">
        <p>Issues with tracking? Contact David at <strong>+254114257145</strong></p>
      </div>
    </div>
  );
}