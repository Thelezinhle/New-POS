const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ========== USER ACCOUNTS ==========
let users = [
  // Admin/Manager accounts
  { id: 1, username: 'admin', password: 'admin123', role: 'admin', name: 'Store Manager', email: 'manager@store.com' },
  { id: 2, username: 'staff1', password: 'staff123', role: 'admin', name: 'Staff Member', email: 'staff@store.com' },
  // Customer accounts
  { id: 3, username: 'sarah.j', password: 'cust123', role: 'customer', name: 'Sarah Johnson', email: 'sarah.johnson@gmail.com', customerId: 1 },
  { id: 4, username: 'mchen', password: 'cust123', role: 'customer', name: 'Michael Chen', email: 'mchen88@yahoo.com', customerId: 2 },
  { id: 5, username: 'emily.r', password: 'cust123', role: 'customer', name: 'Emily Rodriguez', email: 'emily.r@outlook.com', customerId: 3 },
];

// ========== PRODUCT DATA (Prices in Rands) ==========
let products = [
  { id: 1, name: 'Coca-Cola 500ml', price: 24.99, category: 'Beverages', stock: 150, barcode: '5449000000996' },
  { id: 2, name: 'Pepsi 500ml', price: 24.99, category: 'Beverages', stock: 120, barcode: '4060800001015' },
  { id: 3, name: 'Spring Water 1L', price: 12.99, category: 'Beverages', stock: 200, barcode: '5000112558310' },
  { id: 4, name: 'Orange Juice 1L', price: 39.99, category: 'Beverages', stock: 45, barcode: '5000112558327' },
  { id: 5, name: 'Coffee Latte', price: 45.00, category: 'Beverages', stock: 80, barcode: '8001120001234' },
  { id: 6, name: 'Energy Drink', price: 29.99, category: 'Beverages', stock: 60, barcode: '9002490100070' },
  { id: 7, name: 'Lays Chips Original', price: 34.99, category: 'Snacks', stock: 85, barcode: '0028400028400' },
  { id: 8, name: 'Doritos Nacho', price: 39.99, category: 'Snacks', stock: 70, barcode: '0028400028401' },
  { id: 9, name: 'Peanuts Salted', price: 29.99, category: 'Snacks', stock: 50, barcode: '6001234567890' },
  { id: 10, name: 'Chocolate Bar', price: 19.99, category: 'Snacks', stock: 100, barcode: '7622210100009' },
  { id: 11, name: 'Gummy Bears', price: 24.99, category: 'Snacks', stock: 65, barcode: '4000539011009' },
  { id: 12, name: 'Fresh Croissant', price: 29.99, category: 'Bakery', stock: 30, barcode: 'BAK001' },
  { id: 13, name: 'Muffin Blueberry', price: 34.99, category: 'Bakery', stock: 25, barcode: 'BAK002' },
  { id: 14, name: 'Baguette', price: 24.99, category: 'Bakery', stock: 20, barcode: 'BAK003' },
  { id: 15, name: 'Whole Milk 1L', price: 22.99, category: 'Dairy', stock: 60, barcode: 'DAI001' },
  { id: 16, name: 'Greek Yogurt', price: 34.99, category: 'Dairy', stock: 40, barcode: 'DAI002' },
  { id: 17, name: 'Cheddar Cheese 200g', price: 54.99, category: 'Dairy', stock: 35, barcode: 'DAI003' },
  { id: 18, name: 'Butter 250g', price: 44.99, category: 'Dairy', stock: 45, barcode: 'DAI004' },
  { id: 19, name: 'Fresh Salad', price: 49.99, category: 'Fresh Food', stock: 25, barcode: 'FRE001' },
  { id: 20, name: 'Sandwich Ham & Cheese', price: 59.99, category: 'Fresh Food', stock: 20, barcode: 'FRE002' },
  { id: 21, name: 'Fruit Cup', price: 39.99, category: 'Fresh Food', stock: 15, barcode: 'FRE003' },
  { id: 22, name: 'Sushi Box', price: 89.99, category: 'Fresh Food', stock: 10, barcode: 'FRE004' },
  { id: 23, name: 'Paper Towels', price: 34.99, category: 'Household', stock: 40, barcode: 'HOU001' },
  { id: 24, name: 'Hand Soap', price: 29.99, category: 'Household', stock: 55, barcode: 'HOU002' },
];

