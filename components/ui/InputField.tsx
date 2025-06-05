import { StyleSheet, Text, TextInput, View } from "react-native";

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string | null;
  multiline?: boolean;
  keyboardType?: "default" | "numeric";
}

/**
 * Input reutilizable con etiqueta, validación y soporte para multilinea.
 */
const InputField = ({
  label,
  value,
  onChangeText,
  error,
  multiline = false,
  keyboardType = "default",
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        keyboardType={keyboardType}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});
