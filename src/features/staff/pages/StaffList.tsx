import React, { useEffect, useState } from "react";
import {
  Pencil,
  Trash2,
  Calendar,
  CalendarDays,
  Clock,
  BarChart3,
} from "lucide-react";
import { Column, Table } from "../../../components/ui/Table";
import Pagination from "../../../components/ui/Pagination";
import TableFilter from "../../../components/ui/TableFilter";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IGetDataParams } from "../../../types";
import {
  deleteStaff,
  getStaff,
  markAttendance,
  getAttendance,
  requestLeave,
  getStaffAttendanceSummary,
} from "../services";
import { StaffMember } from "../types";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationDialog from "../../../components/ui/DeleteConfirmationDialog";
import { toast } from "sonner";
import AttendanceCalendar from "../../../components/ui/AttendanceCalendar";
import AttendanceDialog from "../../../components/ui/AttendanceDialog";
import LeaveRequestDialog from "../../../components/ui/LeaveRequestDialog";
import AttendanceSummaryCard from "../../../components/ui/AttendanceSummaryCard";
import {
  AttendanceFormData,
  LeaveRequestFormData,
} from "../validation-schema/attendanceSchema";
import { format, startOfMonth } from "date-fns";
import Button from "../../../components/ui/Button";
import IconButton from "../../../components/ui/IconButton";

