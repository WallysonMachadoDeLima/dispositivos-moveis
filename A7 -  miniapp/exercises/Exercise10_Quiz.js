import { useState } from 'react';
import {
    Alert,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import ExerciseContainer from '../components/ExerciseContainer';

const { width } = Dimensions.get('window');

const QUESTIONS = [
  {
    id: 1,
    question: 'O que é React Native?',
    options: [
      'Uma biblioteca para criar sites',
      'Um framework para criar aplicativos móveis nativos usando JavaScript',
      'Uma linguagem de programação',
      'Um banco de dados',
    ],
    correct: 1,
    explanation: 'React Native permite criar apps nativos iOS e Android usando JavaScript/React.',
  },
  {
    id: 2,
    question: 'Qual hook usamos para criar estados em componentes funcionais?',
    options: ['useEffect', 'useState', 'useContext', 'useReducer'],
    correct: 1,
    explanation: 'useState é o hook para gerenciar estados locais em componentes funcionais.',
  },
  {
    id: 3,
    question: 'Para o que serve o useEffect?',
    options: [
      'Para criar estados',
      'Para executar efeitos colaterais e lógica de ciclo de vida',
      'Para navegar entre telas',
      'Para estilizar componentes',
    ],
    correct: 1,
    explanation: 'useEffect lida com efeitos colaterais como chamadas de API, timers, etc.',
  },
  {
    id: 4,
    question: 'Qual componente usamos para renderizar listas eficientemente?',
    options: ['ListView', 'FlatList', 'ScrollView', 'MapList'],
    correct: 1,
    explanation: 'FlatList é otimizado para grandes listas, renderizando apenas itens visíveis.',
  },
  {
    id: 5,
    question: 'Como se chama a sintaxe que mistura HTML com JavaScript?',
    options: ['XML', 'JSX', 'HTML', 'TSX'],
    correct: 1,
    explanation: 'JSX (JavaScript XML) é a sintaxe que permite escrever elementos no código JS.',
  },
  {
    id: 6,
    question: 'Qual prop é usada para capturar cliques em TouchableOpacity?',
    options: ['onClick', 'onPress', 'onTap', 'onTouch'],
    correct: 1,
    explanation: 'onPress é a prop padrão do React Native para capturar toques.',
  },
  {
    id: 7,
    question: 'O que são props em React Native?',
    options: [
      'Propriedades CSS',
      'Parâmetros passados de um componente pai para filho',
      'Estados internos do componente',
      'Funções de navegação',
    ],
    correct: 1,
    explanation: 'Props são parâmetros imutáveis passados entre componentes.',
  },
  {
    id: 8,
    question: 'Qual API usamos para criar animações no React Native?',
    options: ['Animate', 'Motion', 'Animated', 'Spring'],
    correct: 2,
    explanation: 'A Animated API é a principal biblioteca de animações do React Native.',
  },
  {
    id: 9,
    question: 'Como definimos estilos no React Native?',
    options: [
      'Usando arquivos CSS externos',
      'Com StyleSheet.create() ou objetos inline',
      'Com classes CSS',
      'Apenas com Styled Components',
    ],
    correct: 1,
    explanation: 'Usamos StyleSheet.create() para performance ou objetos JavaScript inline.',
  },
  {
    id: 10,
    question: 'O que acontece quando o array de dependências do useEffect está vazio []?',
    options: [
      'O efeito nunca executa',
      'O efeito executa apenas uma vez, na montagem',
      'O efeito executa em todo render',
      'Causa um erro',
    ],
    correct: 1,
    explanation: 'Array vazio [] faz o useEffect executar apenas uma vez quando o componente monta.',
  },
];

export default function Exercise10_Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const question = QUESTIONS[currentQuestion];
  const isLastQuestion = currentQuestion === QUESTIONS.length - 1;
  const hasSelectedAnswer = selectedAnswers[question.id] !== undefined;

  const handleSelectAnswer = (optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [question.id]: optionIndex,
    });
    setShowExplanation(false);
  };

  const handleNext = () => {
    if (!hasSelectedAnswer) {
      Alert.alert('⚠️ Atenção', 'Por favor, selecione uma resposta antes de continuar.');
      return;
    }

    if (isLastQuestion) {
      calculateResults();
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setShowExplanation(false);
    }
  };

  const calculateResults = () => {
    setShowResults(true);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setShowExplanation(false);
  };

  const correctAnswers = QUESTIONS.filter(
    (q) => selectedAnswers[q.id] === q.correct
  ).length;
  const score = Math.round((correctAnswers / QUESTIONS.length) * 100);

  const getScoreColor = (score) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FFB020';
    return '#F44336';
  };

  const getScoreMessage = (score) => {
    if (score === 100) return '🏆 Perfeito! Você dominou React Native!';
    if (score >= 80) return '🎉 Excelente! Você está muito bem!';
    if (score >= 60) return '👍 Bom trabalho! Continue estudando!';
    if (score >= 40) return '📚 Continue praticando, você vai conseguir!';
    return '💪 Não desista! Revise os exercícios e tente novamente!';
  };

  if (showResults) {
    return (
      <ExerciseContainer
        title="📊 Resultado do Quiz"
        subtitle="Veja como você se saiu!"
      >
        <View style={styles.resultsContainer}>
          <View style={[styles.scoreCircle, { borderColor: getScoreColor(score) }]}>
            <Text style={[styles.scoreNumber, { color: getScoreColor(score) }]}>
              {score}
            </Text>
            <Text style={styles.scoreLabel}>pontos</Text>
          </View>

          <Text style={styles.scoreMessage}>{getScoreMessage(score)}</Text>

          <View style={styles.statsBox}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{correctAnswers}</Text>
              <Text style={styles.statLabel}>Corretas</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{QUESTIONS.length - correctAnswers}</Text>
              <Text style={styles.statLabel}>Erradas</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{QUESTIONS.length}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>

          <View style={styles.reviewBox}>
            <Text style={styles.reviewTitle}>📝 Revisão das Respostas:</Text>
            {QUESTIONS.map((q, index) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correct;
              return (
                <View key={q.id} style={styles.reviewItem}>
                  <View style={styles.reviewHeader}>
                    <Text style={styles.reviewNumber}>{index + 1}.</Text>
                    <Text style={styles.reviewQuestion}>{q.question}</Text>
                    <Text style={isCorrect ? styles.correctIcon : styles.wrongIcon}>
                      {isCorrect ? '✓' : '✗'}
                    </Text>
                  </View>
                  {!isCorrect && (
                    <View style={styles.reviewDetails}>
                      <Text style={styles.reviewLabel}>Sua resposta:</Text>
                      <Text style={styles.wrongAnswer}>{q.options[userAnswer]}</Text>
                      <Text style={styles.reviewLabel}>Resposta correta:</Text>
                      <Text style={styles.correctAnswer}>{q.options[q.correct]}</Text>
                      <Text style={styles.explanation}>{q.explanation}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>

          <TouchableOpacity
            style={styles.restartButton}
            onPress={restartQuiz}
            activeOpacity={0.8}
          >
            <Text style={styles.restartButtonText}>🔄 Tentar Novamente</Text>
          </TouchableOpacity>
        </View>
      </ExerciseContainer>
    );
  }

  return (
    <ExerciseContainer
      title="📝 Quiz Final"
      subtitle="Teste seus conhecimentos em React Native"
    >
      <View style={styles.progressHeader}>
        <Text style={styles.progressText}>
          Pergunta {currentQuestion + 1} de {QUESTIONS.length}
        </Text>
        <View style={styles.progressBarContainer}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` },
            ]}
          />
        </View>
      </View>

      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{question.question}</Text>

        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => {
            const isSelected = selectedAnswers[question.id] === index;
            const isCorrect = index === question.correct;
            const showCorrect = showExplanation && isCorrect;
            const showWrong = showExplanation && isSelected && !isCorrect;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  isSelected && styles.selectedOption,
                  showCorrect && styles.correctOption,
                  showWrong && styles.wrongOption,
                ]}
                onPress={() => handleSelectAnswer(index)}
                activeOpacity={0.7}
              >
                <View style={styles.optionContent}>
                  <View
                    style={[
                      styles.optionCircle,
                      isSelected && styles.selectedCircle,
                      showCorrect && styles.correctCircle,
                      showWrong && styles.wrongCircle,
                    ]}
                  >
                    {isSelected && <View style={styles.innerCircle} />}
                  </View>
                  <Text
                    style={[
                      styles.optionText,
                      (isSelected || showCorrect || showWrong) && styles.selectedOptionText,
                    ]}
                  >
                    {option}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {showExplanation && (
          <View style={styles.explanationBox}>
            <Text style={styles.explanationTitle}>💡 Explicação:</Text>
            <Text style={styles.explanationText}>{question.explanation}</Text>
          </View>
        )}
      </View>

      {hasSelectedAnswer && !showExplanation && (
        <TouchableOpacity
          style={styles.checkAnswerButton}
          onPress={() => setShowExplanation(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.checkAnswerText}>👁️ Ver Resposta Correta</Text>
        </TouchableOpacity>
      )}

      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={[
            styles.navButton,
            styles.prevButton,
            currentQuestion === 0 && styles.disabledButton,
          ]}
          onPress={handlePrevious}
          disabled={currentQuestion === 0}
          activeOpacity={0.8}
        >
          <Text style={styles.navButtonText}>← Anterior</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            styles.nextButton,
            !hasSelectedAnswer && styles.disabledButton,
          ]}
          onPress={handleNext}
          disabled={!hasSelectedAnswer}
          activeOpacity={0.8}
        >
          <Text style={styles.nextButtonText}>
            {isLastQuestion ? '✓ Finalizar' : 'Próxima →'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tipBox}>
        <Text style={styles.tipTitle}>💡 Dica:</Text>
        <Text style={styles.tipText}>
          Você pode revisar suas respostas usando o botão "Anterior" antes de finalizar o quiz.
        </Text>
      </View>
    </ExerciseContainer>
  );
}

const styles = StyleSheet.create({
  progressHeader: {
    marginBottom: 20,
  },
  progressText: {
    fontSize: 15,
    color: '#A9B4D0',
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#1E293B',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6C8CFF',
    borderRadius: 4,
  },
  questionCard: {
    backgroundColor: '#151B2B',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A3250',
  },
  questionText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E8EEFF',
    lineHeight: 26,
    marginBottom: 20,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#0D1117',
    borderRadius: 10,
    padding: 16,
    borderWidth: 2,
    borderColor: '#2A3250',
  },
  selectedOption: {
    borderColor: '#6C8CFF',
    backgroundColor: '#1E2A40',
  },
  correctOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#1B2E1F',
  },
  wrongOption: {
    borderColor: '#F44336',
    backgroundColor: '#2E1B1B',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6B7280',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCircle: {
    borderColor: '#6C8CFF',
  },
  correctCircle: {
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF50',
  },
  wrongCircle: {
    borderColor: '#F44336',
    backgroundColor: '#F44336',
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#6C8CFF',
  },
  optionText: {
    fontSize: 15,
    color: '#A9B4D0',
    lineHeight: 22,
    flex: 1,
  },
  selectedOptionText: {
    color: '#E8EEFF',
    fontWeight: '600',
  },
  explanationBox: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#1E2A3A',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#FFB020',
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFB020',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    color: '#A9B4D0',
    lineHeight: 22,
  },
  checkAnswerButton: {
    backgroundColor: '#FFB020',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  checkAnswerText: {
    color: '#0D1117',
    fontSize: 15,
    fontWeight: '700',
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  navButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  prevButton: {
    backgroundColor: '#1E293B',
  },
  nextButton: {
    backgroundColor: '#6C8CFF',
  },
  navButtonText: {
    color: '#A9B4D0',
    fontSize: 15,
    fontWeight: '600',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  disabledButton: {
    opacity: 0.4,
  },
  tipBox: {
    backgroundColor: '#1E2A3A',
    borderRadius: 10,
    padding: 16,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6C8CFF',
    marginBottom: 6,
  },
  tipText: {
    fontSize: 13,
    color: '#A9B4D0',
    lineHeight: 20,
  },
  // Results styles
  resultsContainer: {
    alignItems: 'center',
  },
  scoreCircle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  scoreNumber: {
    fontSize: 64,
    fontWeight: '800',
  },
  scoreLabel: {
    fontSize: 16,
    color: '#A9B4D0',
    marginTop: 4,
  },
  scoreMessage: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E8EEFF',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  statsBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#6C8CFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#A9B4D0',
    marginTop: 4,
  },
  reviewBox: {
    width: '100%',
    backgroundColor: '#151B2B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A3250',
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E8EEFF',
    marginBottom: 16,
  },
  reviewItem: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2A3250',
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  reviewNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6C8CFF',
    marginRight: 8,
  },
  reviewQuestion: {
    flex: 1,
    fontSize: 14,
    color: '#E8EEFF',
    lineHeight: 20,
  },
  correctIcon: {
    fontSize: 20,
    color: '#4CAF50',
    marginLeft: 8,
  },
  wrongIcon: {
    fontSize: 20,
    color: '#F44336',
    marginLeft: 8,
  },
  reviewDetails: {
    marginTop: 12,
    marginLeft: 22,
  },
  reviewLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    fontWeight: '600',
  },
  wrongAnswer: {
    fontSize: 13,
    color: '#F44336',
    marginBottom: 8,
  },
  correctAnswer: {
    fontSize: 13,
    color: '#4CAF50',
    marginBottom: 8,
  },
  explanation: {
    fontSize: 12,
    color: '#A9B4D0',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  restartButton: {
    backgroundColor: '#6C8CFF',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: 'center',
  },
  restartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
