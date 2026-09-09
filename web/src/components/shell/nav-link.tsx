"use client";
import { Suspense, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  match?: string;
};
function ActiveNavLink({
  href,
  children,
  className = "nav-item",
  match,
}: Props) {
  const pathname = usePathname();
  const query = useSearchParams();
  const target = match ?? href.split("?")[0];
  let active =
    target === "/"
      ? pathname === "/"
      : pathname === target || pathname.startsWith(`${target}/`);
  if (target === "/library") {
    active =
      pathname === "/library" &&
      (href.includes("tab=saved")
        ? query.get("tab") === "saved"
        : query.get("tab") !== "saved");
  }
  return (
    <Link
      href={href}
      className={`${className}${active ? " active" : ""}`}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}
export function NavLink(props: Props) {
  return (
    <Suspense
      fallback={
        <Link href={props.href} className={props.className ?? "nav-item"}>
          {props.children}
        </Link>
      }
    >
      <ActiveNavLink {...props} />
    </Suspense>
  );
}
