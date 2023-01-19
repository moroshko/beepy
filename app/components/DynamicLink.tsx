"use client";

import { useRouter } from "next/navigation";
import { forwardRef, ReactNode, Ref } from "react";

type Props = {
  href: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

// We shouldn't need this component. It's just a workaround for this issue:
//   https://github.com/vercel/next.js/issues/42991#issuecomment-1367466954
const DynamicLinkComponent = (props: Props, ref: Ref<HTMLAnchorElement>) => {
  const { href, className, onClick, children } = props;
  const router = useRouter();

  return (
    <a
      href={href}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
        router.push(href);
      }}
      ref={ref}
    >
      {children}
    </a>
  );
};

const DynamicLink = forwardRef(DynamicLinkComponent);

export { DynamicLink };
