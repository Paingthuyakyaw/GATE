export type SiteConfig = typeof siteConfig;

const vercelUrl = "https://gate-seven-chi.vercel.app/"

export const siteConfig = {
  name: "GATE",
  description:
    "GATE is ticketing for live events and attractions — from intimate jazz clubs to stadium shows.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? vercelUrl ?? "http://localhost:3000",
  ogImage:
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&h=630&fit=crop&auto=format",
  keywords: [
    "GATE",
    "Event tickets",
    "Tickets",
    "GATE tickets",
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
    github: "https://github.com/Paingthuyakyaw/GATE.git",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
