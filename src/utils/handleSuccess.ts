const handleSuccessStatus = (statusCode: number) => {
  if (statusCode == 0) {
    return true;
  }

  if (statusCode == 1 || statusCode == 2) {
    return false;
  }

  return false;
};

export { handleSuccessStatus };
