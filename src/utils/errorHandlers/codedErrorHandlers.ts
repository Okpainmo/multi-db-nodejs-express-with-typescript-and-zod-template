import log from '../logger.js';
import type { Response } from 'express';

export const errorHandler__500 = (error: any, res: Response) => {
  if (error instanceof Error) {
    log.error(`Error: ${error.message}`);

    res.status(500).json({
      responseMessage: 'Request was unsuccessful: internal server error',
      error: error.message
    });
  } else {
    log.error(`Error: ${error}`);

    res.status(500).json({
      responseMessage: 'Request was unsuccessful: internal server error',
      error: error as string
    });
  }
};

export const errorHandler__403 = (errorMessage: any, res: Response) => {
  log.error(`Forbidden Error: ${errorMessage}`);

  res.status(403).json({
    responseMessage: errorMessage,
    error: 'FORBIDDEN'
  });
};

export const errorHandler__401 = (errorMessage: any, res: Response) => {
  log.error(`Unauthorized Error: ${errorMessage}`);

  res.status(401).json({
    responseMessage: errorMessage,
    error: 'UNAUTHORIZED'
  });
};

export const errorHandler__404 = (errorMessage: any, res: Response) => {
  log.error(`Not Found Error: ${errorMessage}`);

  res.status(404).json({
    responseMessage: errorMessage,
    error: 'NOT FOUND'
  });
};

export const errorHandler__400 = (errorMessage: any, res: Response) => {
  log.error(`Bad Request Error: ${errorMessage}`);

  res.status(400).json({
    responseMessage: errorMessage,
    error: 'BAD REQUEST'
  });
};
