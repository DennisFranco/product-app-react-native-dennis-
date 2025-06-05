import ProductForm from "@/components/ProductForm";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet } from "react-native";
import { useProductStore } from "../../store/useProductStore";
import { ProductFormData } from "../../types/product";

/**
 * Pantalla para registrar un nuevo producto.
 */
const CreateProductScreen = () => {
  const [loading, setLoading] = useState(false);
  const addProduct = useProductStore((state) => state.addProduct);
  const router = useRouter();

  const handleSubmit = async (formData: ProductFormData) => {
    try {
      setLoading(true);
      await addProduct(formData);
      Alert.alert("Éxito", "Producto agregado correctamente");
      router.replace("/");
    } catch {
      Alert.alert("Error", "No se pudo agregar el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProductForm onSubmit={handleSubmit} loading={loading} />
    </ScrollView>
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
});
