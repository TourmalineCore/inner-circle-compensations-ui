export const capitalize = (word: string) => {
// TODO: it’s necessary, but if something breaks, fix it here
  if (word.substring(0, 3) === 'ank') {
    const firstName = word[0].toUpperCase();
    const lastName = word.substring(2);
    return `${lastName[0].toUpperCase() + word.slice(3)} ${firstName}.`;
  }
  const firstName = word[0].toUpperCase();
  const lastName = word.substring(1);
  return `${lastName[0].toUpperCase() + word.slice(2)} ${firstName}.`;
};
