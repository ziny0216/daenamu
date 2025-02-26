export const emailRegex = (value: string): boolean => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(value);
};

export const validateInput = (input: string, isChar = false) => {
  const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
  const hasSpecialCharacter = regExp.test(input);
  const hasNumber = /\d/.test(input);
  const hasLowerCase = /[a-z]/.test(input);
  const hasUpperCase = /[A-Z]/.test(input);
  if (isChar) {
    // 특수문자, 숫자, 영문자 중 하나라도 없으면 false 반환
    if (!hasSpecialCharacter || !hasNumber || !hasLowerCase || !hasUpperCase) {
      return false;
    }
  } else {
    if (hasSpecialCharacter || !hasNumber || !hasLowerCase || !hasUpperCase) {
      return false;
    }
  }
  return true;
};
