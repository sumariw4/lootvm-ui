export type ComponentsConfig = {
  $schema?: string;
  tsx: boolean;
  tailwind: {
    css: string;
  };
  aliases: {
    components: string;
    utils: string;
    ui: string;
    blocks?: string;
  };
};

export const DEFAULT_CONFIG: ComponentsConfig = {
  $schema: "https://lootvm.dev/schema.json",
  tsx: true,
  tailwind: {
    css: "src/app/globals.css",
  },
  aliases: {
    components: "@/components",
    utils: "@/lib/utils",
    ui: "@/components/ui",
    blocks: "@/components/blocks",
  },
};

export const CONFIG_FILENAME = "components.json";
