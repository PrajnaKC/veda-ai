"use client";

import { useEffect, useState } from "react";

type AssignmentsResponse = {
  data: Array<unknown>;
};

export function useAssignmentCount() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadCount() {
      try {
        const response = await fetch("/api/assignments", { signal: controller.signal, cache: "no-store" });
        const result = (await response.json()) as AssignmentsResponse & { error?: string };

        if (!response.ok) {
          throw new Error(result.error || "Failed to load assignments");
        }

        setCount(Array.isArray(result.data) ? result.data.length : 0);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setCount(0);
        }
      }
    }

    void loadCount();

    return () => controller.abort();
  }, []);

  return { count };
}