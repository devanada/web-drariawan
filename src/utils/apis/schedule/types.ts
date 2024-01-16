import * as z from 'zod';

export const scheduleSchema = z.object({
  user_id: z.string().min(1, { message: 'Dokter wajib diisi' }),
  health_care_address: z
    .string()
    .min(1, { message: 'Alamat praktek wajib diisi' }),
  day: z.string().min(1, { message: 'Hari wajib diisi' }),
  time_start: z.string().min(1, { message: 'Waktu mulai wajib diisi' }),
  time_end: z.string().min(1, { message: 'Waktu selesai wajib diisi' }),
});

export type ScheduleSchema = z.infer<typeof scheduleSchema>;

export interface IBookPayload {
  patient_id: string;
  schedule_id: number;
  booking_date: string;
}

export interface ISchedule {
  booking: any[];
  day: string;
  health_care_address: string;
  schedule_id: number;
  time_start: string;
  time_end: string;
  user_id: number;
  user: {
    email: string;
    name: string;
    phone: string;
    picture: string;
    specialization: string;
    user_id: number;
  };
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface IMySchedule {
  booking_code: string;
  booking_date: string;
  id: string;
  patient: {
    email: string;
    name: string;
    patient_id: string;
  };
  patient_id: string;
  schedule: {
    day: string;
    health_care_address: string;
    schedule_id: number;
    time_start: string;
    time_end: string;
    user: {
      id: number;
      name: string;
      picture: string;
      specialization: string;
    };
    user_id: number;
  };
  schedule_id: string;
  state: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
