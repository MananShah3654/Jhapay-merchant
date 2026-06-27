// Mock merchant + catalog data
export const merchant = {
  name: "Maya",
  business: "JhaX Inc.",
  modeLabel: "Front Counter · Standard Mode",
  avatar:
    "https://images.unsplash.com/photo-1753351052363-53ce102830eb?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NzB8MHwxfHNlYXJjaHwyfHxoYXBweSUyMGNhZmUlMjBtZXJjaGFudCUyMHBvcnRyYWl0fGVufDB8fHx8MTc4MjQ5NDc0NXww&ixlib=rb-4.1.0&q=85",
  todaysSales: 1284.5,
  yesterdaySales: 1102.0,
  txCount: 32,
  walletBalance: 4326.18,
  pendingPayout: 612.4,
  payoutEta: "Tomorrow, 9:00 AM",
};

export const catalog = [
  { id: "c1", name: "Cappuccino", price: 4.5, category: "Beverages",
    img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=160&q=70" },
  { id: "c2", name: "Latte", price: 4.75, category: "Beverages",
    img: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=160&q=70" },
  { id: "c3", name: "Espresso", price: 3.0, category: "Beverages",
    img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=160&q=70" },
  { id: "c4", name: "Mocha", price: 5.25, category: "Beverages",
    img: "https://images.unsplash.com/photo-1578374173703-2dccf403e80a?w=160&q=70" },
  { id: "c5", name: "Cold Brew", price: 4.5, category: "Beverages",
    img: "https://images.unsplash.com/photo-1517959105821-eaf2591984ca?w=160&q=70" },
  { id: "c6", name: "Bagel", price: 2.75, category: "Food",
    img: "https://images.unsplash.com/photo-1592151450283-fa01d5b5af8a?w=160&q=70" },
  { id: "c7", name: "Muffin", price: 3.25, category: "Food",
    img: "https://images.unsplash.com/photo-1604882737082-e0b5b8d3e4e0?w=160&q=70" },
  { id: "c8", name: "Croissant", price: 3.5, category: "Food",
    img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=160&q=70" },
];

export const catalogCategories = [
  { id: "all", name: "All Items", icon: "grid" },
  { id: "beverages", name: "Beverages", icon: "coffee" },
  { id: "food", name: "Food", icon: "utensils" },
  { id: "retail", name: "Retail", icon: "shopping-bag" },
  { id: "gift", name: "Gift Cards", icon: "credit-card" },
  { id: "offers", name: "Offers", icon: "tag" },
  { id: "extras", name: "Extras", icon: "plus-circle" },
  { id: "services", name: "Services", icon: "tool" },
];

export const transactions = [
  {
    id: "1025",
    customer: "Alex P.",
    amount: 27.5,
    method: "VISA",
    last4: "4242",
    time: "9:41 AM",
    status: "completed",
    brand: "visa",
  },
  {
    id: "1024",
    customer: "Mia R.",
    amount: 45.0,
    method: "Mastercard",
    last4: "5565",
    time: "9:15 AM",
    status: "completed",
    brand: "mastercard",
  },
  {
    id: "1023",
    customer: "John D.",
    amount: 12.75,
    method: "Amex",
    last4: "1001",
    time: "8:47 AM",
    status: "completed",
    brand: "amex",
  },
  {
    id: "1022",
    customer: "Sarah K.",
    amount: 35.2,
    method: "VISA",
    last4: "4242",
    time: "8:30 AM",
    status: "refunded",
    brand: "visa",
  },
  {
    id: "1021",
    customer: "Chris T.",
    amount: 18.6,
    method: "Discover",
    last4: "1111",
    time: "8:12 AM",
    status: "completed",
    brand: "discover",
  },
  {
    id: "1020",
    customer: "Riya S.",
    amount: 14.5,
    method: "Apple Pay",
    last4: "—",
    time: "7:58 AM",
    status: "completed",
    brand: "applepay",
  },
];

export const activityStats = {
  totalCollected: 1234.56,
  totalDelta: 12.4,
  txCount: 23,
  txDelta: 9.3,
  avgTicket: 53.68,
  avgDelta: 5.6,
};

export const devices = [
  {
    id: "d1",
    name: "iPhone 15 Pro",
    model: "Tap to Pay on iPhone",
    serial: "JHX-IP15P-0021",
    status: "online",
    last: "Active now",
    battery: 87,
  },
  {
    id: "d2",
    name: "JhaPay Reader",
    model: "Bluetooth M2 · v3.2",
    serial: "JHR-M2-A41B",
    status: "needs-update",
    last: "12 min ago",
    battery: 64,
  },
  {
    id: "d3",
    name: "Kitchen Printer",
    model: "Star TSP143 · Wi-Fi",
    serial: "PRN-TSP143-77",
    status: "offline",
    last: "Yesterday",
    battery: null,
  },
];

export const alerts = [
  {
    id: "a1",
    title: "Payout incoming",
    body: "$612.40 will land in your bank tomorrow at 9:00 AM.",
    time: "2 min ago",
    type: "info",
    unread: true,
  },
  {
    id: "a2",
    title: "Reader needs firmware update",
    body: "JhaPay Reader M2 has v3.1 — newest is v3.2. Tap to update.",
    time: "1 hr ago",
    type: "warning",
    unread: true,
  },
  {
    id: "a3",
    title: "Oat Milk running low",
    body: "Only 3 cartons left — at current pace you'll run out Thursday.",
    time: "3 hrs ago",
    type: "warning",
    unread: false,
  },
  {
    id: "a4",
    title: "New 5-star review",
    body: "“Best latte in town and tap-to-pay is so smooth.” — Daniel C.",
    time: "Yesterday",
    type: "success",
    unread: false,
  },
  {
    id: "a5",
    title: "Refund issued",
    body: "Refund of $35.20 to Sarah K. (Visa ••4242) was successful.",
    time: "Yesterday",
    type: "info",
    unread: false,
  },
];

export const promptSuggestions = [
  "How much did I make today?",
  "What should I reorder?",
  "Show slow-moving inventory",
  "Forecast tomorrow's sales",
  "Who refunded the most?",
];

// More page grid sections (Square-style colored icons)
export const moreSections = [
  {
    title: "Business",
    items: [
      { id: "orders", label: "Orders", color: "#A78BFA", icon: "clipboard-list" },
      { id: "catalog", label: "Catalog", color: "#F59E0B", icon: "shopping-bag" },
      { id: "inventory", label: "Inventory", color: "#3B82F6", icon: "package" },
      { id: "customers", label: "Customers", color: "#00F5A0", icon: "users" },
      { id: "team", label: "Team", color: "#A78BFA", icon: "id-card" },
    ],
  },
  {
    title: "Sales",
    items: [
      { id: "transactions", label: "Transactions", color: "#00F5A0", icon: "arrow-left-right" },
      { id: "reports", label: "Reports", color: "#3B82F6", icon: "bar-chart-3" },
      { id: "invoices", label: "Invoices", color: "#F59E0B", icon: "file-text" },
      { id: "store", label: "Online Store", color: "#F472B6", icon: "globe" },
    ],
  },
  {
    title: "Payments & Finance",
    items: [
      { id: "payouts", label: "Payouts", color: "#00F5A0", icon: "landmark" },
      { id: "balance", label: "Balance", color: "#A78BFA", icon: "wallet" },
      { id: "fees", label: "Fees", color: "#FBBF24", icon: "coins" },
      { id: "methods", label: "Payment Methods", color: "#3B82F6", icon: "credit-card" },
    ],
  },
  {
    title: "Tools & Settings",
    items: [
      { id: "settings", label: "Settings", color: "#A78BFA", icon: "settings" },
      { id: "devices", label: "Devices", color: "#3B82F6", icon: "monitor-smartphone" },
      { id: "notifs", label: "Notifications", color: "#F59E0B", icon: "bell" },
      { id: "support", label: "Support", color: "#22D3EE", icon: "life-buoy" },
    ],
  },
];
