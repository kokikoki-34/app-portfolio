/**
 * Standard HTTP Status Codes.
 * Using 'as const' makes this object immutable and provides full type safety.
 */
export const HttpStatus = {
  OK: 200,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
