import {getBundleId} from 'react-native-device-info';

export const admobs = {
  banner: __DEV__
    ? 'ca-app-pub-3940256099942544/9214589741'
    : 'ca-app-pub-5403151953456829/6083451793',
  interstitial: __DEV__
    ? 'ca-app-pub-3940256099942544/1033173712'
    : 'ca-app-pub-5403151953456829/5278962005',
  appOpen: __DEV__
    ? 'ca-app-pub-3940256099942544/9257395921'
    : 'ca-app-pub-5403151953456829/4770370124',
  native: __DEV__
    ? 'ca-app-pub-3940256099942544/2247696110'
    : 'ca-app-pub-5403151953456829/1890381339',
};

// export const admobs = {
//   banner: 'ca-app-pub-3940256099942544/9214589741',
//   interstitial: 'ca-app-pub-3940256099942544/1033173712',
//   appOpen: 'ca-app-pub-3940256099942544/9257395921',
//   native: 'ca-app-pub-3940256099942544/2247696110',
// };

export const applovin = {
  // banner: '918611bd6cb93045',
  // interstitial: '9925bfe198c1a8d9',
  // native: '2efd593b77970e01',
};

export const colors = {
  main: '#15161A',
};

export const appLink = `https://play.google.com/store/apps/details?id=${getBundleId()}`;
