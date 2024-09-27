// utils/handleResponse.ts
import { StatusCodes } from 'http-status-codes';

interface ResponseData {
  statusCode: number;
  status: string;
  message?: string;
  data?: unknown;
  error?: unknown;
}

export const ResponseStatus = {
  SUCCESS: "success",
  ERROR: "error",
};

export function HandleResponse(responseData: ResponseData) {
  if (responseData.status === ResponseStatus.SUCCESS) {
    return {
      ...responseData,
    };
  }

  throw {
    statusCode: responseData.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    ...responseData,
  };
}
