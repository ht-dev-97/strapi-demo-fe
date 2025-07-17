import { ReactNode } from "react";

import buildProvidersTree from "./build-provider-tree";
import { ThemeProvider } from "./theme-provider";
import { SWRProvider } from "./swr-provider";

interface ProvidersWrapperProps {
  children: ReactNode;
}

export function ProvidersWrapper({ children }: ProvidersWrapperProps) {
  const ProvidersTree = buildProvidersTree([[SWRProvider], [ThemeProvider]]);

  return <ProvidersTree>{children}</ProvidersTree>;
}
