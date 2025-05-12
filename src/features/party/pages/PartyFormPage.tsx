import React from "react";
import PartyForm from "./PartyForm";

const PartyFormPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text">
              Add New Party
            </h1>
          </div>
          <p className="text-gray-600">
            Enter party details and addresses below
          </p>
        </header>

        <PartyForm />
      </div>
    </div>
  );
};

export default PartyFormPage;
