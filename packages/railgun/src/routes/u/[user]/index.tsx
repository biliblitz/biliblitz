import { component$ } from "@builder.io/qwik";
import { useLocation } from "@builder.io/qwik-city";

export default component$(() => {
  const loc = useLocation();
  const user = loc.params.user;

  return <div>User: {user}</div>;
});
