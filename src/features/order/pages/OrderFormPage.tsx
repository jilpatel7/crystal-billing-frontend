import React from "react";
import OrderForm from "./OrderForm";
import { mockParties, mockStaff } from "../../../data/mockData";

const OrderFormPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
              Create New Order
            </h1>
          </div>
          <p className="text-gray-600">
            Enter order details and add diamond lots below
          </p>
        </header>

        <OrderForm parties={mockParties} staff={mockStaff} />
      </div>
    </div>
  );
};

export default OrderFormPage;
