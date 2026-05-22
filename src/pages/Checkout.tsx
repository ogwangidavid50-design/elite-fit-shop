import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, CreditCard, MessageCircle, CheckCircle2 } from 'lucide-react';
import { saveOrder } from '@/lib/store';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cart, removeFromCart, clearCart } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    transactionId: ''
  });

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const orderId = `DEF-${Math.floor(1000 + Math.random() * 9000)}`;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.transactionId) {
      toast.error('Please enter the M-Pesa Transaction ID.');
      return;
    }

    const newOrder = {
      id: orderId,
      customerName: formData.name,
      customerPhone: formData.phone,
      items: cart,
      total: subtotal,
      status: 'pending' as const,
      date: new Date().toISOString()
    };

    saveOrder(newOrder);
    setStep(3);
    clearCart();
    toast.success('Order placed successfully!');
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center gap-4">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>1</div>
          <div className="w-12 h-[2px] bg-muted" />
          <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>2</div>
          <div className="w-12 h-[2px] bg-muted" />
          <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>3</div>
        </div>
      </div>

      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">Review Your Order</h2>
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-card border rounded-xl">
                <img src={item.image} className="h-20 w-20 object-cover rounded-lg" alt={item.name} />
                <div className="flex-grow">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                  <p className="font-bold text-primary">Ksh. {item.price * item.quantity}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
          <Card className="h-fit">
            <CardHeader><CardTitle>Summary</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Ksh. {subtotal}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-4">
                <span>Total</span>
                <span className="text-primary">Ksh. {subtotal}</span>
              </div>
              <Button className="w-full h-12" onClick={() => setStep(2)}>Continue to Payment</Button>
            </CardContent>
          </Card>
        </div>
      )}

      {step === 2 && (
        <div className="max-w-2xl mx-auto space-y-8">
          <Card className="border-2 border-primary/20">
            <CardHeader className="bg-primary/5 text-center">
              <CreditCard className="h-10 w-10 text-primary mx-auto mb-2" />
              <CardTitle>Payment Instructions</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="p-6 bg-muted rounded-2xl text-center space-y-2">
                <p className="text-sm uppercase tracking-widest font-bold text-muted-foreground">Pochi la Biashara Number</p>
                <p className="text-4xl font-black text-primary">+254 114 257 145</p>
                <p className="text-sm text-muted-foreground font-medium">David's Elite Fit Apparel</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold">Full Name</label>
                  <Input 
                    placeholder="Enter your name" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">WhatsApp Phone Number</label>
                  <Input 
                    placeholder="e.g. 0712345678" 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">M-Pesa Transaction ID</label>
                  <Input 
                    placeholder="e.g. SAK9283JSK" 
                    className="font-mono uppercase"
                    value={formData.transactionId}
                    onChange={e => setFormData({...formData, transactionId: e.target.value})}
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-4">
                <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Back</Button>
                <Button className="flex-1" onClick={handleSubmitOrder} disabled={!formData.name || !formData.phone || !formData.transactionId}>Complete Purchase</Button>
              </div>
            </CardContent>
          </Card>
          
          <div className="text-center text-muted-foreground text-sm">
            <p>Payment will be verified manually. For faster processing, send a screenshot of the message to:</p>
            <a href="https://wa.me/254114257145" className="text-primary font-bold flex items-center justify-center gap-2 mt-2">
              <MessageCircle className="h-4 w-4" /> +254 114 257 145
            </a>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="text-center py-20 space-y-8 animate-in fade-in zoom-in duration-500">
          <div className="h-24 w-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Order Received!</h2>
            <p className="text-muted-foreground text-lg">Thank you for choosing David's Elite Fit.</p>
            <div className="p-6 bg-muted rounded-2xl max-w-sm mx-auto border-2 border-dashed">
              <p className="text-sm font-bold text-muted-foreground uppercase">Your Tracking ID</p>
              <p className="text-3xl font-mono font-black text-primary">{orderId}</p>
              <p className="text-xs text-muted-foreground mt-2">Save this ID to track your order status.</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button size="lg" onClick={() => navigate('/tracking')}>Track Order Now</Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/shop')}>Continue Shopping</Button>
          </div>
        </div>
      )}
    </div>
  );
}