// ========== CUSTOMER DATA ==========
let customers = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah.johnson@gmail.com', phone: '082-555-1234', address: '123 Main St, Johannesburg', loyaltyPoints: 450, memberSince: '2024-01-15' },
  { id: 2, name: 'Michael Chen', email: 'mchen88@yahoo.com', phone: '083-555-5678', address: '456 Oak Ave, Cape Town', loyaltyPoints: 280, memberSince: '2024-02-20' },
  { id: 3, name: 'Emily Rodriguez', email: 'emily.r@outlook.com', phone: '084-555-9012', address: '789 Pine Rd, Durban', loyaltyPoints: 650, memberSince: '2023-11-10' },
];

// ========== SALES DATA ==========
let sales = [];
let receiptCounter = 1000;

// ========== AUTH ENDPOINTS ==========
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    const userData = { ...user };
    delete userData.password;
    if (user.role === 'customer' && user.customerId) {
      userData.customerData = customers.find(c => c.id === user.customerId);
    }
    res.json({ success: true, user: userData });
  } else {
    res.json({ success: false, error: 'Invalid username or password' });
  }
});

app.post('/api/register', (req, res) => {
  const { name, email, username, password, phone } = req.body;
  
  if (users.find(u => u.username === username)) {
    return res.json({ success: false, error: 'Username already exists' });
  }
  
  const newCustomerId = customers.length + 1;
  const newCustomer = {
    id: newCustomerId,
    name,
    email,
    phone: phone || '',
    address: '',
    loyaltyPoints: 0,
    memberSince: new Date().toISOString().split('T')[0]
  };
  customers.push(newCustomer);
  
  const newUser = {
    id: users.length + 1,
    username,
    password,
    role: 'customer',
    name,
    email,
    customerId: newCustomerId
  };
  users.push(newUser);
  
  const userData = { ...newUser, customerData: newCustomer };
  delete userData.password;
  res.json({ success: true, user: userData });
});

// ========== PRODUCT ENDPOINTS ==========
app.get('/api/products', (req, res) => res.json(products));

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  res.json(product || { error: 'Product not found' });
});

app.get('/api/products/barcode/:barcode', (req, res) => {
  const product = products.find(p => p.barcode === req.params.barcode);
  res.json(product || { error: 'Product not found' });
});

app.post('/api/products', (req, res) => {
  const product = { id: products.length + 1, ...req.body };
  products.push(product);
  res.json(product);
});

// Update product stock
app.put('/api/products/:id/stock', (req, res) => {
  const { quantity } = req.body;
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    product.stock += parseInt(quantity);
    if (product.stock < 0) product.stock = 0;
    res.json({ success: true, product });
  } else {
    res.json({ success: false, error: 'Product not found' });
  }
});

// ========== CUSTOMER ENDPOINTS ==========
app.get('/api/customers', (req, res) => res.json(customers));

app.get('/api/customers/:id', (req, res) => {
  const customer = customers.find(c => c.id === parseInt(req.params.id));
  res.json(customer || { error: 'Customer not found' });
});

app.put('/api/customers/:id', (req, res) => {
  const index = customers.findIndex(c => c.id === parseInt(req.params.id));
  if (index !== -1) {
    customers[index] = { ...customers[index], ...req.body };
    res.json(customers[index]);
  } else {
    res.json({ error: 'Customer not found' });
  }
});

