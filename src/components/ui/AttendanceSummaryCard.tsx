import React from "react";
import {
  UserCheck,
  UserX,
  UserMinus,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { Card, CardHeader, CardBody } from "./Card";

interface AttendanceSummaryProps {
  staffName: string;
  month: string;
  year: number;
  totalDays: number;
  presentDays: number;
  absentDays: number;
  halfDays: number;
  attendancePercentage: number;
}

const AttendanceSummaryCard: React.FC<AttendanceSummaryProps> = ({
  staffName,
  month,
  year,
  totalDays,
  presentDays,
  absentDays,
  halfDays,
  attendancePercentage,
}) => {
  const getPercentageColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600";
    if (percentage >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getPercentageBgColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-100";
    if (percentage >= 75) return "bg-yellow-100";
    return "bg-red-100";
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader
        title={`${staffName} - ${month} ${year}`}
        subtitle="Monthly Attendance Summary"
      />
      <CardBody>
        <div className="space-y-4">
          {/* Attendance Percentage */}
          <div
            className={`rounded-lg p-4 ${getPercentageBgColor(
              attendancePercentage
            )}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp
                  className={`h-5 w-5 ${getPercentageColor(
                    attendancePercentage
                  )}`}
                />
                <span className="font-medium text-gray-800">
                  Attendance Rate
                </span>
              </div>
              <span
                className={`text-2xl font-bold ${getPercentageColor(
                  attendancePercentage
                )}`}
              >
                {attendancePercentage?.toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Attendance Breakdown */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-1" />
              <p className="text-2xl font-bold text-blue-600">{totalDays}</p>
              <p className="text-xs text-gray-600">Total Days</p>
            </div>

            <div className="bg-green-50 rounded-lg p-3 text-center">
              <UserCheck className="h-6 w-6 text-green-600 mx-auto mb-1" />
              <p className="text-2xl font-bold text-green-600">{presentDays}</p>
              <p className="text-xs text-gray-600">Present</p>
            </div>

            <div className="bg-red-50 rounded-lg p-3 text-center">
              <UserX className="h-6 w-6 text-red-600 mx-auto mb-1" />
              <p className="text-2xl font-bold text-red-600">{absentDays}</p>
              <p className="text-xs text-gray-600">Absent</p>
            </div>

            <div className="bg-yellow-50 rounded-lg p-3 text-center">
              <UserMinus className="h-6 w-6 text-yellow-600 mx-auto mb-1" />
              <p className="text-2xl font-bold text-yellow-600">{halfDays}</p>
              <p className="text-xs text-gray-600">Half Days</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>
                {presentDays + halfDays * 0.5} / {totalDays} days
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  attendancePercentage >= 90
                    ? "bg-green-500"
                    : attendancePercentage >= 75
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{ width: `${Math.min(attendancePercentage, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default AttendanceSummaryCard;
