import React, { useState } from 'react';
import { useRouter } from 'expo-router';


import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Scan, TriangleAlert as AlertTriangle, Clock, Package, Percent, Trash2, Gift, MapPin } from 'lucide-react-native';
import { StatsCard } from '@/components/StatsCard';
import { ProductCard } from '@/components/ProductCard';

interface Product {
  id: string;
  name: string;
  barcode: string;
  location: string;
  expiryDate: string;
  quantity: number;
  daysLeft: number;
}


const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Milk',
    barcode: '1234567890',
    location: 'Dairy - Aisle 3',
    expiryDate: '2024-01-15',
    quantity: 12,
    daysLeft: 2,
  },
  {
    id: '2',
    name: 'Greek Yogurt',
    barcode: '1234567891',
    location: 'Dairy - Aisle 3',
    expiryDate: '2024-01-17',
    quantity: 8,
    daysLeft: 4,
  },
  {
    id: '3',
    name: 'Fresh Bread',
    barcode: '1234567892',
    location: 'Bakery - Aisle 1',
    expiryDate: '2024-01-20',
    quantity: 15,
    daysLeft: 7,
  },
  {
    id: '4',
    name: 'Sliced Turkey',
    barcode: '1234567893',
    location: 'Deli - Counter 2',
    expiryDate: '2024-01-14',
    quantity: 5,
    daysLeft: 1,
  },
];

export default function DashboardScreen() {
  const router = useRouter();
  const [barcodeInput, setBarcodeInput] = useState('');
  const [products] = useState<Product[]>(mockProducts);

  const criticalItems = products.filter(p => p.daysLeft <= 3).length;
  const warningItems = products.filter(p => p.daysLeft <= 7 && p.daysLeft > 3).length;
  const totalProducts = products.length;

  const handleScan = () => {
    // Simulate barcode scanning
    console.log('Scanning barcode:', barcodeInput);
    setBarcodeInput('');
  };

  const handleProductAction = (productId: string, action: 'discount' | 'remove' | 'donate') => {
    console.log(`${action} action for product:`, productId);
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onAction={(action) => handleProductAction(item.id, action)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Dashboard</Text>
          <Text style={styles.headerSubtitle}>Monitor expiring products</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <StatsCard
            title="Critical"
            value={criticalItems}
            subtitle="≤3 days"
            color="#DC2626"
            icon={<AlertTriangle size={24} color="#DC2626" />}
          />
          <StatsCard
            title="Warning"
            value={warningItems}
            subtitle="≤7 days"
            color="#EAB308"
            icon={<Clock size={24} color="#EAB308" />}
          />
          <StatsCard
            title="Total"
            value={totalProducts}
            subtitle="products"
            color="#2563EB"
            icon={<Package size={24} color="#2563EB" />}
          />
        </View>

        {/* Barcode Scanner */}
        <View style={styles.scannerContainer}>
          <Text style={styles.sectionTitle}>Barcode Scanner</Text>
          <View style={styles.scannerInput}>
            <TextInput
              style={styles.barcodeInput}
              placeholder="Enter or scan barcode"
              value={barcodeInput}
              onChangeText={setBarcodeInput}
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
              <Scan size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Add Product Info Button */}
<View style={styles.addButtonContainer}>
  <TouchableOpacity
    style={styles.addButton}
    onPress={() => router.push('/add-products')}
  >
    <Text style={styles.addButtonText}>➕ Add Product Info</Text>
  </TouchableOpacity>
</View>


        {/* Products List */}
        <View style={styles.productsContainer}>
          <Text style={styles.sectionTitle}>Expiring Soon</Text>
          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  scrollView: {
    flex: 1,
  },
  header: {
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
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 24,
    gap: 12,
  },
  scannerContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  scannerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  barcodeInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#111827',
  },
  scanButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  addButtonContainer: {
  paddingHorizontal: 20,
  marginBottom: 12,
},
addButton: {
  backgroundColor: '#10B981', // Emerald green 🌿
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: 'center',
},
addButtonText: {
  color: '#FFFFFF',
  fontSize: 16,
  fontWeight: '600',
},

});