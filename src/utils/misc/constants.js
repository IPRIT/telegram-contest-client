const hour = 1000 * 60 * 60;
const day = hour * 24;

export const TIME_PERIODS = {
  year: day * 365.25,
  month: day * 31,
  week: day * 7,
  day,
  hour,
  minute: hour / 60
};

export const SOCKET_URL = process.socketURL;
