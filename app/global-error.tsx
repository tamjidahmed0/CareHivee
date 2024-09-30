"use client";

import NextError from "next/error";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <div>
      <h1>An error occurred</h1>
      <p>{error.message}</p> {/* Display the error message */}
      <NextError statusCode={0} />
    </div>
  );
}
