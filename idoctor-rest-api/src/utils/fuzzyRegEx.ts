export const fuzzyRegEx = (text: string) =>
  text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
