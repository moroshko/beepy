import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import cx from "clsx";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navItems } from "./utils";

const MenuButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="data-[state=closed]:duration-200 data-[state=open]:duration-200"
        side="left"
      >
        <SheetHeader>
          <SheetTitle className="text-left">Beepy</SheetTitle>
        </SheetHeader>
        <ul className="flex flex-col gap-4 text-base">
          {navItems.map(({ text, href }) => {
            const isActive = href === pathname;

            return (
              <Link
                className={cx("hover:underline", !isActive && "text-gray-500")}
                href={href}
                onClick={() => {
                  setIsOpen(false);
                }}
                key={text}
              >
                {text}
              </Link>
            );
          })}
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export { MenuButton };
