import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All site art is <=1536px wide. Requests for larger variants trip an
    // image-optimizer hang (webp/avif at widths beyond the source never
    // return; reproduced on 16.2.6 and 16.2.10), and upscaling is useless
    // anyway - so the size ladder stops at the largest real source width.
    deviceSizes: [360, 640, 768, 1080, 1280, 1536],
    imageSizes: [64, 128, 256, 384],
  },
};

export default nextConfig;
