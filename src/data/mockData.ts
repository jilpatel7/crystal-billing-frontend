import { Order, Status } from "../features/order/types";


function getRandomStatus(): string {
  return Status.PENDING;
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