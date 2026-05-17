"use client";

import React from "react";
import { RavenFormProvider, type RavenFormProviderProps } from "raven-form-engine";
import { DevToolsProvider } from "./DevToolsContext";
import { DevToolsPanel } from "./DevToolsPanel";

export interface RavenDevToolsProviderProps
  extends Omit<RavenFormProviderProps, "children"> {
  /**
   * Show the floating DevTools button and slide-in inspector panel.
   * Recommended: only enable in development.
   * @default false
   */
  devTools?: boolean;
  children: React.ReactNode;
}

/**
 * Drop-in replacement for <RavenFormProvider>.
 * Adds an optional `devTools` prop that mounts the floating DevTools panel.
 *
 * Usage in layout.tsx:
 *   <RavenDevToolsProvider
 *     uiAdapter={RavenShadcnUIAdapter}
 *     formAdapter={RavenRHFAdapter}
 *     devTools={process.env.NODE_ENV === "development"}
 *   >
 *     {children}
 *   </RavenDevToolsProvider>
 */
export function RavenDevToolsProvider({
  devTools = false,
  children,
  ...ravenProps
}: RavenDevToolsProviderProps) {
  return (
    <DevToolsProvider enabled={devTools}>
      <RavenFormProvider {...ravenProps}>
        {children}
        {devTools && <DevToolsPanel />}
      </RavenFormProvider>
    </DevToolsProvider>
  );
}
