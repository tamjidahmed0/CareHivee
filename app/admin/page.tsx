import Image from "next/image";
import Link from "next/link";
import '@/app/globals.css'

import { StatCard } from "@/components/StatCard";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/DataTable";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";

const AdminPage = async () => {
  const appointments = await getRecentAppointmentList();
  // console.log(appointments, 'appointments,,,')

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/icons/logo-full.png"
            height={32}
            width={162}
            alt="logo"
            className="h-8 w-fit"
          />
        </Link>

        <p className="text-16-semibold">অ্যাডমিন ড্যাশবোর্ড</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">স্বাগতম </h1>
          <p className="text-dark-700">
          নতুন অ্যাপয়েন্টমেন্ট পরিচালনা করুন
          </p>
        </section>

        <section className="admin-stat">
          <StatCard
            type="নির্ধারন"
            count={appointments.scheduledCount}
            label="নির্ধারন অ্যাপয়েন্টমেন্ট"
            icon={"/assets/icons/appointments.svg"}
          />
          <StatCard
            type="অপেক্ষারত"
            count={appointments.pendingCount}
            label="অপেক্ষারত অ্যাপয়েন্টমেন্ট"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="বিলুপ্ত"
            count={appointments.cancelledCount}
            label="বাতিল করা অ্যাপয়েন্টমেন্ট"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>

        <DataTable columns={columns} data={appointments.documents} />
      </main>
    </div>
  );
};

export default AdminPage;
