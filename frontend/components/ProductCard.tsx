import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Percent, Trash2, Gift, Calendar } from 'lucide-react-native';

interface Product {
  id: string;
  name: string;
  barcode: string;
  location: string;
  expiryDate: string;
  quantity: number;
  daysLeft: number;
}

interface ProductCardProps {
  product: Product;
  onAction: (action: 'discount' | 'remove' | 'donate') => void;
}

export function ProductCard({ product, onAction }: ProductCardProps) {
  const getUrgencyColor = (daysLeft: number) => {
    if (daysLeft <= 1) return '#DC2626';
    if (daysLeft <= 3) return '#EF4444';
    if (daysLeft <= 7) return '#EAB308';
    return '#16A34A';
  };

  const getUrgencyLabel = (daysLeft: number) => {
    if (daysLeft <= 0) return 'EXPIRED';
    if (daysLeft === 1) return '1 day left';
    return `${daysLeft} days left`;
  };

  const urgencyColor = getUrgencyColor(product.daysLeft);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={styles.locationContainer}>
            <MapPin size={14} color="#6B7280" />
            <Text style={styles.location}>{product.location}</Text>
          </View>
        </View>
        <View style={[styles.urgencyBadge, { backgroundColor: `${urgencyColor}15` }]}>
          <Text style={[styles.urgencyText, { color: urgencyColor }]}>
            {getUrgencyLabel(product.daysLeft)}
          </Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Barcode:</Text>
          <Text style={styles.detailValue}>{product.barcode}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Quantity:</Text>
          <Text style={styles.detailValue}>{product.quantity} units</Text>
        </View>
        <View style={styles.detailRow}>
          <Calendar size={14} color="#6B7280" />
          <Text style={styles.detailValue}>{product.expiryDate}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.actionButton, styles.discountButton]}
          onPress={() => onAction('discount')}
        >
          <Percent size={16} color="#EAB308" />
          <Text style={[styles.actionText, { color: '#EAB308' }]}>Discount</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.removeButton]}
          onPress={() => onAction('remove')}
        >
          <Trash2 size={16} color="#DC2626" />
          <Text style={[styles.actionText, { color: '#DC2626' }]}>Remove</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.donateButton]}
          onPress={() => onAction('donate')}
        >
          <Gift size={16} color="#16A34A" />
          <Text style={[styles.actionText, { color: '#16A34A' }]}>Donate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  productInfo: {
    flex: 1,
    marginRight: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    marginLeft: 4,
    fontSize: 14,
    color: '#6B7280',
  },
  urgencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  urgencyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  details: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    minWidth: 80,
  },
  detailValue: {
    fontSize: 14,
    color: '#111827',
    marginLeft: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  discountButton: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
  },
  removeButton: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FECACA',
  },
  donateButton: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  actionText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '500',
  },
});