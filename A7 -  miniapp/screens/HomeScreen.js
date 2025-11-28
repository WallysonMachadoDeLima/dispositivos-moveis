import { ScrollView, StyleSheet, Text, View } from 'react-native';
import LessonCard from '../components/LessonCard';

export default function HomeScreen({ navigation }) {
  const lessons = [
    // BÁSICO
    {
      id: 0,
      title: 'Introdução ao React Native',
      description: 'O que é React Native, JSX, props e estrutura',
      icon: '📚',
      difficulty: 'Básico',
      screen: 'Exercise0',
    },
    {
      id: 6,
      title: 'Criando Componentes',
      description: 'Crie componentes reutilizáveis',
      icon: '🧩',
      difficulty: 'Básico',
      screen: 'Exercise6',
    },
    {
      id: 5,
      title: 'Estilos & Layouts',
      description: 'StyleSheet e Flexbox',
      icon: '🎨',
      difficulty: 'Básico',
      screen: 'Exercise5',
    },
    {
      id: 3,
      title: 'FlatList',
      description: 'Renderize listas eficientemente',
      icon: '📜',
      difficulty: 'Básico',
      screen: 'Exercise3',
    },
    // INTERMEDIÁRIO
    {
      id: 1,
      title: 'useState Hook',
      description: 'Gerencie estado em componentes funcionais',
      icon: '📦',
      difficulty: 'Intermediário',
      screen: 'Exercise1',
    },
    {
      id: 2,
      title: 'useEffect Hook',
      description: 'Efeitos colaterais e ciclo de vida',
      icon: '⚡',
      difficulty: 'Intermediário',
      screen: 'Exercise2',
    },
    {
      id: 7,
      title: 'Formulários e Validação',
      description: 'Manipule formulários com validação',
      icon: '📝',
      difficulty: 'Intermediário',
      screen: 'Exercise7',
    },
    // AVANÇADO
    {
      id: 4,
      title: 'APIs Nativas',
      description: 'Animated, Alert, Vibration e Dimensions',
      icon: '🔧',
      difficulty: 'Avançado',
      screen: 'Exercise4',
    },
    {
      id: 8,
      title: 'Mini-Game Completo',
      description: 'Combine todos os conceitos em um jogo',
      icon: '🚀',
      difficulty: 'Avançado',
      screen: 'Exercise8',
    },
    // PRÁTICO E AVALIAÇÃO
    {
      id: 9,
      title: 'Desafio de Código',
      description: 'Escreva código para resolver desafios',
      icon: '⌨️',
      difficulty: 'Prático',
      screen: 'Exercise9',
    },
    {
      id: 10,
      title: 'Quiz Final',
      description: 'Teste com 10 perguntas (nota 0-100)',
      icon: '📝',
      difficulty: 'Avaliação',
      screen: 'Exercise10',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>React Native</Text>
        <Text style={styles.subtitle}>Learning Lab 🚀</Text>
        <Text style={styles.description}>
          Aprenda React Native através de exercícios práticos e interativos
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>📚 Exercícios Disponíveis</Text>

        {lessons.map(lesson => (
          <LessonCard
            key={lesson.id}
            title={lesson.title}
            description={lesson.description}
            icon={lesson.icon}
            difficulty={lesson.difficulty}
            onPress={() => navigation.navigate(lesson.screen)}
          />
        ))}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            💡 Clique em qualquer exercício para começar!
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1020',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#151B2B',
    borderBottomWidth: 1,
    borderBottomColor: '#2A3250',
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#E8EEFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6C8CFF',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#A9B4D0',
    lineHeight: 24,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E8EEFF',
    marginLeft: 20,
    marginBottom: 16,
  },
  footer: {
    backgroundColor: '#1E2A3A',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#6C8CFF',
  },
  footerText: {
    color: '#A9B4D0',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});
