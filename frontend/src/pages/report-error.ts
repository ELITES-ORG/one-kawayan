/** Which sentence to show when the report form is submitted. Empty means it can be kept. */
export function reportFieldError(place: string, detail: string): string {
  const missingPlace = place.trim() === '';
  const missingDetail = detail.trim() === '';
  if (missingPlace && missingDetail) return 'Add the place and what happened.';
  if (missingPlace) return 'Add the place.';
  if (missingDetail) return 'Add what happened.';
  return '';
}
