import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CodeBlock from '../components/CodeBlock';
import ExerciseContainer from '../components/ExerciseContainer';

const DADOS_EXEMPLO = [
  { id: '1', nome: 'React', icone: '⚛️', cor: '#61DAFB' },
  { id: '2', nome: 'JavaScript', icone: '🟨', cor: '#F7DF1E' },
  { id: '3', nome: 'TypeScript', icone: '🔷', cor: '#3178C6' },
  { id: '4', nome: 'Node.js', icone: '🟢', cor: '#339933' },
  { id: '5', nome: 'Python', icone: '🐍', cor: '#3776AB' },
  { id: '6', nome: 'Git', icone: '🔀', cor: '#F05032' },
];

export default function Exercise3_FlatList() {
  const [selecionado, setSelecionado] = useState(null);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.item,
        selecionado?.id === item.id && styles.itemSelecionado,
      ]}
      onPress={() => setSelecionado(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.icone}>{item.icone}</Text>
      <View style={styles.itemContent}>
        <Text style={styles.itemNome}>{item.nome}</Text>
        {selecionado?.id === item.id && (
          <Text style={styles.itemStatus}>✓ Selecionado</Text>
        )}
      </View>
      <View style={[styles.corIndicador, { backgroundColor: item.cor }]} />
    </TouchableOpacity>
  );

  return (
    <ExerciseContainer
      title="📜 FlatList Component"
      subtitle="Renderize listas de dados de forma eficiente"
    >
      <Text style={styles.sectionTitle}>O que é FlatList?</Text>
      <Text style={styles.text}>
        O <Text style={styles.highlight}>FlatList</Text> é um componente otimizado para renderizar
        listas de dados. Ele renderiza apenas os itens visíveis na tela, melhorando a performance
        com grandes conjuntos de dados.
      </Text>

      <CodeBlock
        code={`import { FlatList } from 'react-native';

const dados = [
  { id: '1', titulo: 'Item 1' },
  { id: '2', titulo: 'Item 2' },
];

<FlatList
  data={dados}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <Text>{item.titulo}</Text>
  )}
/>`}
      />

      <Text style={styles.sectionTitle}>🎯 Exercício Prático</Text>
      <Text style={styles.text}>
        Clique nos itens da lista abaixo para selecioná-los:
      </Text>

      <View style={styles.listContainer}>
        <FlatList
          data={DADOS_EXEMPLO}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {selecionado && (
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>📌 Item Selecionado</Text>
          <Text style={styles.infoText}>
            {selecionado.icone} {selecionado.nome}
          </Text>
          <View style={[styles.corPreview, { backgroundColor: selecionado.cor }]}>
            <Text style={styles.corTexto}>Cor: {selecionado.cor}</Text>
          </View>
        </View>
      )}

      <Text style={styles.sectionTitle}>📚 Propriedades Principais</Text>
      
      <View style={styles.propBox}>
        <Text style={styles.propTitle}>• data</Text>
        <Text style={styles.propDesc}>Array de dados a ser renderizado</Text>
      </View>

      <View style={styles.propBox}>
        <Text style={styles.propTitle}>• renderItem</Text>
        <Text style={styles.propDesc}>Função que renderiza cada item</Text>
      </View>

      <View style={styles.propBox}>
        <Text style={styles.propTitle}>• keyExtractor</Text>
        <Text style={styles.propDesc}>Define uma chave única para cada item</Text>
      </View>

      <View style={styles.propBox}>
        <Text style={styles.propTitle}>• horizontal</Text>
        <Text style={styles.propDesc}>Renderiza a lista horizontalmente</Text>
      </View>

      <Text style={styles.tip}>
        💡 <Text style={styles.highlight}>Performance:</Text> Use FlatList ao invés de ScrollView +
        map() para listas grandes. O FlatList usa virtualização para renderizar apenas os itens
        visíveis!
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
  listContainer: {
    backgroundColor: '#151B2B',
    borderRadius: 12,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#2A3250',
    maxHeight: 350,
  },
  flatListContent: {
    padding: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2A3A',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    borderWidth: 2,
    borderColor: '#2A3250',
  },
  itemSelecionado: {
    borderColor: '#6C8CFF',
    backgroundColor: '#2A3F5F',
  },
  icone: {
    fontSize: 32,
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  itemNome: {
    fontSize: 18,
    fontWeight: '600',
    color: '#E8EEFF',
  },
  itemStatus: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 4,
    fontWeight: '600',
  },
  corIndicador: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginLeft: 12,
  },
  infoBox: {
    backgroundColor: '#1E2A3A',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6C8CFF',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E8EEFF',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 20,
    color: '#E8EEFF',
    marginBottom: 12,
  },
  corPreview: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  corTexto: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },
  propBox: {
    backgroundColor: '#151B2B',
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
    borderLeftWidth: 3,
    borderLeftColor: '#6C8CFF',
  },
  propTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6C8CFF',
    marginBottom: 4,
  },
  propDesc: {
    fontSize: 14,
    color: '#A9B4D0',
    lineHeight: 20,
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
