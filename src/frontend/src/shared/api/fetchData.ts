import { ContentType } from "../constants/contentType";
import { HttpStatus } from "../constants/httpStatus";

export const fetchData = async <T>(
  url: string,
  options: RequestInit,
): Promise<T> => {
  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": ContentType.JSON,
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    const errorBody = await res.text();
    try {
      const parsedError = JSON.parse(errorBody);
      error.message =
        parsedError.message ||
        parsedError.detail ||
        JSON.stringify(parsedError);
    } catch {
      error.message = errorBody;
    }
    throw error;
  }

  if (res.status === HttpStatus.NO_CONTENT) {
    return {
      data: undefined,
      status: res.status,
      headers: res.headers,
    } as T;
  }

  const data = await res.json();
  return {
    data,
    status: res.status,
    headers: res.headers,
  } as T;
};
