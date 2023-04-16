import type { InsertOneResult, ModifyResult, UpdateResult } from "mongodb";
import { ObjectId } from "mongodb";
import { ActionResponse, NotFoundResponse, UnauthorizedResponse } from "./qwik";

export function assertAcknowledged<T>(
  result: InsertOneResult<T> | UpdateResult,
  errorMsg: string = "Database Operation not Acknowledged",
  status: number = 500
) {
  if (!result.acknowledged) {
    throw new ActionResponse(status, errorMsg);
  }
}

export function assertModifyOk<T>(
  result: ModifyResult<T>,
  errorMsg: string = "Database Operation not Ok",
  status: number = 500
) {
  if (!result.ok) {
    throw new ActionResponse(status, errorMsg);
  }
}

export function assertNotNull<T>(
  result: T | null,
  errorMsg: string = "Value should not be null",
  status: number = 400
): asserts result is T {
  if (result === null) {
    throw new ActionResponse(status, errorMsg);
  }
}

export function assertFound<T>(result: T | null): asserts result is T {
  if (result === null) {
    throw new NotFoundResponse();
  }
}

export function assertAuthorized<T>(result: T | null): asserts result is T {
  if (result === null) {
    throw new UnauthorizedResponse();
  }
}

export function assertNull<T>(
  result: T | null,
  errorMsg: string = "Value should be null",
  status: number = 400
): asserts result is null {
  if (result !== null) {
    throw new ActionResponse(status, errorMsg);
  }
}

export function assertObjectId(param: string | null): asserts param is string {
  if (!(param?.length === 24 && ObjectId.isValid(param))) {
    throw new NotFoundResponse();
  }
}
