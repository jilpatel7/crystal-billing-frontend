import React, { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Clock, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./shad-cn/dialog";
import {
  AttendanceFormData,
  attendanceSchema,
} from "../../features/staff/validation-schema/attendanceSchema";
import { AttendanceStatus, StaffMember } from "../../features/staff/types";
import SelectInput from "./SelectInput";
import TextArea from "./TextArea";
import Button from "./Button";
import { format } from "date-fns";

interface AttendanceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AttendanceFormData) => void;
  selectedDate: Date;
  staffMember: StaffMember;
  existingAttendance?: AttendanceFormData | null;
  isLoading?: boolean;
}

const AttendanceDialog: React.FC<AttendanceDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  selectedDate,
  staffMember,
  existingAttendance,
  isLoading = false,
}) => {
  const methods = useForm<AttendanceFormData>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      staff_id: staffMember.id,
      attendance_date: selectedDate,
      status: AttendanceStatus.PRESENT,
      reason: "",
    },
  });

  const {
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
  } = methods;
  const watchedStatus = watch("status");

  useEffect(() => {
    if (existingAttendance) {
      reset({
        ...existingAttendance,
        attendance_date: selectedDate,
      });
    } else {
      reset({
        staff_id: staffMember.id,
        attendance_date: selectedDate,
        status: AttendanceStatus.PRESENT,
        reason: "",
      });
    }
  }, [existingAttendance, selectedDate, staffMember.id, reset]);

  const handleFormSubmit = (data: AttendanceFormData) => {
    onSubmit(data);
  };

  const statusOptions = [
    { value: AttendanceStatus.PRESENT, label: "Present" },
    { value: AttendanceStatus.ABSENT, label: "Absent" },
    { value: AttendanceStatus.HALF_DAY, label: "Half Day" },
  ];

  const requiresReason =
    watchedStatus === AttendanceStatus.ABSENT ||
    watchedStatus === AttendanceStatus.HALF_DAY;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-600" />
            <span>Mark Attendance</span>
          </DialogTitle>
          <DialogDescription>
            Mark attendance for {staffMember.first_name} {staffMember.last_name}{" "}
            on {format(selectedDate, "EEEE, MMMM d, yyyy")}
          </DialogDescription>
        </DialogHeader>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4 flex items-center space-x-3">
              <User className="h-8 w-8 text-blue-600 bg-blue-100 rounded-full p-1.5" />
              <div>
                <p className="font-medium text-gray-800">
                  {staffMember.first_name} {staffMember.last_name}
                </p>
                <p className="text-sm text-gray-600">
                  {staffMember.primary_phone}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-800">
                  {format(selectedDate, "EEEE, MMMM d, yyyy")}
                </p>
                <p className="text-sm text-gray-600">Attendance Date</p>
              </div>
            </div>

            <SelectInput
              name="status"
              label="Attendance Status"
              options={statusOptions}
              placeholder="Select attendance status"
              required
              isClearable={false}
            />

            {requiresReason && (
              <TextArea
                name="reason"
                label="Reason"
                placeholder="Please provide a reason for absence or half day..."
                required
                rows={3}
              />
            )}

            <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting || isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting || isLoading}
                isLoading={isSubmitting || isLoading}
              >
                {existingAttendance ? "Update Attendance" : "Mark Attendance"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default AttendanceDialog;
