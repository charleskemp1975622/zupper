"use client";

import { LensLogin } from "@/ui/layout/lens-login";

export default function Home() {
  return (
    <div className="mt-36 grid justify-center gap-48 text-center">
      <div className="text-center">
        <div className="text-5xl">🤤</div>
        <div className="text-4xl font-semibold">Zupper</div>
      </div>
      <div className="grid gap-5">
        <div className="pt-3">
          <div className="btn-secondary w-32 btn whitespace-nowrap normal-case text-lg">
            Customer
          </div>
          <div className="mt-3">
            <LensLogin />
          </div>
        </div>
      </div>
    </div>
  );
}
