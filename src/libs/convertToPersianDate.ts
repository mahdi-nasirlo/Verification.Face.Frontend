const JalaliMoment = require("jalali-moment");

export function convertToPersianDate(gregorianDate: string) {
  const jalaliDate = JalaliMoment(gregorianDate, "YYYY-MM-DD").format(
    "jYYYY/jMM/jDD"
  );
  return jalaliDate;
}