// ========== SALES ENDPOINTS ==========
app.get('/api/sales', (req, res) => {
  const { customerId } = req.query;
  if (customerId) {
    res.json(sales.filter(s => s.customerId === parseInt(customerId)));
  } else {
    res.json(sales);
  }
});

app.post('/api/sales', (req, res) => {
  const { items, customerId, paymentMethod, amountTendered, isKiosk } = req.body;
  
  let subtotal = 0;
  const saleItems = items.map(item => {
    const product = products.find(p => p.id === item.productId);
    if (product) {
      product.stock -= item.quantity;
      const itemSubtotal = product.price * item.quantity;
      subtotal += itemSubtotal;
      return {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        subtotal: itemSubtotal
      };
    }
    return null;
  }).filter(Boolean);

  const tax = subtotal * 0.15; // 15% VAT
  const total = subtotal + tax;
  const change = (amountTendered || total) - total;

  const customer = customers.find(c => c.id === customerId);
  if (customer) {
    customer.loyaltyPoints += Math.floor(total / 10);
  }

  const sale = {
    id: sales.length + 1,
    receiptNumber: `RCP-${++receiptCounter}`,
    items: saleItems,
    subtotal,
    tax,
    total,
    paymentMethod: paymentMethod || 'card',
    amountTendered: amountTendered || total,
    change: change > 0 ? change : 0,
    customerId: customerId || null,
    customerName: customer ? customer.name : 'Guest',
    isKiosk: isKiosk || false,
    timestamp: new Date().toISOString()
  };

  sales.push(sale);
  res.json(sale);
});

// ========== STATS ENDPOINTS ==========
app.get('/api/stats', (req, res) => {
  const today = new Date().toDateString();
  const todaySales = sales.filter(s => new Date(s.timestamp).toDateString() === today);
  
  res.json({
    todaySales: todaySales.reduce((sum, s) => sum + s.total, 0).toFixed(2),
    todayTransactions: todaySales.length,
    totalProducts: products.length,
    lowStockItems: products.filter(p => p.stock < 20).length,
    totalCustomers: customers.length
  });
});

app.get('/api/stats/customer/:customerId', (req, res) => {
  const customerId = parseInt(req.params.customerId);
  const customer = customers.find(c => c.id === customerId);
  const customerSales = sales.filter(s => s.customerId === customerId);
  
  res.json({
    totalOrders: customerSales.length,
    totalSpent: customerSales.reduce((sum, s) => sum + s.total, 0).toFixed(2),
    loyaltyPoints: customer ? customer.loyaltyPoints : 0
  });
});

// Sales trend data for graph (last 7 days)
app.get('/api/stats/trend', (req, res) => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toDateString();
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const daySales = sales.filter(s => new Date(s.timestamp).toDateString() === dateStr);
    const revenue = daySales.reduce((sum, s) => sum + s.total, 0);
    days.push({
      day: dayName,
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      revenue: revenue,
      transactions: daySales.length
    });
  }
  
  const totalRevenue = sales.reduce((sum, s) => sum + s.total, 0);
  const avgDaily = totalRevenue / 7;
  const todayRevenue = days[6].revenue;
  const yesterdayRevenue = days[5].revenue;
  const trend = yesterdayRevenue > 0 ? ((todayRevenue - yesterdayRevenue) / yesterdayRevenue * 100).toFixed(1) : 0;
  
  res.json({
    days,
    summary: {
      totalRevenue: totalRevenue.toFixed(2),
      avgDaily: avgDaily.toFixed(2),
      trendPercent: trend,
      isPositive: todayRevenue >= yesterdayRevenue
    }
  });
});

// ========== START SERVER ==========
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
========================================
     QUICKMART POS - RUNNING
========================================
   URL: http://localhost:${PORT}
   Currency: South African Rand (R)
   VAT: 15%
----------------------------------------
   ADMIN: admin / admin123
   CUSTOMER: sarah.j / cust123
   Or use GUEST mode
========================================
  `);
});
