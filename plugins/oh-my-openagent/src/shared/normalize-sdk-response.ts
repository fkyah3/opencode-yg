export interface NormalizeSDKResponseOptions {
  preferResponseOnMissingData?: boolean
}

export function normalizeSDKResponse<TData>(
  response: unknown,
  fallback: TData,
  options?: NormalizeSDKResponseOptions,
): TData {
  if (response == null) {
    return fallback
  }

  if (Array.isArray(response)) {
    return response as TData
  }

  if (typeof response === "object" && "data" in response) {
    const data = (response as { data?: unknown }).data
    if (data != null) {
      return data as TData
    }

    if (options?.preferResponseOnMissingData === true) {
      // Only return the raw response if it's iterable (array-like).
      // Empty objects `{}` will crash downstream `for...of` loops.
      if (Array.isArray(response) || typeof (response as Record<string, unknown>).length === "number" || Symbol.iterator in (response as Record<string, unknown>)) {
        return response as TData
      }
      return fallback
    }

    return fallback
  }

  if (options?.preferResponseOnMissingData === true) {
    // Same iterable guard for non-"data" responses
    if (Array.isArray(response) || typeof (response as Record<string, unknown>).length === "number" || Symbol.iterator in (response as Record<string, unknown>)) {
      return response as TData
    }
    return fallback
  }

  return fallback
}
