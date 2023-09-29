import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useWindowWidth } from "@/hooks/useWindowWidth";
import { ReactNode } from "react";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  trigger: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  dialogClassName?: string;
  children: ReactNode;
};

const ModalSheet = ({
  isOpen,
  setIsOpen,
  trigger,
  title,
  description,
  dialogClassName,
  children,
}: Props) => {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth < 640;

  return isMobile ? (
    <div className="sm:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>{trigger}</SheetTrigger>
        <SheetContent
          side="top"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
          }}
        >
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            {description && <SheetDescription>{description}</SheetDescription>}
          </SheetHeader>
          {children}
        </SheetContent>
      </Sheet>
    </div>
  ) : (
    <div className="hidden sm:block">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent
          className={dialogClassName}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export { ModalSheet };