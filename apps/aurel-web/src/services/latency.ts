/** Mock network latency so loading states are real in the frontend-only build. */
export function wait(min: number, max = min): Promise<void> {
  const ms = min + Math.random() * (max - min);
  return new Promise((resolve) => setTimeout(resolve, ms));
}
