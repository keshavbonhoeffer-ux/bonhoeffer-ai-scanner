/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://*.lightning.force.com https://*.my.salesforce.com https://*.salesforce.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;