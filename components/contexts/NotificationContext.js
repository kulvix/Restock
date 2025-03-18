import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Alert } from 'react-native';
import { getBaseURL } from '../../utils/apiConfig';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = getBaseURL();
const SERVER_URL = `${BASE_URL}/server`;

export const NotificationContext = createContext();
export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expoPushToken, setExpoPushToken] = useState(null);
  const router = useRouter();

  // Setup notification handler
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  // Load saved notifications from AsyncStorage on app start
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const savedNotifications = await AsyncStorage.getItem('notifications');
        if (savedNotifications) {
          setNotifications(JSON.parse(savedNotifications));
        }
      } catch (error) {
        console.error('Failed to load notifications:', error);
      }
    };

    loadNotifications();
  }, []);

  // Save notifications to AsyncStorage whenever they change
  const saveNotifications = async (newNotifications) => {
    try {
      await AsyncStorage.setItem('notifications', JSON.stringify(newNotifications));
    } catch (error) {
      console.error('Failed to save notifications:', error);
    }
  };

  useEffect(() => {
    const registerForPushNotifications = async () => {
      if (!Device.isDevice) {
        Alert.alert("Push Notifications", "Must use a physical device for push notifications.");
        return;
      }

      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        Alert.alert("Push Notifications", "Permission not granted for push notifications.");
        return;
      }

      try {
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log("Expo Push Token:", token);
        setExpoPushToken(token);
      } catch (error) {
        console.error("Error getting push token:", error);
      }
    };

    registerForPushNotifications();
  }, []);

  // Handle notifications received while app is in foreground
  useEffect(() => {
    const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
      const newNotification = {
        ...notification.request.content,
        timestamp: new Date().toISOString(),
      };

      setNotifications((prevNotifications) => {
        // Prevent duplicates (5s tolerance)
        const isDuplicate = prevNotifications.some(n =>
          n.title === newNotification.title &&
          n.body === newNotification.body &&
          Math.abs(new Date(n.timestamp) - new Date(newNotification.timestamp)) < 5000
        );

        if (isDuplicate) return prevNotifications;

        const updatedNotifications = [...prevNotifications, newNotification];
        saveNotifications(updatedNotifications); // Save to AsyncStorage
        return updatedNotifications;
      });
    });

    return () => Notifications.removeNotificationSubscription(notificationListener);
  }, []);

  // Handle notification clicks (navigates to Notification Screen)
  useEffect(() => {
    const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
      const notificationData = {
        ...response.notification.request.content,
        timestamp: new Date().toISOString(),
      };

      router.push("/notifications");

      setNotifications((prevNotifications) => {
        // Prevent duplicates
        const isDuplicate = prevNotifications.some(n =>
          n.title === notificationData.title &&
          n.body === notificationData.body &&
          Math.abs(new Date(n.timestamp) - new Date(notificationData.timestamp)) < 5000
        );

        if (isDuplicate) return prevNotifications;

        const updatedNotifications = [...prevNotifications, notificationData];
        saveNotifications(updatedNotifications); // Save to AsyncStorage
        return updatedNotifications;
      });
    });

    return () => Notifications.removeNotificationSubscription(responseListener);
  }, []);

  // Function to send push notification to a user
  const sendPushNotification = async (title, message) => {
    if (!expoPushToken) {
      console.log("Push token is not available yet.");
      return;
    }

    try {
      const response = await axios.post(`${SERVER_URL}/send-notification`, {
        expoPushToken,
        title,
        message,
      });
      console.log("Notification sent:", response.data);
    } catch (error) {
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
        console.error("Status Code:", error.response.status);
      } else if (error.request) {
        console.error("No response received from server:", error.request);
      } else {
        console.error("Axios request error:", error.message);
      }
    }
  };

  // Fetch notifications from the backend
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/notifications`);
      const notificationsWithTimestamp = response.data.map(notification => ({
        ...notification,
        timestamp: notification.timestamp || new Date().toISOString(),
      }));
      setNotifications(notificationsWithTimestamp);
      saveNotifications(notificationsWithTimestamp);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  return (
    <NotificationContext.Provider value={{ 
      notifications,
      loading,
      sendPushNotification,
      fetchNotifications,
      useNotifications,
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
