// app/add-products.tsx

import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.0.114:5000';

type ProductKey =
  | 'name'
  | 'quantity'
  | 'category'
  | 'location'
  | 'expiryDate'
  | 'barcode'
  | 'productId'
  | 'batchNumber'
  | 'entryDate';

export default function AddProduct() {
  const router = useRouter();

  const [product, setProduct] = useState<Record<ProductKey, string>>({
    name: '',
    quantity: '',
    category: '',
    location: '',
    expiryDate: '',
    barcode: '',
    productId: '',
    batchNumber: '',
    entryDate: '',
  });

  const handleChange = (key: ProductKey, value: string) => {
    setProduct(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
  try {
    console.log("Submitting product:", product);

    const response = await fetch(`${API_URL}/products/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });

    const data = await response.json();
    console.log("Server response:", data);

    if (response.ok) {
      Alert.alert('✅ Success', 'Product added!');
      router.push('/');
    } else {
      Alert.alert('❌ Error', data.message || 'Failed to add product');
    }

  } catch (error) {
    console.error('Network error:', error);
    Alert.alert('❌ Error', 'Could not connect to backend');
  }
};



  const fillTestData = () => {
    setProduct({
      name: 'Greek Yogurt',
      quantity: '8',
      category: 'Dairy',
      location: 'Aisle 3',
      expiryDate: '2024-07-20',
      barcode: '1234567890',
      productId: 'GY20240720',
      batchNumber: 'GYB123',
      entryDate: '2024-07-01',
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>➕ Add New Product</Text>

      {(Object.keys(product) as ProductKey[]).map(key => (
        <TextInput
          key={key}
          placeholder={key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())}
          value={product[key]}
          onChangeText={text => handleChange(key, text)}
          style={styles.input}
          autoCapitalize="none"
        />
      ))}

      <View style={styles.buttonContainer}>
        <Button title="Submit Product" onPress={handleSubmit} />
        <Button title="🧪 Fill Test Data" onPress={fillTestData} color="#6B7280" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 15,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  buttonContainer: {
    gap: 10,
    marginTop: 10,
  },
});
