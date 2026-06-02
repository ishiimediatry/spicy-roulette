import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "スパイシールーレット",
    short_name: "激辛",
    description: "冷蔵庫の中身から激辛献立を決めるルーレットアプリ",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f1e7",
    theme_color: "#ff6b00",
    icons: [
      {
        src: "/apple-icon.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}