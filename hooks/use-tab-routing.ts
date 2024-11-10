import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { PATHNAME_TO_TAB } from "~/constants";
import { useTabStore } from "~/stores/tab-store-provider";

export function useTabRouting() {
  const pathname = usePathname();
  const router = useRouter();
  const store = useTabStore((state) => state);
  const { activeTab, addTab } = store ?? {};

  // if current route is not in tabs, add it
  useEffect(() => {
    const tab = PATHNAME_TO_TAB[pathname];
    if (tab) {
      addTab?.(tab);
    }
  }, [pathname, addTab]);

  // navigate to active tab
  useEffect(() => {
    if (activeTab) {
      router.push(activeTab.href);
    } else {
      router.push("/");
    }
  }, [activeTab, router]);
}
