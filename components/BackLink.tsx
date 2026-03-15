"use client";

import { useRouter } from "next/navigation";

export default function BackLink({
  fallbackHref,
  label,
}: {
  fallbackHref: string;
  label: string;
}) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push(fallbackHref);
        }
      }}
      className="inline-flex items-center gap-1 text-sm text-ocean-600 hover:text-ocean-800 mb-6 cursor-pointer"
    >
      ← {label}
    </button>
  );
}