const StaffList: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"list" | "attendance">("list");
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(
    startOfMonth(new Date())
  );

  const [showDeleteDialog, setShowDeleteDialog] = useState<{
    isOpen: boolean;
    user: StaffMember | null;
  }>({
    isOpen: false,
    user: null,
  });

  const [showAttendanceDialog, setShowAttendanceDialog] = useState<{
    isOpen: boolean;
    staff: StaffMember | null;
    attendance_date: Date | null;
  }>({
    isOpen: false,
    staff: null,
    attendance_date: null,
  });

  const [showLeaveDialog, setShowLeaveDialog] = useState<{
    isOpen: boolean;
    staff: StaffMember | null;
  }>({
    isOpen: false,
    staff: null,
  });

  // const [showSummaryDialog, setShowSummaryDialog] = useState<{
  //   isOpen: boolean;
  //   staff: StaffMember | null;
  // }>({
  //   isOpen: false,
  //   staff: null,
  // });

  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteStaff,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["companyStaff"] });
    },
  });

  const {
    mutateAsync: markAttendanceMutation,
    isPending: isMarkingAttendance,
  } = useMutation({
    mutationFn: markAttendance,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
      toast.success("Attendance marked successfully");
      setShowAttendanceDialog({
        isOpen: false,
        staff: null,
        attendance_date: null,
      });
    },
    onError: () => {
      toast.error("Failed to mark attendance");
    },
  });

  const { mutateAsync: requestLeaveMutation, isPending: isRequestingLeave } =
    useMutation({
      mutationFn: requestLeave,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["attendance"] });
        toast.success("Leave request submitted successfully");
        setShowLeaveDialog({ isOpen: false, staff: null });
      },
      onError: () => {
        toast.error("Failed to submit leave request");
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

  // Fetch attendance data for selected staff and month
  const { data: attendanceData } = useQuery({
    queryKey: [
      "attendance",
      selectedStaff?.id,
      format(currentMonth, "yyyy-MM"),
    ],
    queryFn: () =>
      getAttendance({
        staff_id: selectedStaff?.id,
        month: format(currentMonth, "yyyy-MM"),
      }),
    enabled: !!selectedStaff && activeTab === "attendance",
  });

  // Fetch attendance summary
  const { data: summaryData } = useQuery({
    queryKey: [
      "attendanceSummary",
      selectedStaff?.id,
      currentMonth.getMonth() + 1,
      currentMonth.getFullYear(),
    ],
    queryFn: () =>
      getStaffAttendanceSummary(
        selectedStaff!.id,
        currentMonth.getMonth() + 1,
        currentMonth.getFullYear()
      ),
    enabled: !!selectedStaff && activeTab === "attendance",
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

  const handleMarkAttendance = (staff: StaffMember) => {
    setShowAttendanceDialog({
      isOpen: true,
      staff,
      attendance_date: new Date(),
    });
  };

  const handleRequestLeave = (staff: StaffMember) => {
    setShowLeaveDialog({
      isOpen: true,
      staff,
    });
  };

  const handleViewAttendance = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setActiveTab("attendance");
  };

  const handleAttendanceSubmit = async (data: AttendanceFormData) => {
    await markAttendanceMutation(data);
  };

  const handleLeaveSubmit = async (data: LeaveRequestFormData) => {
    await requestLeaveMutation(data);
  };

  const handleDateClick = (date: Date) => {
    if (!selectedStaff) return;
    setSelectedDate(date);
    setShowAttendanceDialog({
      isOpen: true,
      staff: selectedStaff,
      attendance_date: date,
    });
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

  if (activeTab === "attendance" && selectedStaff) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <main className="flex-1 container mx-auto px-4 py-6 space-y-6">
          <header className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
                  Attendance Management
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage attendance for {selectedStaff.first_name}{" "}
                  {selectedStaff.last_name}
                </p>
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setActiveTab("list")}
                  className="flex items-center"
                >
                  ← Back to Staff List
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleRequestLeave(selectedStaff)}
                  className="flex items-center"
                >
                  <CalendarDays className="h-4 w-4 mr-2" />
                  Request Leave
                </Button>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AttendanceCalendar
                attendanceRecords={attendanceData?.data || []}
                onDateClick={handleDateClick}
                selectedDate={selectedDate}
                currentMonth={currentMonth}
                onMonthChange={setCurrentMonth}
              />
            </div>
            <div>
              {summaryData?.data && (
                <AttendanceSummaryCard
                  staffName={`${selectedStaff.first_name} ${selectedStaff.last_name}`}
                  month={format(currentMonth, "MMMM")}
                  year={currentMonth.getFullYear()}
                  totalDays={summaryData.data.totalDays}
                  presentDays={summaryData.data.presentDays}
                  absentDays={summaryData.data.absentDays}
                  halfDays={summaryData.data.halfDays}
                  attendancePercentage={summaryData.data.attendancePercentage}
                />
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

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
                <IconButton
                  onClick={() => handleViewAttendance(user)}
                  title="View Attendance"
                >
                  <BarChart3 className="h-4 w-4 text-purple-600" />
                </IconButton>
                <IconButton
                  onClick={() => handleMarkAttendance(user)}
                  title="Mark Attendance"
                >
                  <Clock className="h-4 w-4 text-green-600" />
                </IconButton>
                <IconButton
                  onClick={() => handleRequestLeave(user)}
                  title="Request Leave"
                >
                  <Calendar className="h-4 w-4 text-orange-600" />
                </IconButton>
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

      {showAttendanceDialog.staff && showAttendanceDialog.attendance_date && (
        <AttendanceDialog
          isOpen={showAttendanceDialog.isOpen}
          onClose={() =>
            setShowAttendanceDialog({
              isOpen: false,
              staff: null,
              attendance_date: null,
            })
          }
          onSubmit={handleAttendanceSubmit}
          selectedDate={showAttendanceDialog.attendance_date}
          staffMember={showAttendanceDialog.staff}
          isLoading={isMarkingAttendance}
        />
      )}

      {showLeaveDialog.staff && (
        <LeaveRequestDialog
          isOpen={showLeaveDialog.isOpen}
          onClose={() => setShowLeaveDialog({ isOpen: false, staff: null })}
          onSubmit={handleLeaveSubmit}
          staffMember={showLeaveDialog.staff}
          isLoading={isRequestingLeave}
        />
      )}
    </>
  );
};

export default StaffList;
