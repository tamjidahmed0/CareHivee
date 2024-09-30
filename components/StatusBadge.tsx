import clsx from "clsx";
import Image from "next/image";

import { StatusIcon } from "@/constants";

type Status = "নির্ধারন" | "অপেক্ষারত" | "বিলুপ্ত";

export const StatusBadge = ({ status }: { status: Status }) => {
  
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-600": status === "নির্ধারন",
        "bg-blue-600": status === "অপেক্ষারত",
        "bg-red-600": status === "বিলুপ্ত",
      })}
    >
      <Image
        src={StatusIcon[status]}
        alt="doctor"
        width={24}
        height={24}
        className="h-fit w-3"
      />
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-green-500": status === "নির্ধারন",
          "text-blue-500": status === "অপেক্ষারত",
          "text-red-500": status === "বিলুপ্ত",
        })}
      >
        {status}
      </p>
    </div>
  );
};
