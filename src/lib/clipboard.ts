export async function copyText(text: string): Promise<'copied' | 'failed'> {
  try {
    if (!navigator?.clipboard?.writeText) return 'failed';
    await navigator.clipboard.writeText(text);
    return 'copied';
  } catch {
    return 'failed';
  }
}
