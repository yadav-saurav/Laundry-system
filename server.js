const express = require('express');
const { v4: uuidv4 } = require('uuid');
const app = express();
const port = 3000;

app.use(express.json());

// In-memory storage + hardcoded prices
let orders = [];
const prices = { Shirt: 50, Pants: 80, Saree: 150 };

// 1. CREATE ORDER
app.post('/orders', (req, res) => {
  const { customerName, phoneNumber, garments } = req.body;
  if (!customerName || !phoneNumber || !garments || !Array.isArray(garments)) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  let totalBill = 0;
  const items = [];
  garments.forEach(item => {
    const price = prices[item.type] || 0;
    const subtotal = price * item.quantity;
    totalBill += subtotal;
    items.push({ ...item, price, subtotal });
  });

  const order = {
    id: uuidv4(),
    customerName,
    phoneNumber,
    items,
    totalBill,
    status: 'RECEIVED',
    createdAt: new Date().toISOString()
  };

  orders.push(order);
  res.json({ success: true, orderId: order.id, totalBill });
});

// 2. UPDATE STATUS
app.put('/orders/:id/status', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const validStatuses = ['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'];
  
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  const order = orders.find(o => o.id === id);
  if (!order) return res.status(404).json({ error: 'Order not found' });

  order.status = status;
  res.json({ success: true, order });
});

// 3. VIEW ORDERS (with filters)
app.get('/orders', (req, res) => {
  const { status, customerName, phoneNumber } = req.query;
  let filtered = orders;

  if (status) filtered = filtered.filter(o => o.status === status);
  if (customerName) filtered = filtered.filter(o => o.customerName.toLowerCase().includes(customerName.toLowerCase()));
  if (phoneNumber) filtered = filtered.filter(o => o.phoneNumber.includes(phoneNumber));

  res.json(filtered);
});

// 4. DASHBOARD
app.get('/dashboard', (req, res) => {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalBill, 0);
  const statusCount = {};
  orders.forEach(o => {
    statusCount[o.status] = (statusCount[o.status] || 0) + 1;
  });

  res.json({
    totalOrders,
    totalRevenue,
    ordersPerStatus: statusCount
  });
});

app.get('/', (req, res) => res.json({ message: 'Laundry Order Management System' }));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});