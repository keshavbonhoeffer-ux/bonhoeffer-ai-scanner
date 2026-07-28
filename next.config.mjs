/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              frame-ancestors
              'self'
              https://*.lightning.force.com
              https://*.my.salesforce.com
              https://*.visualforce.com
              https://*.vf.force.com
              https://*.salesforce.com;
            `.replace(/\s+/g, " ").trim(),
          },
        ],
      },
    ];
  },
};

export default nextConfig;