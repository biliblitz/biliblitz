import { component$, useClientEffect$ } from "@builder.io/qwik";
import type {
  DocumentHead} from "@builder.io/qwik-city";
import {
  action$,
  Form,
  Link,
  useNavigate,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { MongoServerError } from "mongodb";
import { userRegister } from "~/utils/db/user";

export const register$ = action$(
  async (data) => {
    try {
      const result = await userRegister(data.username, data.password);

      if (!result.acknowledged) {
        return { success: false as const, reason: "Permission Denied" };
      }

      return {
        success: true as const,
        userId: result.insertedId.toHexString(),
      };
    } catch (e) {
      if (e instanceof MongoServerError && e.code === 11000) {
        return { success: false as const, reason: "Username is Taken" };
      } else {
        throw e;
      }
    }
  },
  zod$({
    username: z.string().min(1),
    password: z.string().min(1),
  })
);

export default component$(() => {
  const register = register$.use();
  const nav = useNavigate();

  useClientEffect$(({ track }) => {
    track(() => register.value?.success);

    if (register.value?.success) {
      nav(`/u/${register.value.userId}`);
    }
  });

  return (
    <section class="space-y-4">
      <h2 class="text-2xl font-bold">Register</h2>

      <Form action={register} class="w-96">
        <label class="block py-2">
          <span>Username</span>
          <input type="text" class="input" name="username" />
        </label>
        <label class="block py-2">
          <span>Password</span>
          <input type="password" class="input" name="password" />
        </label>
        <div class="mt-2 flex justify-between">
          <button class="btn" disabled={register.isRunning}>
            Register
          </button>
          <Link class="btn-ghost btn" href="/login">
            Login
          </Link>
        </div>
      </Form>

      <p class="text-red-500">{register.value?.reason}</p>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Register - Railgun",
};
