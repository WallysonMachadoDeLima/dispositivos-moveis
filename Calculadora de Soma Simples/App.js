import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [numero1, setNumero1] = useState('');
  const [numero2, setNumero2] = useState('');
  const [resultado, setResultado] = useState(null);

  const calcularSoma = () => {
    const num1 = parseFloat(numero1);
    const num2 = parseFloat(numero2);

    if (isNaN(num1) || isNaN(num2)) {
      Alert.alert('Erro', 'Por favor, insira números válidos');
      return;
    }

    const soma = num1 + num2;
    setResultado(soma);
  };

  const limpar = () => {
    setNumero1('');
    setNumero2('');
    setResultado(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora de Soma</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Primeiro número:</Text>
        <TextInput
          style={styles.input}
          value={numero1}
          onChangeText={setNumero1}
          placeholder="Digite o primeiro número"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Segundo número:</Text>
        <TextInput
          style={styles.input}
          value={numero2}
          onChangeText={setNumero2}
          placeholder="Digite o segundo número"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={calcularSoma}>
          <Text style={styles.buttonText}>Calcular Soma</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonLimpar]} onPress={limpar}>
          <Text style={styles.buttonText}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {resultado !== null && (
        <View style={styles.resultadoContainer}>
          <Text style={styles.resultadoLabel}>Resultado:</Text>
          <Text style={styles.resultado}>{resultado}</Text>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    backgroundColor: '#fff',
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
    marginTop: 20,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonLimpar: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultadoContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#007AFF',
    minWidth: 200,
  },
  resultadoLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  resultado: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
  },
});
