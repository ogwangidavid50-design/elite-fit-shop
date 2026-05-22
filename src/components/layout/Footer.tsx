import { Phone, Mail, MapPin, Instagram, Facebook } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-muted mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">David's Elite Fit Apparel</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium clothing for the elite. Located at Kabarak University, we provide the best fit for Men and Ladies.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <a 
                href="https://wa.me/254114257145" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                +254 114 257 145 (WhatsApp)
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                ogwangidavid50@gmail.com
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Kabarak University, Kenya
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Payment</h3>
            <p className="text-sm text-muted-foreground mb-2">Pochi la Biashara:</p>
            <p className="font-mono text-primary font-bold">+254 114 257 145</p>
            <div className="mt-4 flex gap-4">
              <Instagram className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-primary" />
              <Facebook className="h-5 w-5 text-muted-foreground cursor-pointer hover:text-primary" />
            </div>
          </div>
        </div>
        
        <div className="border-t mt-12 pt-8 text-center text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} David's Elite Fit Apparel. All rights reserved.</p>
          <p className="mt-1">davidelitefit.com</p>
        </div>
      </div>
    </footer>
  );
};