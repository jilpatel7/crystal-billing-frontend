import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarDays, User } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './shad-cn/dialog';
import { LeaveRequestFormData, leaveRequestSchema } from '../../features/staff/validation-schema/attendanceSchema';
import { AttendanceStatus, StaffMember } from '../../features/staff/types';
import SelectInput from './SelectInput';
import TextArea from './TextArea';
import DateTimeInput from './DateTimeInput';
import Button from './Button';

interface LeaveRequestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: LeaveRequestFormData) => void;
  staffMember: StaffMember;
  isLoading?: boolean;
}

const LeaveRequestDialog: React.FC<LeaveRequestDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  staffMember,
  isLoading = false,
}) => {
  const methods = useForm<LeaveRequestFormData>({
    resolver: zodResolver(leaveRequestSchema),
    defaultValues: {
      staff_id: staffMember.id,
      start_date: new Date(),
      end_date: new Date(),
      status: AttendanceStatus.ABSENT,
      reason: '',
    },
  });

  const { handleSubmit, reset, formState: { isSubmitting } } = methods;

  useEffect(() => {
    if (isOpen) {
      reset({
        staff_id: staffMember.id,
        start_date: new Date(),
        end_date: new Date(),
        status: AttendanceStatus.ABSENT,
        reason: '',
      });
    }
  }, [isOpen, staffMember.id, reset]);

  const handleFormSubmit = (data: LeaveRequestFormData) => {
    onSubmit(data);
  };

  const leaveTypeOptions = [
    { value: AttendanceStatus.ABSENT, label: 'Full Day Leave' },
    { value: AttendanceStatus.HALF_DAY, label: 'Half Day Leave' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <CalendarDays className="h-5 w-5 text-blue-600" />
            <span>Request Leave</span>
          </DialogTitle>
          <DialogDescription>
            Submit a leave request for {staffMember.first_name} {staffMember.last_name}
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
                <p className="text-sm text-gray-600">{staffMember.primary_phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DateTimeInput
                name="start_date"
                label="Start Date"
                required
                isClearable={false}
              />
              <DateTimeInput
                name="end_date"
                label="End Date"
                required
                isClearable={false}
              />
            </div>

            <SelectInput
              name="status"
              label="Leave Type"
              options={leaveTypeOptions}
              placeholder="Select leave type"
              required
              isClearable={false}
            />

            <TextArea
              name="reason"
              label="Reason for Leave"
              placeholder="Please provide a detailed reason for the leave request..."
              required
              rows={4}
            />

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
                Submit Leave Request
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveRequestDialog;