export const SOCIALS_NETWORKS = {
  vk: {
    name: 'ВКонтакте',
    color: '#5178A3'
  },
  fb: {
    name: 'Facebook',
    color: '#3E5392'
  },
  ok: {
    name: 'Одноклассники',
    color: '#F36428'
  },
  mail: {
    name: 'Mail.Ru',
    color: '#005FF9'
  },
  yandex: {
    name: 'Яндекс',
    color: '#F00'
  },
  google: {
    name: 'Google',
    color: '#005FF9'
  }
};

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

export const CONTACTS = {
  email: 'contact@javascript-future.io',
  telegram: 'https://t.me/javascriptfuture'
};
