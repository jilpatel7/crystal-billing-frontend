import { Order, OrderStatus, Party, Staff } from "../features/order/types";


function getRandomStatus(): string {
  return OrderStatus.PENDING;
}

function generateRandomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
}

export const generateMockOrders = (count: number): Order[] => {
  const orders: Order[] = [];
  
  const now = new Date();
  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(now.getFullYear() - 1);
  
  for (let i = 1; i <= count; i++) {
    const orderStatus = getRandomStatus();
    const lotCount = Math.floor(Math.random() * 5) + 1;
    const lots = [];
    
    for (let j = 1; j <= lotCount; j++) {
      const quantity = Math.floor(Math.random() * 10) + 1;
      const price = Math.floor(Math.random() * 1000) + 100;
      
      lots.push({
        id: `lot-${i}-${j}`,
        lotNumber: `LOT-${i}${j}${Math.floor(Math.random() * 1000)}`,
        description: `Sample lot ${j} for order ${i}`,
        quantity,
        status: getRandomStatus(),
        price
      });
    }
    
    const total = lots.reduce((sum, lot) => sum + (lot.quantity * lot.price), 0);
    
    orders.push({
      id: `order-${i}`,
      orderNumber: `ORD-${Math.floor(Math.random() * 10000)}`,
      customerName: `Customer ${i}`,
      date: generateRandomDate(oneYearAgo, now),
      status: orderStatus,
      total,
      lots
    });
  }
  
  return orders;
};

export const MOCK_ORDERS = generateMockOrders(20);


// Mock party data for dropdown
export const mockParties: Party[] = [
  { id: '1', name: 'Diamond Traders Inc.' },
  { id: '2', name: 'Gemstone Enterprises' },
  { id: '3', name: 'Crystal Jewelers' },
  { id: '4', name: 'Royal Diamond Exchange' },
  { id: '5', name: 'Sparkle & Co.' },
  { id: '6', name: 'Brilliant Cut Diamonds' },
  { id: '7', name: 'Luxe Gem Partners' },
  { id: '8', name: 'Premium Stone Works' },
  { id: '9', name: 'Elite Diamond Guild' },
  { id: '10', name: 'Heritage Jewel Traders' },
];

// Mock staff data for dropdown
export const mockStaff: Staff[] = [
  { id: '1', name: 'John Smith', role: 'Delivery Manager' },
  { id: '2', name: 'Maria Garcia', role: 'Senior Courier' },
  { id: '3', name: 'David Lee', role: 'Logistics Specialist' },
  { id: '4', name: 'Sarah Johnson', role: 'Transport Coordinator' },
  { id: '5', name: 'Robert Chen', role: 'Security Officer' },
  { id: '6', name: 'Emma Williams', role: 'Delivery Associate' },
  { id: '7', name: 'James Wilson', role: 'Courier' },
  { id: '8', name: 'Sophia Martinez', role: 'Delivery Supervisor' },
];