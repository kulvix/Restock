import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useNotifications } from '../../components/contexts/NotificationContext'; // Use the hook
import styles from './NotificationScreen.style';
import { format } from 'date-fns';

export default function NotificationScreen() {
  const { notifications, loading, fetchNotifications } = useNotifications(); // Access context

  // if (loading) {
  //   return <Text>Loading notifications...</Text>;
  // }

  return (
    <View style={styles.container}>
      {notifications.length === 0 ? (
        <Text style={styles.emptyText}>No notifications yet...</Text>
      ) : (
        <FlatList
          data={[...notifications].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))} // Sort by latest
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {
            const formattedDate = format(new Date(item.timestamp), "MMM d, yyyy 'at' h:mm a"); // Example: Mar 11, 2025 at 3:30 PM

            return (
              <View style={styles.notificationItem}>
                <View style={styles.titleAndBodyBox}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.body}>{item.body}</Text>
                </View>
                <Text style={styles.timestamp}>{formattedDate}</Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: '#fff', },
//   header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
//   emptyText: { fontSize: 16, color: 'gray', textAlign: 'center' },
//   notificationItem: { padding: 10, marginBottom: 10, backgroundColor: '#f8f8f8', borderRadius: 5 },
//   title: { fontSize: 18, fontWeight: 'bold' },
// });
