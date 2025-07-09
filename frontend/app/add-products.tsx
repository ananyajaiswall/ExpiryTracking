// app/add-products.tsx

import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

// Define the API URL from environment variables or a fallback
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.0.114:5000';

// Define a union type for all possible product keys
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

  // Initialize product state with empty strings, typed using ProductKey
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

  // Handler for updating product fields
  const handleChange = (key: ProductKey, value: string) => {
    setProduct(prev => ({ ...prev, [key]: value }));
  };

  // Handler for submitting the product data to the backend
  const handleSubmit = async () => {
    try {
      console.log("Submitting product:", product);

      // Make a POST request to the backend API
      const response = await fetch(`${API_URL}/products/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      const data = await response.json();
      console.log("Server response:", data);

      // Check if the response was successful
      if (response.ok) {
        Alert.alert('✅ Success', 'Product added!'); // Use Alert for user feedback
        router.push('/'); // Navigate back to the home screen on success
      } else {
        // Show error message from backend or a generic one
        Alert.alert('❌ Error', data.message || 'Failed to add product');
      }

    } catch (error) {
      // Handle network or other submission errors
      console.error('Network error:', error);
      Alert.alert('❌ Error', 'Could not connect to backend');
    }
  };

  // Function to pre-fill the form with test data
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

      {/* Map through product keys to create TextInput fields dynamically */}
      {(Object.keys(product) as ProductKey[]).map(key => (
        <TextInput
          key={key}
          // Format placeholder text (e.g., "expiryDate" -> "Expiry Date")
          placeholder={key
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())}
          value={product[key]}
          onChangeText={text => handleChange(key, text)}
          style={styles.input}
          autoCapitalize="none" // Prevent unwanted auto-capitalization
        />
      ))}

      <View style={styles.buttonContainer}>
        <Button title="Submit Product" onPress={handleSubmit} />
        {/* Button to fill form with test data */}
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
