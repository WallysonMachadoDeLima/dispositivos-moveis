import { useEffect, useRef, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import CodeBlock from '../components/CodeBlock';
import ExerciseContainer from '../components/ExerciseContainer';

const { width } = Dimensions.get('window');

export default function Exercise8_Advanced() {
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [boxes, setBoxes] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    let interval;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setTimeLeft(10);
    generateBoxes();
  };

  const generateBoxes = () => {
    const targetIndex = Math.floor(Math.random() * 6);
    const newBoxes = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      isTarget: i === targetIndex,
      color: i === targetIndex ? '#4CAF50' : '#6C8CFF',
    }));
    setBoxes(newBoxes);
  };

  const handleBoxPress = (box) => {
    if (!isPlaying) return;

    if (box.isTarget) {
      setScore(score + 10);
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      generateBoxes();
    } else {
      setScore(Math.max(0, score - 5));
    }
  };

  const endGame = () => {
    setIsPlaying(false);
    Alert.alert(
      '🎮 Fim de Jogo!',
      `Sua pontuação: ${score} pontos\n\n${
        score >= 50 ? '🏆 Excelente!' : score >= 30 ? '👍 Bom trabalho!' : '💪 Tente novamente!'
      }`,
      [{ text: 'OK' }]
    );
  };

  return (
    <ExerciseContainer
      title="🚀 Exercício Avançado"
      subtitle="Combinando múltiplos conceitos em um mini-game"
    >
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.sectionTitle}>🎯 Desafio Avançado</Text>
        <Text style={styles.text}>
          Este exercício combina tudo que você aprendeu: hooks, animações, listas, eventos e
          lógica complexa. Vamos criar um mini-game!
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>📚 Conceitos Utilizados:</Text>
          <Text style={styles.infoItem}>• useState - Gerenciar múltiplos estados</Text>
          <Text style={styles.infoItem}>• useEffect - Temporizador e ciclo de vida</Text>
          <Text style={styles.infoItem}>• useRef - Valores que persistem</Text>
          <Text style={styles.infoItem}>• Animated API - Animações complexas</Text>
          <Text style={styles.infoItem}>• Array methods - map, filter, etc</Text>
          <Text style={styles.infoItem}>• Lógica condicional avançada</Text>
        </View>

        <Text style={styles.sectionTitle}>🎮 Mini-Game: Encontre a Caixa Verde</Text>
        <Text style={styles.text}>
          Clique na caixa verde antes do tempo acabar! Cada acerto vale 10 pontos, erro perde 5.
        </Text>

        <Animated.View style={[styles.gameBox, { transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.gameHeader}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Pontos</Text>
              <Text style={styles.statValue}>{score}</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Tempo</Text>
              <Text style={[styles.statValue, timeLeft <= 3 && styles.statDanger]}>
                {timeLeft}s
              </Text>
            </View>
          </View>

          {!isPlaying ? (
            <TouchableOpacity
              style={styles.startButton}
              onPress={startGame}
              activeOpacity={0.8}
            >
              <Text style={styles.startButtonText}>▶️ Iniciar Jogo</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.gridContainer}>
              {boxes.map(box => (
                <TouchableOpacity
                  key={box.id}
                  style={[styles.box, { backgroundColor: box.color }]}
                  onPress={() => handleBoxPress(box)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.boxText}>?</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {isPlaying && (
            <TouchableOpacity
              style={styles.stopButton}
              onPress={endGame}
              activeOpacity={0.8}
            >
              <Text style={styles.stopButtonText}>⏹️ Parar</Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        <Text style={styles.sectionTitle}>💻 Código por Trás do Game</Text>
        <Text style={styles.text}>
          Veja como os conceitos são combinados:
        </Text>

        <CodeBlock
          code={`// 1. Estados múltiplos
const [score, setScore] = useState(0);
const [isPlaying, setIsPlaying] = useState(false);
const [timeLeft, setTimeLeft] = useState(10);

// 2. Ref para animação
const scaleAnim = useRef(new Animated.Value(1)).current;

// 3. useEffect para temporizador
useEffect(() => {
  let interval;
  if (isPlaying && timeLeft > 0) {
    interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
  }
  return () => clearInterval(interval);
}, [isPlaying, timeLeft]);

// 4. Lógica de jogo
const handleBoxPress = (box) => {
  if (box.isTarget) {
    setScore(score + 10);
    // Animar acerto
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }
};`}
        />

        <View style={styles.conceptBox}>
          <Text style={styles.conceptTitle}>🧠 Por que isso é Avançado?</Text>
          <Text style={styles.conceptText}>
            <Text style={styles.bold}>1. Múltiplos Estados Sincronizados</Text>
            {'\n'}O jogo gerencia pontuação, tempo e estado de jogo simultaneamente.
          </Text>
          <Text style={styles.conceptText}>
            <Text style={styles.bold}>2. useEffect com Cleanup</Text>
            {'\n'}O timer é limpo adequadamente para evitar memory leaks.
          </Text>
          <Text style={styles.conceptText}>
            <Text style={styles.bold}>3. Animações Sequenciais</Text>
            {'\n'}Usa Animated.sequence para criar feedback visual complexo.
          </Text>
          <Text style={styles.conceptText}>
            <Text style={styles.bold}>4. Geração Dinâmica de UI</Text>
            {'\n'}Caixas são geradas aleatoriamente a cada rodada.
          </Text>
          <Text style={styles.conceptText}>
            <Text style={styles.bold}>5. Lógica Condicional Complexa</Text>
            {'\n'}Diferentes renders baseados no estado do jogo.
          </Text>
        </View>

        <View style={styles.challengeBox}>
          <Text style={styles.challengeTitle}>💪 Desafios Extras:</Text>
          <Text style={styles.challengeItem}>
            1. Adicionar níveis de dificuldade (mais caixas)
          </Text>
          <Text style={styles.challengeItem}>
            2. Implementar ranking de pontuações
          </Text>
          <Text style={styles.challengeItem}>
            3. Adicionar sons e vibrações
          </Text>
          <Text style={styles.challengeItem}>
            4. Criar power-ups e bonus
          </Text>
          <Text style={styles.challengeItem}>
            5. Salvar melhor pontuação localmente
          </Text>
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>🎓 O que você dominou:</Text>
          <Text style={styles.summaryItem}>✓ Combinar múltiplos hooks</Text>
          <Text style={styles.summaryItem}>✓ Criar lógica de jogo</Text>
          <Text style={styles.summaryItem}>✓ Animações sequenciais</Text>
          <Text style={styles.summaryItem}>✓ Gerenciar estados complexos</Text>
          <Text style={styles.summaryItem}>✓ Cleanup de efeitos</Text>
          <Text style={styles.summaryItem}>✓ UI dinâmica e responsiva</Text>
        </View>
      </Animated.View>
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
  infoBox: {
    backgroundColor: '#151B2B',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#2A3250',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E8EEFF',
    marginBottom: 12,
  },
  infoItem: {
    fontSize: 14,
    color: '#A9B4D0',
    marginBottom: 8,
    lineHeight: 20,
  },
  gameBox: {
    backgroundColor: '#151B2B',
    borderRadius: 12,
    padding: 20,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#2A3250',
  },
  gameHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#A9B4D0',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#E8EEFF',
  },
  statDanger: {
    color: '#F44336',
  },
  startButton: {
    backgroundColor: '#6C8CFF',
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  box: {
    width: (width - 100) / 3,
    height: 80,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  boxText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '700',
  },
  stopButton: {
    backgroundColor: '#F44336',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  stopButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  conceptBox: {
    backgroundColor: '#1E2A3A',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6C8CFF',
  },
  conceptTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E8EEFF',
    marginBottom: 12,
  },
  conceptText: {
    fontSize: 14,
    color: '#A9B4D0',
    marginBottom: 12,
    lineHeight: 22,
  },
  bold: {
    fontWeight: '700',
    color: '#6C8CFF',
  },
  challengeBox: {
    backgroundColor: '#2A3F5F',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E8EEFF',
    marginBottom: 12,
  },
  challengeItem: {
    fontSize: 14,
    color: '#A9B4D0',
    marginBottom: 8,
    lineHeight: 20,
  },
  summaryBox: {
    backgroundColor: '#1E2A3A',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4CAF50',
    marginBottom: 12,
  },
  summaryItem: {
    fontSize: 15,
    color: '#E8EEFF',
    marginBottom: 8,
    lineHeight: 22,
  },
});
