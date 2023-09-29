import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useClerk, useUser } from "@clerk/nextjs";
import { UserCircle } from "lucide-react";
import Link from "next/link";

const AccountMenu = () => {
  const { signOut } = useClerk();
  const { user, isSignedIn } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="-mr-2" variant="ghost" size="icon">
          <UserCircle strokeWidth={1.5} className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {isSignedIn && (
          <>
            <DropdownMenuLabel className="space-y-0.5 font-normal">
              <div>You are logged in as:</div>
              <div className="text-xs text-gray-500">
                {user.emailAddresses[0].emailAddress}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await signOut();
              }}
            >
              Logout
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { AccountMenu };
