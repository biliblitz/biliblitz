import type {
  FailReturn,
  RequestEventAction,
  RequestEventLoader,
} from "@builder.io/qwik-city";

/**
 * This is intended to have better error handling
 */
export class ActionResponse extends Error {
  constructor(public status: number, public message: string) {
    super(message);
  }
}

export class NotFoundResponse extends ActionResponse {
  constructor() {
    super(404, "404 Not Found");
  }
}

export class UnauthorizedResponse extends ActionResponse {
  constructor() {
    super(401, "401 Unauthorized");
  }
}

type RedirectCode = 301 | 302 | 303 | 307 | 308;

/**
 * This is intended to have better error handling
 */
export class ActionRedirect extends Error {
  constructor(public status: RedirectCode, public url: string) {
    super(`${status} Redirect`);
  }
}

export function action<D, R>(
  fn: (data: D, request: RequestEventAction) => R | Promise<R>
): (
  data: D,
  request: RequestEventAction
) => Promise<R | FailReturn<{ errorMessage: string }>> {
  return (async (data: D, request: RequestEventAction) => {
    try {
      return await fn(data, request);
    } catch (e) {
      if (e instanceof ActionResponse) {
        return request.fail(e.status, { errorMessage: e.message });
      }
      if (e instanceof ActionRedirect) {
        return request.redirect(e.status, e.url);
      }

      return request.fail(500, {
        errorMessage: "500 Server Error",
        unknownError: e,
      });
    }
  }) as any;
}

export function loader<R>(
  fn: (request: RequestEventLoader) => R
): (request: RequestEventLoader) => R {
  return (async (request: RequestEventLoader) => {
    try {
      return await fn(request);
    } catch (e) {
      if (e instanceof ActionResponse) {
        request.error(e.status, e.message);
      }
      // handle redirect
      else if (e instanceof ActionRedirect) {
        request.redirect(e.status, e.url);
      }
      // leave qwik to handle rest
      else {
        throw e;
      }
    }
  }) as any;
}
