export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "GATE",
  description:
    "UK ticketing for live events and attractions — from intimate jazz clubs to stadium shows.",
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
