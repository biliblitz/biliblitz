import type { QwikIntrinsicElements} from "@builder.io/qwik";
import { component$, Slot } from "@builder.io/qwik";
import { IconXMark } from "@railgun/heroicons";

type Props = {
  id: string;
  closable?: boolean;
} & Pick<QwikIntrinsicElements["input"], "ref">;

export const Modal = component$(({ id, closable, ...props }: Props) => {
  return (
    <>
      <input type="checkbox" id={id} hidden {...props} />
      <div class="modal not-prose">
        {closable !== false ? (
          <label class="modal-background" for={id}></label>
        ) : (
          <div class="modal-background"></div>
        )}
        <div class="modal-content w-[32rem]">
          {closable !== false && (
            <label
              class="absolute right-4 top-4 h-4 w-4 cursor-pointer rounded-md opacity-80 transition hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
              tabIndex={0}
              for={id}
            >
              <IconXMark class="h-4 w-4" />
            </label>
          )}
          <Slot />
        </div>
      </div>
    </>
  );
});
