import logger from "../logger.util";

type ErrorResponse = {
  content: { type: 'text'; text: string }[];
  isError: boolean;
};
type ErrorHandler = (params: {
  error: Error;
  fallbackMsg?: string;
}) => ErrorResponse;

export const toolErrorHandler: ErrorHandler = ({ error, fallbackMsg }) => {
  logger.error(`Tool "${fallbackMsg}" failed:`, { error });
  const errorMessage =
    fallbackMsg ?? (error instanceof Error ? error.message : 'Unknown error');

  return {
    content: [
      {
        type: 'text' as const,
        text: errorMessage,
      },
    ],
    isError: true,
  };
};
