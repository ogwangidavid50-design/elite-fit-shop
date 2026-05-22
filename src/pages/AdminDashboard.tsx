import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Package, ShoppingBag, LayoutDashboard, LogOut } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { updateOrderStatus } from '@/lib/store';
import { OrderStatus, Category, ProductStatus } from '@/types';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { products, orders, updateProduct, addProduct, refreshData } = useApp();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (!auth) {
      navigate('/admin/login');
    } else {
      setIsAuth(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    navigate('/admin/login');
  };

  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    category: 'Men' as Category,
    status: 'available' as ProductStatus,
    image: '',
    description: ''
  });

  const handleSaveProduct = () => {
    if (editingProduct) {
      updateProduct(editingProduct);
      setEditingProduct(null);
    } else {
      addProduct({
        ...newProduct,
        id: Math.random().toString(36).substr(2, 9)
      });
      setNewProduct({ name: '', price: 0, category: 'Men', status: 'available', image: '', description: '' });
    }
  };

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status);
    refreshData();
  };

  if (!isAuth) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Elite Dashboard</h1>
          <p className="text-muted-foreground">Manage products, orders, and shop status.</p>
        </div>
        <Button variant="ghost" className="text-destructive" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>

      <Tabs defaultValue="products" className="space-y-8">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="products"><Package className="mr-2 h-4 w-4" /> Products</TabsTrigger>
          <TabsTrigger value="orders"><ShoppingBag className="mr-2 h-4 w-4" /> Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="products" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Catalog Management</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button><Plus className="mr-2 h-4 w-4" /> Add Product</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader><DialogTitle>Add New Product</DialogTitle></DialogHeader>
                <div className="grid grid-cols-2 gap-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Name</label>
                    <Input value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Price (Ksh)</label>
                    <Input type="number" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Category</label>
                    <Select value={newProduct.category} onValueChange={(val: any) => setNewProduct({...newProduct, category: val})}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Men">Men</SelectItem>
                        <SelectItem value="Ladies">Ladies</SelectItem>
                        <SelectItem value="Unisex">Unisex</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Status</label>
                    <Select value={newProduct.status} onValueChange={(val: any) => setNewProduct({...newProduct, status: val})}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="sold">Sold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-bold">Image URL</label>
                    <Input value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} placeholder="Paste image URL here" />
                    <p className="text-[10px] text-muted-foreground">Admin can use device gallery by hosting images online or using local paths in a real scenario.</p>
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-sm font-bold">Description</label>
                    <Input value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                  </div>
                </div>
                <Button onClick={handleSaveProduct} className="w-full">Save Product</Button>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(p => (
              <Card key={p.id}>
                <div className="aspect-[4/3] relative">
                  <img src={p.image} className="w-full h-full object-cover rounded-t-xl" alt={p.name} />
                  <Badge className="absolute top-2 right-2" variant={p.status === 'sold' ? 'destructive' : 'default'}>
                    {p.status}
                  </Badge>
                </div>
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold line-clamp-1">{p.name}</h3>
                    <span className="text-primary font-bold">Ksh.{p.price}</span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full" onClick={() => setEditingProduct(p)}>
                        <Edit className="mr-2 h-4 w-4" /> Edit Details
                      </Button>
                    </DialogTrigger>
                    {editingProduct && (
                      <DialogContent className="max-w-2xl">
                        <DialogHeader><DialogTitle>Edit: {editingProduct.name}</DialogTitle></DialogHeader>
                        <div className="grid grid-cols-2 gap-4 py-4">
                          <div className="space-y-2">
                            <label className="text-sm font-bold">Name</label>
                            <Input value={editingProduct.name} onChange={e => setEditingProduct({...editingProduct, name: e.target.value})} />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-bold">Price</label>
                            <Input type="number" value={editingProduct.price} onChange={e => setEditingProduct({...editingProduct, price: Number(e.target.value)})} />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-bold">Status</label>
                            <Select value={editingProduct.status} onValueChange={(val: any) => setEditingProduct({...editingProduct, status: val})}>
                              <SelectTrigger><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="available">Available</SelectItem>
                                <SelectItem value="sold">Sold</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <Button onClick={handleSaveProduct} className="w-full">Update Product</Button>
                      </DialogContent>
                    )}
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader><CardTitle>Customer Orders</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map(o => (
                    <TableRow key={o.id}>
                      <TableCell className="font-mono font-bold">{o.id}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold">{o.customerName}</span>
                          <span className="text-xs text-muted-foreground">{o.customerPhone}</span>
                        </div>
                      </TableCell>
                      <TableCell>Ksh. {o.total}</TableCell>
                      <TableCell>
                        <Badge variant={o.status === 'delivered' ? 'default' : 'secondary'}>{o.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Select value={o.status} onValueChange={(val: any) => handleStatusChange(o.id, val)}>
                          <SelectTrigger className="w-[130px]"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}