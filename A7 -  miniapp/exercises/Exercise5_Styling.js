import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CodeBlock from '../components/CodeBlock';
import ExerciseContainer from '../components/ExerciseContainer';

export default function Exercise5_Styling() {
  return (
    <ExerciseContainer
      title="🎨 Estilos & Layouts"
      subtitle="Aprenda a estilizar componentes com StyleSheet e Flexbox"
    >
      <Text style={styles.sectionTitle}>StyleSheet API</Text>
      <Text style={styles.text}>
        React Native usa <Text style={styles.highlight}>StyleSheet</Text> para criar estilos. É
        similar ao CSS, mas usa camelCase e valores JavaScript.
      </Text>

      <CodeBlock
        code={`import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  texto: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});`}
      />

      <Text style={styles.sectionTitle}>🎯 Exercício 1: Flexbox Layout</Text>
      <Text style={styles.text}>
        O <Text style={styles.highlight}>Flexbox</Text> é o sistema de layout padrão no React
        Native:
      </Text>

      <View style={styles.exerciseBox}>
        <Text style={styles.exerciseTitle}>flexDirection: 'row'</Text>
        <View style={styles.flexRow}>
          <View style={[styles.box, { backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.boxText}>1</Text>
          </View>
          <View style={[styles.box, { backgroundColor: '#4ECDC4' }]}>
            <Text style={styles.boxText}>2</Text>
          </View>
          <View style={[styles.box, { backgroundColor: '#45B7D1' }]}>
            <Text style={styles.boxText}>3</Text>
          </View>
        </View>
      </View>

      <View style={styles.exerciseBox}>
        <Text style={styles.exerciseTitle}>flexDirection: 'column'</Text>
        <View style={styles.flexColumn}>
          <View style={[styles.box, { backgroundColor: '#95E1D3' }]}>
            <Text style={styles.boxText}>1</Text>
          </View>
          <View style={[styles.box, { backgroundColor: '#F38181' }]}>
            <Text style={styles.boxText}>2</Text>
          </View>
          <View style={[styles.box, { backgroundColor: '#AA96DA' }]}>
            <Text style={styles.boxText}>3</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>🎯 Exercício 2: Alinhamento</Text>

      <View style={styles.exerciseBox}>
        <Text style={styles.exerciseTitle}>justifyContent: 'space-between'</Text>
        <View style={[styles.flexRow, { justifyContent: 'space-between' }]}>
          <View style={[styles.smallBox, { backgroundColor: '#FFD93D' }]} />
          <View style={[styles.smallBox, { backgroundColor: '#6BCB77' }]} />
          <View style={[styles.smallBox, { backgroundColor: '#4D96FF' }]} />
        </View>
      </View>

      <View style={styles.exerciseBox}>
        <Text style={styles.exerciseTitle}>alignItems: 'center'</Text>
        <View style={[styles.flexRow, { alignItems: 'center', height: 100 }]}>
          <View style={[styles.smallBox, { height: 40, backgroundColor: '#FF6B9D' }]} />
          <View style={[styles.smallBox, { height: 60, backgroundColor: '#C44569' }]} />
          <View style={[styles.smallBox, { height: 50, backgroundColor: '#FEA47F' }]} />
        </View>
      </View>

      <CodeBlock
        code={`// Flexbox principal
flexDirection: 'row' | 'column'
justifyContent: 'flex-start' | 'center' | 
                'flex-end' | 'space-between'
alignItems: 'flex-start' | 'center' | 
            'flex-end' | 'stretch'
flex: 1 // Ocupa espaço disponível`}
      />

      <Text style={styles.sectionTitle}>🎯 Exercício 3: Estilização Avançada</Text>

      <View style={styles.cardExample}>
        <View style={styles.cardHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Card Estilizado</Text>
            <Text style={styles.cardSubtitle}>com sombras e bordas</Text>
          </View>
        </View>
        <Text style={styles.cardContent}>
          Este card demonstra bordas arredondadas, sombras, e um layout complexo usando Flexbox!
        </Text>
        <TouchableOpacity style={styles.cardButton} activeOpacity={0.8}>
          <Text style={styles.cardButtonText}>Ação</Text>
        </TouchableOpacity>
      </View>

      <CodeBlock
        code={`const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5, // Android
  },
});`}
      />

      <Text style={styles.sectionTitle}>📚 Propriedades Comuns</Text>

      <View style={styles.propList}>
        <View style={styles.propItem}>
          <Text style={styles.propName}>backgroundColor</Text>
          <Text style={styles.propValue}>Cor de fundo</Text>
        </View>
        <View style={styles.propItem}>
          <Text style={styles.propName}>padding / margin</Text>
          <Text style={styles.propValue}>Espaçamento interno/externo</Text>
        </View>
        <View style={styles.propItem}>
          <Text style={styles.propName}>borderRadius</Text>
          <Text style={styles.propValue}>Bordas arredondadas</Text>
        </View>
        <View style={styles.propItem}>
          <Text style={styles.propName}>fontSize / fontWeight</Text>
          <Text style={styles.propValue}>Tamanho e peso da fonte</Text>
        </View>
      </View>

      <Text style={styles.tip}>
        💡 <Text style={styles.highlight}>Dica:</Text> Use StyleSheet.create() ao invés de objetos
        inline para melhor performance. Os estilos são otimizados e reutilizados!
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
  exerciseTitle: {
    fontSize: 14,
    color: '#6C8CFF',
    fontWeight: '600',
    marginBottom: 12,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  box: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    borderRadius: 8,
  },
  smallBox: {
    width: 60,
    height: 60,
    borderRadius: 8,
    margin: 4,
  },
  boxText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '800',
  },
  cardExample: {
    backgroundColor: '#1E2A3A',
    borderRadius: 16,
    padding: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#2A3250',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#6C8CFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 24,
  },
  cardInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E8EEFF',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#A9B4D0',
  },
  cardContent: {
    fontSize: 14,
    color: '#A9B4D0',
    lineHeight: 20,
    marginBottom: 12,
  },
  cardButton: {
    backgroundColor: '#6C8CFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cardButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  propList: {
    backgroundColor: '#151B2B',
    borderRadius: 12,
    padding: 12,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#2A3250',
  },
  propItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2A3250',
  },
  propName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6C8CFF',
  },
  propValue: {
    fontSize: 14,
    color: '#A9B4D0',
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
