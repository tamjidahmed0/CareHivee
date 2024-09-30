import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "নাম কমপক্ষে ২ অক্ষরের হতে হবে")
    .max(50, "নাম সর্বাধিক ৫০ অক্ষরের হতে হবে"),
  email: z.string().email("ইমেইল ভুল"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "ফোন নম্বর ভুল"),
});

export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, "নাম কমপক্ষে ২ অক্ষরের হতে হবে")
    .max(50, "নাম সর্বাধিক ৫০ অক্ষরের হতে হবে"),
  email: z.string().email("ইমেইল ভুল"),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "ফোন নম্বর ভুল"),
  birthDate: z.coerce.date(),
  gender: z.enum(["পুরুষ", "মহিলা", "অন্যান্য"]),
  address: z
    .string()
    .min(5, "ঠিকানা কমপক্ষে ৫ অক্ষরের হতে হবে")
    .max(500, "ঠিকানা সর্বাধিক ৫০০ অক্ষরের হতে হবে"),
  occupation: z
    .string()
    .min(2, "পেশা কমপক্ষে ২ অক্ষরের হতে হবে")
    .max(500, "পেশা সর্বাধিক ৫০০ অক্ষরের হতে হবে"),
  emergencyContactName: z
    .string()
    .min(2, "জরুরি যোগাযোগের নাম কমপক্ষে ২ অক্ষরের হতে হবে")
    .max(50, "জরুরি যোগাযোগের নাম সর্বাধিক ৫০ অক্ষরের হতে হবে"),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      "ফোন নম্বর ভুল"
    ),
  primaryPhysician: z.string().min(2, "অন্তত একজন ডাক্তার নির্বাচন করুন"),
  insuranceProvider: z
    .string()
    .min(2, "বীমা প্রদানকারীর নাম কমপক্ষে ২ অক্ষরের হতে হবে")
    .max(50, "বীমা প্রদানকারীর নাম সর্বাধিক ৫০ অক্ষরের হতে হবে"),
  insurancePolicyNumber: z
    .string()
    .min(2, "নীতির নম্বর কমপক্ষে ২ অক্ষরের হতে হবে")
    .max(50, "নীতির নম্বর সর্বাধিক ৫০ অক্ষরের হতে হবে"),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "চিকিৎসার সম্মতি না দিলে আপনি এগোতে পারবেন না",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "তথ্য প্রকাশের সম্মতি না দিলে আপনি এগোতে পারবেন না",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "গোপনীয়তার সম্মতি না দিলে আপনি এগোতে পারবেন না",
    }),
});

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "অন্তত একজন ডাক্তার নির্বাচন করুন"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "কারণ কমপক্ষে ২ অক্ষরের হতে হবে")
    .max(500, "কারণ সর্বাধিক ৫০০ অক্ষরের হতে হবে"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "অন্তত একজন ডাক্তার নির্বাচন করুন"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, "অন্তত একজন ডাক্তার নির্বাচন করুন"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, "কারণ কমপক্ষে ২ অক্ষরের হতে হবে")
    .max(500, "কারণ সর্বাধিক ৫০০ অক্ষরের হতে হবে"),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
