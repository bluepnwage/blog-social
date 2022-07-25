import Link from "next/link";
import { NavLink } from "@mantine/core";
import { useRouter } from "next/router";
import { FilePlus, Home, User } from "tabler-icons-react";

export function NavLinks() {
  const router = useRouter();
  const path = router.asPath;

  const links = [
    {
      label: "Home",
      href: "/dashboard/bluepnwage",
      description: "View stats for your account",
      icon: <Home />
    },
    {
      label: "Editor",
      href: "/dashboard/bluepnwage/editor",
      description: "Manage your blogs",
      icon: <FilePlus />
    },
    {
      label: "Profile",
      href: "/dashboard/bluepnwage/profile",
      description: "Update your profile",
      icon: <User />
    }
  ];
  return (
    <>
      {links.map((link) => {
        const active = link.href === path;

        return (
          <Link href={link.href} key={link.label} passHref>
            <NavLink icon={link.icon} description={link.description} active={active} label={link.label} component="a" />
          </Link>
        );
      })}
    </>
  );
}
