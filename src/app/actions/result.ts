export type ActionError = { code: number; name: string };

type Success<T> = {
    isSuccess: true;
    value: T;
    error?: never;
};

type Failure = {
    isSuccess: false;
    value?: never;
    error: ActionError;
};

export type ActionResult<T> = Success<T> | Failure;

export const ResultBuilder = {
    /**
     * Creates a success result.
     * @param value The successful value.
     * @returns An ActionResult representing success.
     */
    success: <T>(value: T): ActionResult<T> => {
        return {
            isSuccess: true,
            value: value,
        };
    },

    /**
     * Creates a failure result.
     * @param error The ActionError object.
     * @returns An ActionResult representing failure.
     */
    failure: (error: ActionError): ActionResult<never> => {
        return {
            isSuccess: false,
            error: error,
        };
    },
};
