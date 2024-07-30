const getErrorMessage = (status: number = 0) => {
  if (status >= 500) {
    return "خطایی رخ داده است. لطفا با پشتیبان سیستم تماس بگیرید.";
  }

  if (status == 401 || status == 403) {
    return "شما دسترسی به سیستم ندارد.";
  }

  if (status >= 400) {
    return "خطای سیستمی.";
  }
};

export { getErrorMessage };
