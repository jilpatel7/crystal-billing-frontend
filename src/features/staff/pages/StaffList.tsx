import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Column, Table } from "../../../components/ui/Table";
import Pagination from "../../../components/ui/Pagination";
import TableFilter from "../../../components/ui/TableFilter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IGetDataParams } from "../../../types";
import { deleteStaff, getStaff } from "../services";
import { StaffMember } from "../types";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationDialog from "../../../components/ui/DeleteConfirmationDialog";
import { toast } from "sonner";

const StaffList: React.FC = () => {
  const navigate = useNavigate();
  const [showDeleteDialog, setShowDeleteDialog] = useState<{
    isOpen: boolean;
    user: StaffMember | null;
  }>({
    isOpen: false,
    user: null,
  });

  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companyStaff"] });
    },
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  const [sortField, setSortField] = useState<keyof StaffMember>("id");
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

  const columns: Column<StaffMember>[] = [
    {
      header: "Id",
      accessor: "id",
      sortable: true,
    },
    {
      header: "Name",
      accessor: (row: StaffMember) => row.first_name + " " + row.last_name,
      sortable: false,
    },
    {
      header: "Age",
      accessor: "age",
      sortable: false,
    },
    {
      header: "Primary Phone",
      accessor: "primary_phone",
      sortable: false,
    },
    {
      header: "Secondary Phone",
      accessor: "secondary_phone",
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
    queryKey: ["companyStaff", queryParams],
    queryFn: () => getStaff(queryParams),
  });

  const handleSort = (field: keyof StaffMember, direction: "ASC" | "DESC") => {
    setSortField(field);
    setSortDirection(direction);
  };

  const handleEdit = (staffMember: StaffMember) => {
    navigate(`/staff/edit/${staffMember.id}`);
  };

  const handleDelete = async () => {
    if (!showDeleteDialog.user?.id) return;

    try {
      await mutateAsync(showDeleteDialog.user.id);
      toast.success("Staff member deleted successfully");
    } catch (error) {
      console.error("Failed to delete", error);
      toast.error("Failed to delete staff member");
    }
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
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-6 space-y-6">
          <header className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                Staff Management
              </h1>
            </div>
            <p className="text-gray-600">
              View, track, and manage all staff members efficiently from one
              place.
            </p>
          </header>

          <TableFilter
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            onCreate={() => {
              navigate("/staff/create");
            }}
            createButtonText="Add Staff Member"
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
                  onClick={() =>
                    setShowDeleteDialog({ isOpen: true, user: user })
                  }
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

      <DeleteConfirmationDialog
        isOpen={showDeleteDialog.isOpen}
        onClose={() => setShowDeleteDialog({ isOpen: false, user: null })}
        onConfirm={() => {
          handleDelete();
          setShowDeleteDialog({ isOpen: false, user: null });
        }}
        isLoading={isPending}
        title="Delete this item?"
        description="This action cannot be undone. This item will be permanently deleted from our servers."
      />
    </>
  );
};

export default StaffList;
