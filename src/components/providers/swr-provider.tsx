"use client";

import { globalSWRConfig } from "@/configs";
import { ReactNode } from "react";
import { SWRConfig } from "swr";

interface SWRProviderProps {
  children: ReactNode;
}

export function SWRProvider({ children }: SWRProviderProps) {
  return <SWRConfig value={globalSWRConfig}>{children}</SWRConfig>;
}
