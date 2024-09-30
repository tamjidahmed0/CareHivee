"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SelectItem } from "@/components/ui/select";
import { Doctors } from "@/constants";
import {
  createAppointment,
  updateAppointment,
} from "@/lib/actions/appointment.actions";
import { getAppointmentSchema } from "@/lib/validation";
import { Appointment } from "@/types/appwrite.types";

import "react-datepicker/dist/react-datepicker.css";

import CustomFormField, { FormFieldType } from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { Form } from "../ui/form";

export const AppointmentForm = ({
  userId,
  patientId,
  type = "তৈরি",
  appointment,
  setOpen,
}: {
  userId: string;
  patientId: string;
  type: "তৈরি" | "নির্ধারন" | "বিলুপ্ত";
  appointment?: Appointment;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment?.primaryPhysician : "",
      schedule: appointment
        ? new Date(appointment?.schedule!)
        : new Date(Date.now()),
      reason: appointment ? appointment.reason : "",
      note: appointment?.note || "",
      cancellationReason: appointment?.cancellationReason || "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ) => {
    setIsLoading(true);

    let status;
    switch (type) {
      case "নির্ধারন":
        status = "নির্ধারন";
        break;
      case "বিলুপ্ত":
        status = "বিলুপ্ত";
        break;
      default:
        status = "অপেক্ষারত";
    }

    // console.log(status, 'status')

    try {
      if (type === "তৈরি" && patientId) {
        const appointment = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          status: status as Status,
          note: values.note,
        };

        const newAppointment = await createAppointment(appointment);

        if (newAppointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
          );
        }
      } else {
        const appointmentToUpdate = {
          userId,
          appointmentId: appointment?.$id!,
          appointment: {
            primaryPhysician: values.primaryPhysician,
            schedule: new Date(values.schedule),
            status: status as Status,
            cancellationReason: values.cancellationReason,
          },
          type,
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Automatically fetch the user's time zone
        };

        const updatedAppointment = await updateAppointment(appointmentToUpdate);

        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  let buttonLabel;
 
  switch (type) {
    case "বিলুপ্ত":
      buttonLabel = "অ্যাপয়েন্টমেন্ট বাতিল করুন";
      break;
    case "নির্ধারন":
      buttonLabel = "অ্যাপয়েন্টমেন্ট নির্ধারণ করুন";
      break;
    default:
      buttonLabel = "অ্যাপয়েন্টমেন্ট জমা দিন";
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        {type === "তৈরি" && (
          <section className="mb-12 space-y-4">
            <h1 className="header">নতুন অ্যাপয়েন্টমেন্ট</h1>
            <p className="text-dark-700">
            অ্যাপয়েন্টমেন্টের জন্য অনুরধ করুন
            </p>
          </section>
        )}

        {type !== "বিলুপ্ত" && (
          <>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="ডাক্তার"
              placeholder="একটি ডাক্তার নির্বাচন করুন"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="প্রত্যাশিত অ্যাপয়েন্টমেন্ট তারিখ"
              showTimeSelect
              dateFormat="MM/dd/yyyy  -  h:mm aa"
            />

            <div
              className={`flex flex-col gap-6  ${type === "তৈরি" && "xl:flex-row"}`}
            >
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="অ্যাপয়েন্টমেন্ট কারণ"
                placeholder="বার্ষিক মাসিক চেক-আপ"
                disabled={type === "নির্ধারন"}
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="মন্তব্য"
                placeholder="সম্ভব হলে বিকেলের অ্যাপয়েন্টমেন্ট করুন"
                disabled={type === "নির্ধারন"}
              />
            </div>
          </>
        )}

        {type === "বিলুপ্ত" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="বাতিল করার কারণ"
            placeholder="জরুরি মীটিং এর কারণে"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${type === "বিলুপ্ত" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};
