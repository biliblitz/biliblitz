import { component$, Slot } from "@builder.io/qwik";
import type { LinkProps } from "@builder.io/qwik-city";
import { Link, useLocation } from "@builder.io/qwik-city";

type Props = Omit<LinkProps, "class"> & { class?: string };

export const NavLink = component$((props: Props) => {
  const loc = useLocation();

  const active =
    typeof props.href === "string" && loc.pathname.startsWith(props.href);

  return (
    <Link {...props} class={[props.class, { active }]}>
      <Slot />
    </Link>
  );
});
