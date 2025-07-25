import React from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  UserCheck,
  UserX,
  UserMinus,
} from "lucide-react";
import { AttendanceRecord, AttendanceStatus } from "../../features/staff/types";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isToday,
  isSameMonth,
} from "date-fns";

interface AttendanceCalendarProps {
  attendanceRecords: AttendanceRecord[];
  onDateClick: (date: Date) => void;
  selectedDate?: Date;
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
}

const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({
  attendanceRecords,
  onDateClick,
  selectedDate,
  currentMonth,
  onMonthChange,
}) => {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getAttendanceForDate = (date: Date) => {
    return attendanceRecords.find((record) =>
      isSameDay(new Date(record.date), date)
    );
  };

  const getStatusIcon = (status: AttendanceStatus) => {
    switch (status) {
      case AttendanceStatus.PRESENT:
        return <UserCheck size={14} className="text-green-600" />;
      case AttendanceStatus.ABSENT:
        return <UserX size={14} className="text-red-600" />;
      case AttendanceStatus.HALF_DAY:
        return <UserMinus size={14} className="text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case AttendanceStatus.PRESENT:
        return "bg-green-100 border-green-300 text-green-800";
      case AttendanceStatus.ABSENT:
        return "bg-red-100 border-red-300 text-red-800";
      case AttendanceStatus.HALF_DAY:
        return "bg-yellow-100 border-yellow-300 text-yellow-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-600";
    }
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentMonth);
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    onMonthChange(newDate);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Calendar className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            {format(currentMonth, "MMMM yyyy")}
          </h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth("prev")}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={16} className="text-gray-600" />
          </button>
          <button
            onClick={() => navigateMonth("next")}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            <ChevronRight size={16} className="text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="p-2 text-center text-sm font-medium text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {monthDays.map((date) => {
          const attendance = getAttendanceForDate(date);
          const isSelected = selectedDate && isSameDay(date, selectedDate);
          const isTodayDate = isToday(date);
          const isCurrentMonth = isSameMonth(date, currentMonth);

          return (
            <button
              key={date.toISOString()}
              onClick={() => onDateClick(date)}
              className={`
                relative p-2 h-12 text-sm border rounded-md transition-all duration-200 hover:shadow-md
                ${isSelected ? "ring-2 ring-blue-500 ring-offset-1" : ""}
                ${isTodayDate ? "font-bold" : ""}
                ${!isCurrentMonth ? "opacity-50" : ""}
                ${
                  attendance
                    ? getStatusColor(attendance.status)
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }
              `}
            >
              <div className="flex flex-col items-center justify-center h-full">
                <span className={`${isTodayDate ? "text-blue-600" : ""}`}>
                  {format(date, "d")}
                </span>
                {attendance && (
                  <div className="absolute bottom-1 right-1">
                    {getStatusIcon(attendance.status)}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <UserCheck size={16} className="text-green-600" />
          <span className="text-gray-600">Present</span>
        </div>
        <div className="flex items-center space-x-2">
          <UserX size={16} className="text-red-600" />
          <span className="text-gray-600">Absent</span>
        </div>
        <div className="flex items-center space-x-2">
          <UserMinus size={16} className="text-yellow-600" />
          <span className="text-gray-600">Half Day</span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalendar;
