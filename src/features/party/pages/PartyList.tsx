import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Column, Table } from "../../../components/ui/Table";
import Pagination from "../../../components/ui/Pagination";
import TableFilter from "../../../components/ui/TableFilter";
import { useQuery } from "@tanstack/react-query";
import { getParty } from "../services";
import { IGetDataParams } from "../../../types";
import { Party } from "../types";

const PartyList: React.FC = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  const [sortField, setSortField] = useState<keyof Party>("id");
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

  const columns: Column<Party>[] = [
    {
      header: "Id",
      accessor: "id",
      sortable: true,
    },
    {
      header: "Name",
      accessor: "name",
      sortable: true,
    },
    {
      header: "Email",
      accessor: "email",
      sortable: false,
    },
    {
      header: "Office Phone",
      accessor: "office_phone",
      sortable: false,
    },
    {
      header: "Personal Phone",
      accessor: "personal_phone",
      sortable: false,
    },
  ];

  const queryParams: IGetDataParams = {
    page: currentPage,
    limit: ordersPerPage,
    search: debouncedTerm,
    sort: sortField,
    order: sortDirection,
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["party", queryParams],
    queryFn: () => getParty(queryParams),
  });

  const handleSort = (field: keyof Party, direction: "ASC" | "DESC") => {
    setSortField(field);
    setSortDirection(direction);
  };

  const handleEdit = (party: Party) => {
    console.log("Edit user:", party);
  };

  const handleDelete = (party: Party) => {
    console.log("Delete user:", party);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  if (isError) return <div>Error: {(error as Error).message}</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-6 space-y-6">
        <header className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Party Management
            </h1>
          </div>
          <p className="text-gray-600">
            View, track, and manage all parties efficiently from one place.
          </p>
        </header>

        <TableFilter
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          onCreate={() => {}}
          createButtonText="Add Party"
        />

        <Table
          columns={columns}
          data={data?.data?.data ?? []}
          sortField={sortField}
          sortDirection={sortDirection}
          onSort={handleSort}
          isLoading={isLoading}
          actions={(user) => (
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleEdit(user)}
                className="p-1 text-blue-600 hover:bg-blue-50 rounded-full"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => handleDelete(user)}
                className="p-1 text-red-600 hover:bg-red-50 rounded-full"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={data?.data?.totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </main>
    </div>
  );
};

export default PartyList;
