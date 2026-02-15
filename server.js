const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ========== REALISTIC PRODUCT DATA ==========
let products = [
  // Beverages
  { id: 1, name: 'Coca-Cola 500ml', price: 2.49, category: 'Beverages', stock: 150, barcode: '5449000000996', image: '🥤' },
  { id: 2, name: 'Pepsi 500ml', price: 2.49, category: 'Beverages', stock: 120, barcode: '4060800001015', image: '🥤' },
  { id: 3, name: 'Spring Water 1L', price: 1.29, category: 'Beverages', stock: 200, barcode: '5000112558310', image: '💧' },
  { id: 4, name: 'Orange Juice 1L', price: 3.99, category: 'Beverages', stock: 45, barcode: '5000112558327', image: '🍊' },
  { id: 5, name: 'Coffee Latte', price: 4.50, category: 'Beverages', stock: 80, barcode: '8001120001234', image: '☕' },
  { id: 6, name: 'Green Tea', price: 2.99, category: 'Beverages', stock: 60, barcode: '8001120001241', image: '🍵' },
  
  // Snacks
  { id: 7, name: 'Lay\'s Classic Chips', price: 3.49, category: 'Snacks', stock: 75, barcode: '0028400055888', image: '🥔' },
  { id: 8, name: 'Doritos Nacho', price: 3.99, category: 'Snacks', stock: 50, barcode: '0028400064576', image: '🌮' },
  { id: 9, name: 'Snickers Bar', price: 1.79, category: 'Snacks', stock: 100, barcode: '5000159407236', image: '🍫' },
  { id: 10, name: 'KitKat 4 Finger', price: 1.49, category: 'Snacks', stock: 90, barcode: '5000159407243', image: '🍫' },
  { id: 11, name: 'Pringles Original', price: 4.29, category: 'Snacks', stock: 40, barcode: '5053990101658', image: '🥔' },
  
  // Bakery
  { id: 12, name: 'Fresh Croissant', price: 2.99, category: 'Bakery', stock: 25, barcode: '2000001000012', image: '🥐' },
  { id: 13, name: 'Blueberry Muffin', price: 3.49, category: 'Bakery', stock: 20, barcode: '2000001000029', image: '🧁' },
  { id: 14, name: 'Whole Wheat Bread', price: 4.99, category: 'Bakery', stock: 30, barcode: '2000001000036', image: '🍞' },
  { id: 15, name: 'Chocolate Donut', price: 1.99, category: 'Bakery', stock: 35, barcode: '2000001000043', image: '🍩' },
  
  // Dairy
  { id: 16, name: 'Whole Milk 1L', price: 2.79, category: 'Dairy', stock: 60, barcode: '3000001000016', image: '🥛' },
  { id: 17, name: 'Greek Yogurt', price: 3.99, category: 'Dairy', stock: 40, barcode: '3000001000023', image: '🥛' },
  { id: 18, name: 'Cheddar Cheese 200g', price: 5.99, category: 'Dairy', stock: 35, barcode: '3000001000030', image: '🧀' },
  { id: 19, name: 'Butter 250g', price: 4.49, category: 'Dairy', stock: 45, barcode: '3000001000047', image: '🧈' },
  
  // Fresh Food
  { id: 20, name: 'Chicken Sandwich', price: 6.99, category: 'Fresh Food', stock: 15, barcode: '4000001000020', image: '🥪' },
  { id: 21, name: 'Caesar Salad', price: 7.99, category: 'Fresh Food', stock: 12, barcode: '4000001000037', image: '🥗' },
  { id: 22, name: 'Veggie Wrap', price: 5.99, category: 'Fresh Food', stock: 18, barcode: '4000001000044', image: '🌯' },
  { id: 23, name: 'Fruit Cup', price: 4.49, category: 'Fresh Food', stock: 20, barcode: '4000001000051', image: '🍓' },
  
  // Household
  { id: 24, name: 'Paper Towels', price: 6.99, category: 'Household', stock: 50, barcode: '5000001000024', image: '🧻' },
  { id: 25, name: 'Hand Soap 500ml', price: 3.99, category: 'Household', stock: 40, barcode: '5000001000031', image: '🧴' },
];

// ========== REALISTIC CUSTOMER DATA ==========
let customers = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah.johnson@gmail.com', phone: '(555) 123-4567', address: '123 Oak Street, Springfield, IL 62701', loyaltyPoints: 2450, memberSince: '2023-03-15' },
  { id: 2, name: 'Michael Chen', email: 'mchen88@yahoo.com', phone: '(555) 234-5678', address: '456 Maple Ave, Chicago, IL 60601', loyaltyPoints: 1890, memberSince: '2023-06-22' },
  { id: 3, name: 'Emily Rodriguez', email: 'emily.r@outlook.com', phone: '(555) 345-6789', address: '789 Pine Road, Aurora, IL 60502', loyaltyPoints: 3200, memberSince: '2022-11-08' },
  { id: 4, name: 'James Williams', email: 'jwilliams@email.com', phone: '(555) 456-7890', address: '321 Elm Court, Naperville, IL 60540', loyaltyPoints: 980, memberSince: '2024-01-10' },
  { id: 5, name: 'Amanda Foster', email: 'amanda.foster@gmail.com', phone: '(555) 567-8901', address: '654 Cedar Lane, Evanston, IL 60201', loyaltyPoints: 4100, memberSince: '2022-05-20' },
  { id: 6, name: 'David Kim', email: 'dkim.work@gmail.com', phone: '(555) 678-9012', address: '987 Birch Street, Schaumburg, IL 60173', loyaltyPoints: 1560, memberSince: '2023-09-14' },
  { id: 7, name: 'Lisa Thompson', email: 'lisa.t@hotmail.com', phone: '(555) 789-0123', address: '246 Walnut Drive, Rockford, IL 61101', loyaltyPoints: 2780, memberSince: '2023-02-28' },
  { id: 8, name: 'Robert Martinez', email: 'rmartinez@email.com', phone: '(555) 890-1234', address: '135 Spruce Way, Peoria, IL 61602', loyaltyPoints: 720, memberSince: '2024-06-05' },
  { id: 9, name: 'Jennifer Lee', email: 'jlee2024@gmail.com', phone: '(555) 901-2345', address: '864 Willow Court, Champaign, IL 61820', loyaltyPoints: 3450, memberSince: '2022-08-17' },
  { id: 10, name: 'Christopher Brown', email: 'cbrown@yahoo.com', phone: '(555) 012-3456', address: '753 Ash Boulevard, Bloomington, IL 61701', loyaltyPoints: 1200, memberSince: '2023-12-01' },
];

