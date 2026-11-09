"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { PublishedContent, getPublishedContent } from "@/lib/cms";
import {
  ThemeProvider,
  useTheme,
  Navbar,
  WorkSection,
  Footer,
} from "@/app/components/NexusForgeOrchestrator";

function WorkPageContent({ initialItems = [] }: { initialItems?: PublishedContent[] }) {
  const { tk } = useTheme();
  const [items, setItems] = useState<PublishedContent[]>(initialItems);

  useEffect(() => {
    // Live client-side fetch: visible in the browser DevTools Network tab
    getPublishedContent(["case_study", "portfolio"])
      .then((data) => {
        if (data && data.length > 0) {
          setItems(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <motion.div
      animate={{ backgroundColor: tk.BG }}
      transition={{ duration: 0.35 }}
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />
      <main style={{ flex: 1, paddingTop: 64 }}>
        <WorkSection items={items} />
      </main>
      <Footer />
    </motion.div>
  );
}

export default function WorkClient({ items = [] }: { items?: PublishedContent[] }) {
  return (
    <ThemeProvider>
      <WorkPageContent initialItems={items} />
    </ThemeProvider>
  );
}
