export interface Logger {
  logError(message: string): void;
  logWarn(message: string): void;
  logInfo(message: string): void;
}
