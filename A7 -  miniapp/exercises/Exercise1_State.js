import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import CodeBlock from '../components/CodeBlock';
import ExerciseContainer from '../components/ExerciseContainer';

export default function Exercise1_State() {
  const [nome, setNome] = useState('');
  const [contador, setContador] = useState(0);

  return (
    <ExerciseContainer
      title="📦 useState Hook"
      subtitle="Aprenda a gerenciar estado em componentes funcionais"
    >
      <Text style={styles.sectionTitle}>O que é useState?</Text>
      <Text style={styles.text}>
        O <Text style={styles.highlight}>useState</Text> é um Hook que permite adicionar estado a
        componentes funcionais. Ele retorna um array com duas posições: o valor atual e uma função
        para atualizá-lo.
      </Text>

      <CodeBlock
        code={`import { useState } from 'react';

function Exemplo() {
  const [valor, setValor] = useState(0);
  
  return (
    <Button 
      title="Incrementar" 
      onPress={() => setValor(valor + 1)}
    />
  );
}`}
      />

      <Text style={styles.sectionTitle}>🎯 Exercício Prático 1: Entrada de Texto</Text>
      <Text style={styles.text}>Digite seu nome abaixo:</Text>

      <View style={styles.exerciseBox}>
        <TextInput
          style={styles.input}
          placeholder="Digite aqui..."
          placeholderTextColor="#A9B4D0"
          value={nome}
          onChangeText={setNome}
        />
        <Text style={styles.result}>
          {nome ? `Olá, ${nome}! 👋` : 'Digite algo para começar...'}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>🎯 Exercício Prático 2: Contador</Text>
      <Text style={styles.text}>Manipule o contador usando os botões:</Text>

      <View style={styles.exerciseBox}>
        <Text style={styles.counterText}>{contador}</Text>
        <View style={styles.buttonRow}>
          <View style={styles.buttonWrapper}>
            <Button title="- Decrementar" onPress={() => setContador(contador - 1)} color="#F44336" />
          </View>
          <View style={styles.buttonWrapper}>
            <Button title="Resetar" onPress={() => setContador(0)} color="#FF9800" />
          </View>
          <View style={styles.buttonWrapper}>
            <Button title="Incrementar +" onPress={() => setContador(contador + 1)} color="#4CAF50" />
          </View>
        </View>
      </View>

      <Text style={styles.tip}>
        💡 <Text style={styles.highlight}>Dica:</Text> Cada vez que você chama a função
        "set", o React re-renderiza o componente com o novo valor!
      </Text>
    </ExerciseContainer>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E8EEFF',
    marginTop: 20,
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    color: '#A9B4D0',
    lineHeight: 24,
    marginBottom: 12,
  },
  highlight: {
    color: '#6C8CFF',
    fontWeight: '700',
  },
  exerciseBox: {
    backgroundColor: '#151B2B',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#2A3250',
  },
  input: {
    borderWidth: 1,
    borderColor: '#2A3250',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#E8EEFF',
    backgroundColor: '#0B1020',
    marginBottom: 12,
  },
  result: {
    fontSize: 18,
    color: '#E8EEFF',
    textAlign: 'center',
    padding: 12,
  },
  counterText: {
    fontSize: 48,
    fontWeight: '800',
    color: '#6C8CFF',
    textAlign: 'center',
    marginVertical: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  buttonWrapper: {
    flex: 1,
    marginHorizontal: 4,
  },
  tip: {
    backgroundColor: '#1E2A3A',
    borderLeftWidth: 4,
    borderLeftColor: '#6C8CFF',
    padding: 16,
    borderRadius: 8,
    marginTop: 20,
    color: '#A9B4D0',
    fontSize: 14,
    lineHeight: 22,
  },
});
