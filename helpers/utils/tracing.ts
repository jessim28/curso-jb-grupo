export function log(message: string): void {
    console.log(`[TRACE] ${new Date().toISOString()}: ${message}`);
}

export function logError(error: Error): void {
    console.error(`[ERROR] ${new Date().toISOString()}: ${error.message}`);
}

export function logInfo(info: string): void {
    console.info(`[INFO] ${new Date().toISOString()}: ${info}`);
}