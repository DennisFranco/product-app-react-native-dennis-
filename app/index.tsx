import { router, useNavigation } from "expo-router";
import { useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";

const HomeScreen = () => {
  const { products, isLoading, error } = useProducts();
  const navigation = useNavigation();

  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(5);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Productos",
      headerRight: () => (
        <Pressable onPress={() => router.push("/product/create")}>
          <Text style={styles.addButton}>＋</Text>
        </Pressable>
      ),
    });
  }, [navigation]);

  // Filtrar productos por nombre
  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  // Mostrar solo los primeros N productos
  const visibleProducts = filtered.slice(0, limit);

  const loadMore = () => {
    if (limit < filtered.length) {
      setLimit((prev) => prev + 5);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar productos..."
        value={search}
        onChangeText={setSearch}
      />

      <FlatList
        data={visibleProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ProductCard product={item} />}
        contentContainerStyle={styles.list}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },
  list: {
    padding: 16,
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
  addButton: {
    color: "#fff",
    fontSize: 24,
    marginRight: 16,
  },
  searchInput: {
    margin: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
    borderColor: "#ddd",
    borderWidth: 1,
  },
});
