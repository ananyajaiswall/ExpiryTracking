import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TriangleAlert as AlertTriangle, Gift, Clock, MapPin, Check } from 'lucide-react-native';

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

interface AlertCardProps {
  alert: Alert;
  onMarkAsRead: () => void;
}

export function AlertCard({ alert, onMarkAsRead }: AlertCardProps) {
  const getAlertIcon = () => {
    switch (alert.type) {
      case 'warning':
        return <AlertTriangle size={20} color="#EAB308" />;
      case 'donation':
        return <Gift size={20} color="#16A34A" />;
      case 'expiry':
        return <Clock size={20} color="#DC2626" />;
      default:
        return <AlertTriangle size={20} color="#6B7280" />;
    }
  };

  const getAlertColor = () => {
    switch (alert.type) {
      case 'warning':
        return '#EAB308';
      case 'donation':
        return '#16A34A';
      case 'expiry':
        return '#DC2626';
      default:
        return '#6B7280';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else {
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d ago`;
    }
  };

  return (
    <View style={[styles.container, !alert.isRead && styles.unreadContainer]}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.iconContainer, { backgroundColor: `${getAlertColor()}15` }]}>
            {getAlertIcon()}
          </View>
          <View style={styles.headerText}>
            <Text style={styles.title}>{alert.title}</Text>
            <Text style={styles.timestamp}>{formatTimestamp(alert.timestamp)}</Text>
          </View>
          {!alert.isRead && (
            <TouchableOpacity style={styles.markReadButton} onPress={onMarkAsRead}>
              <Check size={16} color="#16A34A" />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.message}>{alert.message}</Text>

        {alert.location && (
          <View style={styles.locationContainer}>
            <MapPin size={14} color="#6B7280" />
            <Text style={styles.location}>{alert.location}</Text>
            {alert.count && (
              <Text style={styles.count}>• {alert.count} items</Text>
            )}
          </View>
        )}
      </View>
      
      {!alert.isRead && <View style={styles.unreadIndicator} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    position: 'relative',
  },
  unreadContainer: {
    borderLeftWidth: 3,
    borderLeftColor: '#2563EB',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  markReadButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0FDF4',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  message: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
    lineHeight: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    marginLeft: 4,
    fontSize: 12,
    color: '#6B7280',
  },
  count: {
    marginLeft: 8,
    fontSize: 12,
    color: '#9CA3AF',
  },
  unreadIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563EB',
  },
});