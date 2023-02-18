import { component$, Slot } from "@builder.io/qwik";

type Props = {
  field: string;
};

export const FormItem = component$((props: Props) => {
  return (
    <label class="flex items-baseline">
      <span class="w-32 shrink-0">{props.field}</span>
      <Slot />
    </label>
  );
});
