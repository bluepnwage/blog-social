import Link from "next/link";
import { NavLink } from "@mantine/core";
import { useRouter } from "next/router";
import { FilePlus, Home, User, Heart } from "tabler-icons-react";

export function NavLinks() {
  const router = useRouter();
  const path = router.asPath;

  const links = [
    {
      label: "Home",
      href: "/dashboard",
      description: "View stats for your account",
      icon: <Home />
    },
    {
      label: "Editor",
      href: "/dashboard/editor",
      description: "Manage your blogs",
      icon: <FilePlus />
    },
    {
      label: "Profile",
      href: "/dashboard/profile",
      description: "Update your profile",
      icon: <User />
    },
    {
      label: "Likes",
      href: "/dashboard/likes",
      description: "View your past likes",
      icon: <Heart />
    }
  ];
  return (
    <>
      {links.map((link) => {
        const editorRoute = "/dashboard/editor";
        const editorActive = path.includes(editorRoute) && link.href === editorRoute;

        const active = link.href === path || editorActive;

        return (
          <Link href={link.href} key={link.label} passHref>
            <NavLink icon={link.icon} description={link.description} active={active} label={link.label} component="a" />
          </Link>
        );
      })}
    </>
  );
}
