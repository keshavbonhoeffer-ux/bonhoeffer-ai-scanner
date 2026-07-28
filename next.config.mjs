/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' https://enterprise-inspiration-3374.lightning.force.com https://enterprise-inspiration-3374.my.salesforce.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;