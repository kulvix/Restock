import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Alert } from "react-native";

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Function to register for push notifications
export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    Alert.alert("Push Notifications", "Must use a physical device for push notifications.");
    return null;
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  // Ask for permission if not granted
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    Alert.alert("Push Notifications", "Permission not granted for push notifications.");
    return null;
  }

  try {
    const pushToken = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("Expo Push Token:", pushToken); // Log the token
    return pushToken;
  } catch (error) {
    console.error("Error getting push token:", error);
    return null;
  }
}
