import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useProductStore } from "../../store/useProductStore";
import { Product } from "../../types/product";

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const navigation = useNavigation();
  const fetchProductById = useProductStore((state) => state.fetchProductById);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Configurar header con título y botón editar
  useLayoutEffect(() => {
    if (!id) return;

    navigation.setOptions({
      title: "Detalle del Producto",
      headerRight: () => (
        <Pressable
          onPress={() =>
            router.push({
              pathname: "/product/edit/[id]",
              params: { id: id.toString() },
            })
          }
        >
          <Text style={styles.editButton}>Editar</Text>
        </Pressable>
      ),
    });
  }, [navigation, id]);

  useEffect(() => {
    if (id) {
      fetchProductById(Number(id))
        .then((res) => setProduct(res))
        .finally(() => setLoading(false));
    }
  }, [id]);

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
        <Text style={styles.error}>Producto no encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.category}>{product.category}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </ScrollView>
  );
};

export default ProductDetailScreen;

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
  image: {
    width: "100%",
    height: 280,
    resizeMode: "contain",
    marginBottom: 12,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: "#1E90FF",
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: "#888",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
  },
  error: {
    fontSize: 16,
    color: "red",
  },
  editButton: {
    color: "#fff",
    fontSize: 16,
    marginRight: 16,
  },
});
