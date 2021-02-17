export const logError = (message: string, error: Error) => {
  console.error(`[${message}]`, error?.stack)
}
