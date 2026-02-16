# QuickMart POS - Self-Service Point of Sale System

A modern, self-service point of sale (POS) system built with Node.js and Express. This application allows customers to shop independently through a kiosk interface, while providing store administrators with comprehensive management tools.

---

## Features

### Customer Self-Service Kiosk
- Browse products by category
- Search products by name or barcode
- Add items to cart with quantity controls
- Multiple payment methods (Card, Cash, Mobile)
- Digital receipt generation
- Member registration and login for loyalty points

### Admin Dashboard
- Real-time sales overview
- Daily revenue and transaction tracking
- Low stock alerts and inventory monitoring
- Complete sales history with detailed records
- Customer management with loyalty point tracking
- Product inventory management

### General Features
- South African Rand (ZAR) currency
- 15% VAT calculation
- Professional grey and white theme
- Responsive design for various screen sizes
- No database required (in-memory storage)

---

## Installation

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Setup Steps

1. Clone the repository:
```bash
git clone https://github.com/Thelezinhle/New-POS.git
cd New-POS
```

2. Navigate to the demo folder:
```bash
cd demo
```

3. Install dependencies:
```bash
npm install
```

4. Start the server:
```bash
node server.js
```

5. Open your browser and go to:
```
http://localhost:3000
```

---

## Usage

### For Customers

1. Click "Start Shopping" on the welcome screen
2. Browse products or search using the search bar
3. Tap products to add them to your cart
4. Adjust quantities using the + and - buttons
5. Click "Proceed to Payment" when ready
6. Select your payment method (Card, Cash, or Mobile)
7. Complete payment and receive your receipt

### Member Registration

1. Click "Member Login" on the welcome screen
2. Click "Create Free Account"
3. Fill in your details (name, email, username, password)
4. Click "Create Account"
5. You will be logged in automatically and can start shopping

### For Staff/Admin

1. Click "Staff Portal" on the welcome screen
2. Enter admin credentials
3. Access the dashboard to view:
   - Today's sales and transactions
   - Low stock items
   - Recent sales
4. Navigate using the top menu to:
   - View complete sales history
   - Manage product inventory
   - View customer information
   - Generate reports

---

## Login Credentials

### Admin/Staff Access
| Username | Password  | Role         |
|----------|-----------|--------------|
| admin    | admin123  | Store Manager|
| staff1   | staff123  | Staff Member |

### Customer Accounts (Demo)
| Username | Password  | Name            |
|----------|-----------|-----------------|
| sarah.j  | cust123   | Sarah Johnson   |
| mchen    | cust123   | Michael Chen    |
| emily.r  | cust123   | Emily Rodriguez |

You can also register a new customer account through the Member Login option.

---

## Project Structure

```
demo/
  server.js           - Express server with all API endpoints
  package.json        - Project dependencies
  public/
    index.html        - Single-page application frontend
```

---

## API Endpoints

### Authentication
- POST /api/login - User login
- POST /api/register - Customer registration

### Products
- GET /api/products - Get all products
- GET /api/products/:id - Get product by ID
- POST /api/products - Add new product

### Sales
- GET /api/sales - Get all sales (optional: ?customerId=X)
- POST /api/sales - Create new sale

### Customers
- GET /api/customers - Get all customers
- GET /api/customers/:id - Get customer by ID
- PUT /api/customers/:id - Update customer

### Statistics
- GET /api/stats - Get store statistics
- GET /api/stats/customer/:id - Get customer statistics

---

## Technology Stack

- Backend: Node.js, Express.js
- Frontend: HTML5, CSS3, Vanilla JavaScript
- Data Storage: In-memory (no database required)
- Styling: Custom CSS with modern design principles

---

## Notes

- This is a demonstration application with in-memory data storage
- All data resets when the server restarts
- For production use, implement a proper database solution
- Prices are displayed in South African Rand (R)
- VAT is calculated at 15%

---

## License

This project is open source and available for educational and commercial use.

---

## Contributing

Contributions are welcome. Please submit pull requests or open issues for any improvements or bug fixes.

---

## Support

For questions or support, please open an issue on the GitHub repository.
