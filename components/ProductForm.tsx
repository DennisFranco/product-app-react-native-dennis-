import { useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ProductFormData } from "../types/product";
import {
    validateImageUrl,
    validatePrice,
    validateRequired,
} from "../utils/validators";
import CustomButton from "./ui/CustomButton";
import InputField from "./ui/InputField";

interface Props {
  onSubmit: (data: ProductFormData) => void;
  loading?: boolean;
  defaultValues?: ProductFormData;
}

/**
 * Formulario reutilizable para crear o editar un producto.
 */
const ProductForm = ({ onSubmit, loading = false, defaultValues }: Props) => {
  const [title, setTitle] = useState(defaultValues?.title || "");
  const [price, setPrice] = useState(String(defaultValues?.price || ""));
  const [description, setDescription] = useState(
    defaultValues?.description || ""
  );
  const [category, setCategory] = useState(defaultValues?.category || "");
  const [image, setImage] = useState(defaultValues?.image || "");

  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const handleValidate = () => {
    const newErrors = {
      title: validateRequired(title),
      price: validatePrice(price),
      description: validateRequired(description),
      category: validateRequired(category),
      image: validateImageUrl(image),
    };
    setErrors(newErrors);

    // Devuelve true si no hay errores
    return Object.values(newErrors).every((e) => e === null);
  };

  const handleSubmit = () => {
    if (!handleValidate()) return;

    onSubmit({
      title,
      price: parseFloat(price),
      description,
      category,
      image,
    });
  };

  return (
    <View style={styles.form}>
      <InputField
        label="Título"
        value={title}
        onChangeText={setTitle}
        error={errors.title}
      />
      <InputField
        label="Precio"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        error={errors.price}
      />
      <InputField
        label="Descripción"
        value={description}
        onChangeText={setDescription}
        multiline
        error={errors.description}
      />
      <InputField
        label="Categoría"
        value={category}
        onChangeText={setCategory}
        error={errors.category}
      />
      <InputField
        label="URL de Imagen"
        value={image}
        onChangeText={setImage}
        error={errors.image}
      />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#1E90FF"
          style={{ marginTop: 16 }}
        />
      ) : (
        <CustomButton
          title="Guardar"
          onPress={handleSubmit}
          loading={loading}
        />
      )}
    </View>
  );
};

export default ProductForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
});
