export const getFromLocalstorage = (key: string): string => {
  return localStorage.getItem(key);
}
