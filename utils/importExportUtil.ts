const isArray = (object: unknown): object is Array<unknown> => Object.prototype.toString.call(object) === "[object Array]";
const isObject = (object: unknown): object is { [key: string | number]: unknown } => Object.prototype.toString.call(object) === "[object Object]";
const isString = (object: unknown): object is string => Object.prototype.toString.call(object) === "[object String]";
const isNumber = (object: unknown): object is number => Object.prototype.toString.call(object) === "[object Number]";
const isBoolean = (object: unknown): object is boolean => Object.prototype.toString.call(object) === "[object Boolean]";
const isWordType = (object: unknown): object is typeof WordType => isNumber(object) && Math.floor(object) === object && object >= 0 && object <= 10;
const wordDataValidation: { [key: string]: (object: any) => boolean } = {
  key: isString,
  value: isString,
  ex: isString,
  score: isNumber,
  correctCount: isNumber,
  type: isWordType,
  hideHint: isBoolean,
};
export const isImportableWord = (textData: string) => {
  let data: unknown;
  try {
    data = JSON.parse(textData);
  } catch {
    return false;
  }
  if (!isArray(data)) {
    return false;
  }
  let cf = true;
  loop: for (const inner of data) {
    if (isObject(inner)) {
      for (const key in wordDataValidation) {
        if (!wordDataValidation[key](inner[key])) {
          cf = false;
          break loop;
        }
      }
    } else {
      cf = false;
      break;
    }
  }
  return cf;
};

export const importWord = (data: string) => {
  if (!isImportableWord(data)) {
    return false;
  }
  useWordList().value = JSON.parse(data);
  return true;
};

export const exportWord = () => {
  return JSON.stringify(toRaw(useWordList().value));
};
