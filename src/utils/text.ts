/**
 * Shortens the given text to match maxLength (or a little more) characters without truncating words
 */
export function shortenText(text: string, maxLength: number): string {
  return text.replace(new RegExp('^(.{' + maxLength + '}[^\\s]*).*'), '$1')
}
