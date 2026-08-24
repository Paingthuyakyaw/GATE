export type SiteConfig = typeof siteConfig;

const vercelUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : undefined;

export const siteConfig = {
  name: "GATE",
  description:
    "UK ticketing for live events and attractions — from intimate jazz clubs to stadium shows.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? vercelUrl ?? "http://localhost:3000",
  ogImage:
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=630&fit=crop&auto=format",
  keywords: [
    "GATE",
    "UK tickets",
    "event tickets",
    "concert tickets",
    "theatre tickets",
    "attraction tickets",
    "London events",
    "Manchester events",
    "theme parks",
    "live music",
  ],
  creator: "Paing Thura Kyaw",
  category: "Ticketing",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Events",
      href: "/events",
    },
    {
      label: "Attractions",
      href: "/attractions",
    },
  ],
  navMenuItems: [
    {
      label: "Events",
      href: "/events",
    },
    {
      label: "Attractions",
      href: "/attractions",
    },
    {
      label: "Promotions",
      href: "/",
    },
    {
      label: "Explore",
      href: "/",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
