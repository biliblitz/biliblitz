import { component$, Slot } from "@builder.io/qwik";

type Props = {
  field: string;
  required?: boolean;
};

export const FormItem = component$((props: Props) => {
  return (
    <label class="flex items-baseline">
      <span class="w-32 shrink-0 [.modal_&]:w-16">
        {props.field}
        {props.required && <span class="text-red-500"> *</span>}
      </span>
      <Slot />
    </label>
  );
});
