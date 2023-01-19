"use client";

import { Menu } from "@headlessui/react";
import cx from "clsx";
import { Avatar } from "components/Avatar";
import { DynamicLink } from "components/DynamicLink";
import { useRouter } from "next/navigation";
import { useLogout } from "utils/hooks/useLogout";

const getMenuItemClasses = ({
  itemType,
  isActive,
}: {
  itemType: "button" | "link";
  isActive: boolean;
}) => {
  return cx(
    "block px-4 py-2 text-sm text-grey-700",
    itemType === "button" && "w-full text-left",
    isActive && "bg-grey-100"
  );
};

const ProfileMenu = () => {
  const router = useRouter();
  const logoutMutation = useLogout();
  const onLogout = async () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push("/login");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button
            className="grid h-10 w-10 place-items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            aria-label={open ? "Close profile menu" : "Open profile menu"}
          >
            <Avatar />
          </Menu.Button>
          <Menu.Items className="absolute right-0 z-10 mt-1 min-w-[160px] rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item>
              {({ active, close }) => (
                <DynamicLink
                  href="/profile"
                  className={getMenuItemClasses({
                    itemType: "link",
                    isActive: active,
                  })}
                  onClick={() => {
                    close();
                  }}
                >
                  Your profile
                </DynamicLink>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={getMenuItemClasses({
                    itemType: "button",
                    isActive: active,
                  })}
                  onClick={onLogout}
                >
                  Log out
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </>
      )}
    </Menu>
  );
};

export { ProfileMenu };
