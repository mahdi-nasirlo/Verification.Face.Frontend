export function NationalCode(number: string) {
  const regex = /^(\d{10})$/;
  if (!regex.test(number)) {
    return false;
  }

  const digits = number.split("").map(Number);
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += digits[i] * (10 - i);
  }
  let remainder = sum % 11;
  if (remainder < 2) {
    return digits[9] === remainder;
  } else {
    return digits[9] === 11 - remainder;
  }
}

export function PhoneCellular(number: string) {
  const regex = /^(09\d{9})$/;
  if (!regex.test(number)) {
    return false;
  }

  return true;
}

export function PhoneLandline(number: string) {
  const regex = /^(0\d{10})$/;
  if (!regex.test(number)) {
    return false;
  }
  return true;
}

export function EmailAddress(email: string) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) {
    return false;
  }

  return true;
}

export function setPassword(password: string) {
  const regex = RegExp(/^[A-Za-z0-9-*!@#$%^&*()_+=:;'"~]*$/);
  if (!regex.test(password)) {
    return false;
  }

  return true;
}

export function setUserName(username: string) {
  const regex = RegExp(/^[A-Za-z0-9-@._]*$/);
  if (!regex.test(username)) {
    return false;
  }

  return true;
}
