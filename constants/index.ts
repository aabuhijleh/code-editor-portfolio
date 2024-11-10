import { Tab } from "~/stores/tab-store";

export const FILE_TREE = [
  [
    { name: "components" },
    { name: "About.tsx", href: "/about" },
    { name: "Experience.tsx", href: "/experience" },
    { name: "Projects.tsx", href: "/projects" },
  ],
  [{ name: "public" }, { name: "Profile.png", href: "/profile" }],
  { name: "Contact.md", href: "/contact" },
  { name: "Resume.pdf", href: "/resume" },
];

// Helper function to flatten the file tree and create the pathname mapping
const createPathnameMapping = (tree: any[]): Record<string, Tab> => {
  const mapping: Record<string, Tab> = {};

  const processItem = (item: any) => {
    if (Array.isArray(item)) {
      item.forEach(processItem);
    } else if (item.href) {
      mapping[item.href] = { name: item.name, href: item.href };
    }
  };

  tree.forEach(processItem);
  return mapping;
};

export const PATHNAME_TO_TAB = createPathnameMapping(FILE_TREE);
