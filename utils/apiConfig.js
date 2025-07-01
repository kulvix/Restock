import { Platform } from 'react-native';

export const getBaseURL = () => {
  return "https://restock-server.vercel.app";
};

// export const getBaseURL = () => {
//   const LOCAL_PORT = "3001";
//   if (Platform.OS === 'android') {
//     return `http://192.168.224.87:${LOCAL_PORT}`; // Android Emulator
//   } else if (Platform.OS === 'ios') {
//     return `http://127.0.0.1:${LOCAL_PORT}`; // iOS Simulator
//   }
//   return `http://192.168.224.87:${LOCAL_PORT}`; // Physical Device (replace x.x with your system IP)
// };
