export const maskData = (data: string): string => {
  const maskedData =
    data.substring(0, 3) +
    "****" +
    data.substring(data.length - 3, data.length);

  return maskedData;
};
