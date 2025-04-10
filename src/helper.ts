export function auditLog(message: string) {
  const date = new Date();
  const timestamp = date.toISOString().replace(/T/, " ").replace(/\..+/, "");
  console.log(`[${timestamp}] ${message}`);
}
