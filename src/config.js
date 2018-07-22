import firebase from 'firebase';

export const appName = "advreact-90436";
export const firebaseConfig = {
  apiKey: "AIzaSyA_lYglRpL61kVmhbmxceF-Ri40QTJO_LI",
  authDomain: `${appName}.firebaseapp.com`,
  databaseURL: `https://${appName}.firebaseio.com`,
  projectId: appName,
  storageBucket: `${appName}.appspot.com`,
  messagingSenderId: "310066293473"
};

firebase.initializeApp(firebaseConfig);