// ========== SALES DATA ==========
let sales = [];
let saleIdCounter = 1000; // Start from 1000 for realistic receipt numbers

// ========== API ROUTES ==========

// Products
app.get('/api/products', (req, res) => res.json(products));
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  product ? res.json(product) : res.status(404).json({ error: 'Not found' });
});
app.post('/api/products', (req, res) => {
  const newProduct = { id: products.length + 1, ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});
app.put('/api/products/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === parseInt(req.params.id));
  if (idx !== -1) {
    products[idx] = { ...products[idx], ...req.body };
    res.json(products[idx]);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

// Categories
app.get('/api/categories', (req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  res.json(categories);
});

// Customers
app.get('/api/customers', (req, res) => res.json(customers));
app.get('/api/customers/:id', (req, res) => {
  const customer = customers.find(c => c.id === parseInt(req.params.id));
  customer ? res.json(customer) : res.status(404).json({ error: 'Not found' });
});
app.post('/api/customers', (req, res) => {
  const newCustomer = { 
    id: customers.length + 1, 
    ...req.body,
    loyaltyPoints: 0,
    memberSince: new Date().toISOString().split('T')[0]
  };
  customers.push(newCustomer);
  res.status(201).json(newCustomer);
});
app.put('/api/customers/:id', (req, res) => {
  const idx = customers.findIndex(c => c.id === parseInt(req.params.id));
  if (idx !== -1) {
    customers[idx] = { ...customers[idx], ...req.body };
    res.json(customers[idx]);
  } else {
    res.status(404).json({ error: 'Not found' });
  }
});

// Sales/POS
app.get('/api/sales', (req, res) => res.json(sales.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))));
app.get('/api/sales/:id', (req, res) => {
  const sale = sales.find(s => s.id === parseInt(req.params.id));
  sale ? res.json(sale) : res.status(404).json({ error: 'Not found' });
});
app.post('/api/sales', (req, res) => {
  const { items, customerId, paymentMethod, amountTendered } = req.body;
  
  let subtotal = 0;
  const saleItems = items.map(item => {
    const product = products.find(p => p.id === item.productId);
    if (product) {
      if (product.stock >= item.quantity) {
        product.stock -= item.quantity;
      }
      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;
      return { 
        productId: item.productId,
        name: product.name, 
        price: product.price, 
        quantity: item.quantity,
        subtotal: itemTotal 
      };
    }
    return item;
  });

  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;
  const change = amountTendered ? amountTendered - total : 0;

  // Update customer loyalty points
  let customer = null;
  if (customerId) {
    customer = customers.find(c => c.id === customerId);
    if (customer) {
      customer.loyaltyPoints += Math.floor(total); // 1 point per dollar
    }
  }

  const sale = {
    id: saleIdCounter++,
    receiptNumber: `RCP-${Date.now().toString(36).toUpperCase()}`,
    items: saleItems,
    subtotal: parseFloat(subtotal.toFixed(2)),
    tax: parseFloat(tax.toFixed(2)),
    total: parseFloat(total.toFixed(2)),
    customerId,
    customerName: customer ? customer.name : 'Walk-in Customer',
    paymentMethod: paymentMethod || 'cash',
    amountTendered: amountTendered || total,
    change: parseFloat(Math.max(0, change).toFixed(2)),
    cashier: 'Demo User',
    timestamp: new Date().toISOString(),
  };
  
  sales.push(sale);
  res.status(201).json(sale);
});

// Dashboard stats
app.get('/api/stats', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const todaySales = sales.filter(s => s.timestamp.startsWith(today));
  const totalSalesToday = todaySales.reduce((sum, s) => sum + s.total, 0);
  const totalTransactionsToday = todaySales.length;
  const lowStock = products.filter(p => p.stock < 20).length;
  const outOfStock = products.filter(p => p.stock === 0).length;
  const allTimeRevenue = sales.reduce((sum, s) => sum + s.total, 0);
  
  res.json({
    todaySales: totalSalesToday.toFixed(2),
    todayTransactions: totalTransactionsToday,
    allTimeRevenue: allTimeRevenue.toFixed(2),
    totalTransactions: sales.length,
    totalProducts: products.length,
    totalCustomers: customers.length,
    lowStockItems: lowStock,
    outOfStock: outOfStock,
    topProducts: getTopProducts(),
  });
});

function getTopProducts() {
  const productSales = {};
  sales.forEach(sale => {
    sale.items.forEach(item => {
      productSales[item.name] = (productSales[item.name] || 0) + item.quantity;
    });
  });
  return Object.entries(productSales)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, qty]) => ({ name, qty }));
}

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════════╗
  ║     OpenSourcePOS Demo Running!            ║
  ║                                            ║
  ║     Open: http://localhost:${PORT}            ║
  ║                                            ║
  ║     Press Ctrl+C to stop                   ║
  ╚════════════════════════════════════════════╝
  `);
});
