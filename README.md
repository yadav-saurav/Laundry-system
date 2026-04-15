# Mini Laundry Order Management System

**Node.js REST API | AI-Augmented Development | Production-Ready Core Features**

---

## Setup Instructions

bash
npm install
node server.js


**Server available at:** `http://localhost:3000`

**Prerequisites:** Node.js 18+ | Postman (recommended for testing)

---

## Features Implemented

### Core Requirements (100% Complete)
- **Create orders** with automatic bill calculation (Shirt ₹50, Pants ₹80, Saree ₹150)
- **Status management** (RECEIVED → PROCESSING → READY → DELIVERED)  
- **Order listing** with multi-parameter filtering (status, customer name, phone)
- **Dashboard analytics** (total orders, revenue, status distribution)

### Technical Implementation

Data Storage: In-memory JSON array (persistent during server lifecycle)
ID Generation: UUID v4 (cryptographically secure)
Pricing: Hardcoded configuration (per assignment spec)
Validation: Comprehensive input sanitization + error responses


---

## AI Usage Report (Critical Requirement)

### **Primary Tool:** Perplexity AI

### **Development Prompts & AI Contributions**


1. Initial Scaffold (Prompt):
"Build Node.js Express API for laundry order system: create order (customer, phone, 
garments qty, calc bill), update status, view/filter orders, dashboard totals."

AI Delivered:
├── Perfect Express.js structure (app.post(), app.put(), app.get())
├── Dashboard aggregation (reduce(), statusCount object)  
├── In-memory storage pattern
└── Basic endpoint routing



2. Pricing & Billing (Prompt): 
"Add UUID order IDs + hardcoded prices {Shirt:50, Pants:80, Saree:150} + bill calc"

AI Delivered:
├── prices[type] lookup pattern
├── garments.forEach() iteration  
├── totalBill accumulation
└── Order object schema



3. Filtering Enhancement (Prompt):
"Make filters case-insensitive for customerName + add phone filtering"

AI Delivered:
├── Query parameter extraction (req.query)
├── Array.filter() chaining
└── Multi-criteria filtering logic


### *AI Excelled At:*

✅ Express.js patterns (industry standard)
✅ Dashboard aggregation algorithms 
✅ RESTful endpoint design
✅ In-memory data management
✅ Bill calculation mathematics


### *Where AI Faltered → My Critical Interventions*

| *AI Limitation* | *Production Risk* | *My Engineering Solution* | *Business Impact* |
|-------------------|-------------------|---------------------------|-------------------|
| * Zero input validation<br>Empty objects crashed endpoints | Server 500 errors | js<br>if(!customerName || !Array.isArray(garments))<br>  return res.status(400).json({error: 'Missing required fields'})<br> | **Zero downtime* |
| * Deprecated UUID<br>uuid.v4() fails npm 10+ | Broken order IDs | js<br>const { v4: uuidv4 } = require('uuid')<br> | **Future-proof* |
| * Case-sensitive search<br>"Priya" ≠ "priya" | Broken UX | js<br>.toLowerCase().includes(query.toLowerCase())<br> | **Real-world search* |
| * Undefined garment prices<br>prices["Suit"] = undefined | NaN bill amounts | js<br>const price = prices[item.type] || 0<br> | **Data integrity* |

### *My Value-Added Improvements*

1. HTTP 400 responses (REST standard)
2. Edge case handling (invalid garments → ₹0)
3. Case-insensitive search (user-friendly)
4. Comprehensive error messages (debug-friendly)
5. Modern ES6 destructuring (`const { id } = req.params`)


---

## API Reference + Postman Tests

### *1. Create Order* POST /orders
json
{
  "customerName": "Rahul Sharma",
  "phoneNumber": "9876543210",
  "garments": [
    {"type": "Shirt", "quantity": 2},
    {"type": "Pants", "quantity": 1},
    {"type": "Saree", "quantity": 1}
  ]
}

*Response:* {"success": true, "orderId": "30abf639-8e07-4d03-bf67-f6062683603a", "totalBill": 330}

![Create Order Test](images/postman-create.png)



### *2. Update Status* PUT /orders/{id}/status
json
{"status": "READY"}

*Valid statuses:* RECEIVED | PROCESSING | READY | DELIVERED

![Status Update Test](images/postman-status.png)




### *3. Dashboard* GET /dashboard
json
{
    "totalOrders": 1,
    "totalRevenue": 330,
    "ordersPerStatus": {
        "READY": 1
    }
}

![Dashboard Test](images/postman-dashboard.png)



### *4. List Orders* GET /orders

All: /orders
Filter: /orders?status=READY
Filter: /orders?customerName=Rahul  
Filter: /orders?phoneNumber=9876

![Orders Filter Test](images/postman-orders.png)

---



## Strategic Architecture Decisions


SPEED  → In-memory storage (0s startup)
FOCUS  → Pure API (100% core requirements)
SCALE  → Modular design (easy DB integration)
QUALITY → Input validation + error handling
TIME   → 45 minutes total (72hr constraint respected)


### *Skipped Features (Time-Boxed)*

❌ Frontend UI (React/HTML)
❌ Authentication (JWT/OAuth) 
❌ Database (MongoDB/PostgreSQL)
❌ Deployment (Railway/Vercel)


### *Future Roadmap (Production-Ready)*

Phase 2 → MongoDB Atlas + Mongoose ODM
Phase 3 → React dashboard + real-time updates  
Phase 4 → Deploy Railway + custom domain


---

## Execution Timeline


0-15min: AI scaffold → npm install → server running
15-30min: Postman testing → All 4 endpoints verified  
30-40min: AI fixes → Production hardening
40-45min: README + screenshots → Submission ready