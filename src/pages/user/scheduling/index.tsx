import { SelectSingleEventHandler } from 'react-day-picker';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import DatePicker from '@/components/datepicker';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout';

import { getSchedules, postBookSchedule } from '@/utils/apis/schedule/api';
import { ISchedule } from '@/utils/apis/schedule/types';
import { getMyProfile } from '@/utils/apis/auth/api';
import { MyProfile } from '@/utils/apis/auth/types';
import { DAYS_OF_WEEK } from '@/utils/constants';

const Scheduling = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [reserve, setReserve] = useState<ISchedule[]>([]);
  const [patient, setPatient] = useState<MyProfile>();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedSchedule, setSelectedSchedule] = useState<ISchedule>();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getBookedSchedule();
    getProfile();
  }, []);

  const getBookedSchedule = async () => {
    try {
      const result = await getSchedules();
      setReserve(result.data);
    } catch (error) {
      toast({
        title: 'Oops! Sesuatu telah terjadi',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  const handleBooking = async (schedule: ISchedule) => {
    try {
      const body = {
        patient_id: patient!.id,
        schedule_id: schedule.schedule_id,
        booking_date: format(selectedDate!, 'yyyy-MM-dd'),
      };

      await postBookSchedule(body);

      setIsOpen(false);
      toast({
        description: 'Sukses booking jadwal praktek',
      });
      navigate('/scheduling/success', {
        state: {
          from: 'scheduling',
        },
      });
    } catch (error) {
      toast({
        title: 'Oops! Sesuatu telah terjadi',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  const getProfile = async () => {
    try {
      const result = await getMyProfile();
      setPatient(result.data);
    } catch (error) {
      toast({
        title: 'Oops! Sesuatu telah terjadi',
        description: (error as Error).message,
        variant: 'destructive',
      });
    }
  };

  const getDoctorScheduleForDay = (day: string) => {
    return reserve.filter((schedule) => schedule.day === day);
  };

  function handleSelectSchedule(schedule: ISchedule) {
    setSelectedSchedule(schedule);
    setIsOpen(true);
  }

  return (
    <Layout className="p-4">
      <div className="text-center flex flex-col space-y-4">
        <p className="font-semibold text-2xl">Pilih Jadwal Praktik Dokter</p>
        <p className="font-semibold text-sm">
          *Pasien hanya dapat memilih rentang tanggal selama 1 minggu untuk
          melakukan pendaftaran
        </p>
      </div>
      <div
        data-testid="schedule-board"
        className="w-full grid grid-flow-col gap-4 my-10 overflow-x-auto"
      >
        {DAYS_OF_WEEK.map((day) => (
          <div
            data-testid={`column-${day}`}
            key={day}
            className="text-center col-span-12"
          >
            <p className="font-semibold mb-2">{day}</p>
            {getDoctorScheduleForDay(day).map((doctorSchedule) => {
              return (
                <div
                  data-testid="schedule-data"
                  key={doctorSchedule.schedule_id}
                  className="border rounded-md cursor-pointer mb-4 text-left px-5 py-3 bg-white"
                  onClick={() => handleSelectSchedule(doctorSchedule)}
                >
                  <div className="text-md font-semibold">
                    {doctorSchedule.user.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {doctorSchedule.time_start} - {doctorSchedule.time_end}
                  </div>
                  <div className="mt-2 text-sm">
                    {doctorSchedule.health_care_address}
                  </div>
                </div>
              );
            })}
            {!getDoctorScheduleForDay(day).length && (
              <div className="flex items-center justify-center h-20 cursor-not-allowed">
                Tidak ada jadwal dokter yang tersedia untuk hari ini.
              </div>
            )}
          </div>
        ))}
      </div>
      <ScheduleModal
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        schedule={selectedSchedule}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        handleBooking={handleBooking}
      />
    </Layout>
  );
};

interface Props {
  isOpen: boolean;
  schedule?: ISchedule;
  selectedDate?: Date;
  handleBooking: (schedule: ISchedule) => void;
  onSelectDate?: SelectSingleEventHandler;
  onOpenChange?: (open: boolean) => void;
}

const ScheduleModal = (props: Props) => {
  const {
    isOpen,
    schedule,
    selectedDate,
    onSelectDate,
    handleBooking,
    onOpenChange,
  } = props;

  if (!schedule) return;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Jadwal</DialogTitle>
          <DialogDescription>
            Silahkan pilih rentang tanggal untuk konsultasi atau berobat
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col my-10 gap-y-5 px-4">
            <div className="flex gap-x-40">
              <p className="w-1/3">Nama Dokter</p>
              <p className="w-2/3">{schedule.user.name}</p>
            </div>
            <div className="flex gap-x-40">
              <p className="w-1/3">Spesialis</p>
              <p className="w-2/3">
                {schedule.user.specialization
                  ? schedule.user.specialization
                  : 'N/A'}
              </p>
            </div>
            <div className="flex gap-x-40">
              <p className="w-1/3">Alamat Praktik</p>
              <p className="w-2/3">{schedule.health_care_address}</p>
            </div>
            <div className="flex gap-x-40">
              <p className="w-1/3">Hari Periksa</p>
              <p className="w-2/3">{schedule.day}</p>
            </div>
            <div className="flex gap-x-40">
              <p className="w-1/3">Jam Periksa</p>
              <p className="w-2/3">
                {schedule.time_start} - {schedule.time_end}
              </p>
            </div>
            <div className="flex gap-x-40">
              <p className="w-1/3">Tanggal yang Dipilih</p>
              <div className="w-2/3">
                <DatePicker
                  selectedDate={selectedDate}
                  onSelectDate={onSelectDate}
                  placeholder="Pilih tanggal"
                  disabled={[
                    { before: new Date() },
                    {
                      dayOfWeek: DAYS_OF_WEEK.map((e, i) =>
                        e !== schedule.day ? i : -1
                      ).filter((i) => i !== -1),
                    },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            data-testid="btn-submit"
            type="button"
            disabled={!selectedDate}
            onClick={() => handleBooking(schedule)}
          >
            Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Scheduling;
