import React, {memo, type FC} from 'react';
import {View, FlatList, TouchableOpacity, Text, StyleSheet} from 'react-native';

interface Notification {
  id: number;
  message: string;
  timestamp: string;
}

const notifications: Notification[] = [
  {
    id: 1,
    message: 'Your flight to New York has been delayed by 1 hour.',
    timestamp: '2 hours ago',
  },
  {
    id: 2,
    message: 'Special offer: 20% off on your next flight booking!',
    timestamp: '1 day ago',
  },
  {
    id: 3,
    message: 'Reminder: Check-in for your upcoming flight to London.',
    timestamp: '3 days ago',
  },
  // Add more dummy notifications here
];

const NotificationScreen: FC = () => {
  const renderNotificationItem = ({item}: {item: Notification}) => {
    return (
      <TouchableOpacity style={styles.notificationItem}>
        <View>
          <Text style={styles.message}>{item.message}</Text>
          <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={item => item.id.toString()}
        style={styles.notificationList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '#FB7200',
    padding: 15,
    alignItems: 'center',
  },
  headerText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  notificationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5EEF2',
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timestamp: {
    color: '#A0A0A0',
  },
  notificationList: {
    paddingHorizontal: 15,
  },
});

export default memo(NotificationScreen);
