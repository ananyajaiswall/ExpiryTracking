// app/add-product.tsx

import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function AddProduct() {
  const router = useRouter();

  const [product, setProduct] = useState({
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

  const handleChange = (key: string, value: string) => {
    setProduct(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    // TODO: send this to your backend or store it
    console.log('New Product:', product);
    alert('Product added!');
    router.push('/'); // Navigate back to home or wherever
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>➕ Add New Product</Text>

      {Object.entries(product).map(([key, value]) => (
        <TextInput
          key={key}
          placeholder={key.replace(/([A-Z])/g, ' $1').toUpperCase()}
          value={value}
          onChangeText={text => handleChange(key, text)}
          style={styles.input}
        />
      ))}

      <Button title="Submit Product" onPress={handleSubmit} />
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
});
