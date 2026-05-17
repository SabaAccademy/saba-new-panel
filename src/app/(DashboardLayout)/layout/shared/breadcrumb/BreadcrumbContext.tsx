"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface BreadcrumbItem {
  title: string;
  to?: string;
}

interface BreadcrumbState {
  title: string;
  items: BreadcrumbItem[];
}

interface BreadcrumbCtx {
  breadcrumb: BreadcrumbState | null;
  setBreadcrumb: (state: BreadcrumbState) => void;
}

const BreadcrumbContext = createContext<BreadcrumbCtx>({
  breadcrumb: null,
  setBreadcrumb: () => {},
});

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [breadcrumb, setBreadcrumb] = useState<BreadcrumbState | null>(null);

  return (
    <BreadcrumbContext.Provider value={{ breadcrumb, setBreadcrumb }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  return useContext(BreadcrumbContext);
}

/**
 * Drop this anywhere in a page to declare its breadcrumb.
 * Renders nothing — only updates the layout's context.
 */
export function SetBreadcrumb({
  title,
  items,
}: {
  title: string;
  items: BreadcrumbItem[];
}) {
  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    setBreadcrumb({ title, items });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);
  return null;
}
