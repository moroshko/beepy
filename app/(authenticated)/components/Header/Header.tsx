"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AccountMenu } from "./AccountMenu";
import { MenuButton } from "./MenuButton";
import { navItems } from "./utils";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 flex h-[--header-height] items-center border-b bg-white">
      <div className="mx-auto flex w-[640px] items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="block sm:hidden">
            <MenuButton />
          </div>
          <div className="font-semibold">Beepy</div>
          <NavigationMenu className="hidden sm:block">
            <NavigationMenuList>
              {navItems.map(({ text, href }) => (
                <NavigationMenuItem key={text}>
                  <Link href={href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      active={href === pathname}
                    >
                      {text}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <AccountMenu />
      </div>
    </header>
  );
};

export { Header };
