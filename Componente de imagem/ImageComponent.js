import { Image, StyleSheet, Text, View } from "react-native";

export default function ImageComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FOTO QUE MUDA SOZINHA 😲🤯</Text>
      <Image
        style={styles.imagem}
        source={{ uri: "https://picsum.photos/300" }}
        accessible
        accessibilityLabel="Imagem de exemplo"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  imagem: {
    width: 300,
    height: 300,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android shadow
  },
});
