import CustomButton from "@/components/ui/CustomButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import ProductForm from "../../../components/ProductForm";
import { useProductStore } from "../../../store/useProductStore";
import { Product, ProductFormData } from "../../../types/product";

/**
 * Pantalla para editar un producto existente.
 */
const EditProductScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const fetchProductById = useProductStore((s) => s.fetchProductById);
  const editProduct = useProductStore((s) => s.editProduct);
  const removeProduct = useProductStore((s) => s.removeProduct);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProductById(Number(id))
        .then(setProduct)
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (data: ProductFormData) => {
    try {
      setSaving(true);
      await editProduct(Number(id), data);
      Alert.alert("Éxito", "Producto actualizado");
      router.replace("/");
    } catch {
      Alert.alert("Error", "No se pudo actualizar el producto");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar este producto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await removeProduct(Number(id));
              Alert.alert("Producto eliminado");
              router.replace("/");
            } catch {
              Alert.alert("Error", "No se pudo eliminar el producto");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>Producto no encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ProductForm
        onSubmit={handleSubmit}
        defaultValues={product}
        loading={saving}
      />
      <CustomButton
        title="Eliminar producto"
        onPress={handleDelete}
        style={styles.deleteButton}
      />
    </ScrollView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    fontSize: 16,
  },
  deleteButton: {
    marginTop: 24,
    backgroundColor: "#D9534F",
  },
});
