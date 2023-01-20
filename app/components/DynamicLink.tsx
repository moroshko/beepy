"use client";

import { useRouter } from "next/navigation";
import { forwardRef, ReactNode, Ref } from "react";

/*
  Note: The Menu component from HeadlessUI will pass more props than specified here.
  I'm not bothering typing ALL the props this component gets since  this component 
  is a workaround anyway!
*/
type Props = {
  href: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

// We shouldn't need this component. It's just a workaround for this issue:
//   https://github.com/vercel/next.js/issues/42991#issuecomment-1367466954
const DynamicLinkComponent = (props: Props, ref: Ref<HTMLAnchorElement>) => {
  const { href, onClick, ...restProps } = props;
  const router = useRouter();

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
        router.push(href);
      }}
      {...restProps}
      ref={ref}
    />
  );
};

const DynamicLink = forwardRef(DynamicLinkComponent);

export { DynamicLink };
