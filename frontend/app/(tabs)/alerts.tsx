import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { TriangleAlert as AlertTriangle, Gift, Clock, Filter, CircleCheck as CheckCircle, MapPin, Package } from 'lucide-react-native';
import { AlertCard } from '@/components/AlertCard';

interface Alert {
  id: string;
  type: 'warning' | 'donation' | 'expiry';
  title: string;
  message: string;
  location?: string;
  count?: number;
  timestamp: string;
  isRead: boolean;
}

const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Critical Items Alert',
    message: '5 items expiring in Aisle 3',
    location: 'Aisle 3',
    count: 5,
    timestamp: '2024-01-13T10:30:00Z',
    isRead: false,
  },
  {
    id: '2',
    type: 'expiry',
    title: 'Yogurt Expiring Soon',
    message: 'Greek Yogurt expiring in 2 days',
    location: 'Dairy Section',
    timestamp: '2024-01-13T09:15:00Z',
    isRead: false,
  },
  {
    id: '3',
    type: 'donation',
    title: 'Donation Opportunity',
    message: 'Donate items in Dairy section',
    location: 'Dairy Section',
    count: 8,
    timestamp: '2024-01-13T08:45:00Z',
    isRead: true,
  },
  {
    id: '4',
    type: 'warning',
    title: 'Meat Products Alert',
    message: 'Sliced Turkey expiring tomorrow',
    location: 'Deli Counter',
    timestamp: '2024-01-13T07:20:00Z',
    isRead: false,
  },
  {
    id: '5',
    type: 'expiry',
    title: 'Bread Section Check',
    message: 'Fresh Bread nearing expiry date',
    location: 'Bakery',
    timestamp: '2024-01-12T16:30:00Z',
    isRead: true,
  },
];

export default function AlertsScreen() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
  const [filter, setFilter] = useState<'all' | 'unread' | 'warning' | 'donation'>('all');

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  const filteredAlerts = alerts.filter(alert => {
    switch (filter) {
      case 'unread':
        return !alert.isRead;
      case 'warning':
        return alert.type === 'warning' || alert.type === 'expiry';
      case 'donation':
        return alert.type === 'donation';
      default:
        return true;
    }
  });

  const handleMarkAsRead = (alertId: string) => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert =>
        alert.id === alertId ? { ...alert, isRead: true } : alert
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setAlerts(prevAlerts =>
      prevAlerts.map(alert => ({ ...alert, isRead: true }))
    );
  };

  const renderAlert = ({ item }: { item: Alert }) => (
    <AlertCard
      alert={item}
      onMarkAsRead={() => handleMarkAsRead(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Alerts</Text>
          <Text style={styles.headerSubtitle}>
            {unreadCount} unread notifications
          </Text>
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity 
            style={styles.markAllButton}
            onPress={handleMarkAllAsRead}
          >
            <CheckCircle size={20} color="#16A34A" />
            <Text style={styles.markAllText}>Mark All Read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Buttons */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.filterButton, filter === 'unread' && styles.filterButtonActive]}
          onPress={() => setFilter('unread')}
        >
          <Text style={[styles.filterText, filter === 'unread' && styles.filterTextActive]}>
            Unread ({unreadCount})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.filterButton, filter === 'warning' && styles.filterButtonActive]}
          onPress={() => setFilter('warning')}
        >
          <AlertTriangle size={16} color={filter === 'warning' ? '#FFFFFF' : '#6B7280'} />
          <Text style={[styles.filterText, filter === 'warning' && styles.filterTextActive]}>
            Warnings
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.filterButton, filter === 'donation' && styles.filterButtonActive]}
          onPress={() => setFilter('donation')}
        >
          <Gift size={16} color={filter === 'donation' ? '#FFFFFF' : '#6B7280'} />
          <Text style={[styles.filterText, filter === 'donation' && styles.filterTextActive]}>
            Donations
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Alerts List */}
      <FlatList
        data={filteredAlerts}
        renderItem={renderAlert}
        keyExtractor={(item) => item.id}
        style={styles.alertsList}
        contentContainerStyle={styles.alertsContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  markAllText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#16A34A',
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterButtonActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginLeft: 4,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  alertsList: {
    flex: 1,
  },
  alertsContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});