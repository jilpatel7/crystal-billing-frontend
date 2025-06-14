import React from "react";
import OrderForm from "./OrderForm";
import { useQuery } from "@tanstack/react-query";
import { getAllPartyIdsAndNames } from "../../party/services";
import { getAllStaffIdsAndNames } from "../../staff/services";
import { useParams } from "react-router-dom";

const OrderFormPage: React.FC = () => {
  const { id } = useParams();
  const {
    data: allPartyIdsAndNames,
    // isLoading,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["partyIdsAndNames"],
    queryFn: () => getAllPartyIdsAndNames(),
  });

  const {
    data: allStaffIdsAndNames,
    // isLoading,
    // isError,
    // error,
  } = useQuery({
    queryKey: ["staffIdsAndNames"],
    queryFn: () => getAllStaffIdsAndNames(),
  });

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              {id ? "Edit Order" : "Create New Order"}
            </h1>
          </div>
          <p className="text-gray-600">
            {id
              ? "Update order details and add diamond lots below"
              : "Enter order details and add diamond lots below"}
          </p>
        </header>

        <OrderForm
          parties={allPartyIdsAndNames?.data ?? []}
          staff={
            allStaffIdsAndNames?.data?.map(
              (staff: {
                id: number;
                first_name: string;
                last_name: string;
              }) => {
                return {
                  id: staff.id,
                  name: staff.first_name + " " + staff.last_name,
                };
              }
            ) ?? []
          }
          id={id}
        />
      </div>
    </div>
  );
};

export default OrderFormPage;
