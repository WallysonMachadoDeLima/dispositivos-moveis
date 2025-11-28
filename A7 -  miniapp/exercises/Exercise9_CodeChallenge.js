import { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import ExerciseContainer from '../components/ExerciseContainer';

const CHALLENGES = [
  {
    id: 1,
    title: '📦 Criar uma Caixa Azul',
    description: 'Crie um View com largura 100, altura 100 e cor de fundo azul (#2196F3)',
    expectedCode: '<View style={{ width: 100, height: 100, backgroundColor: \'#2196F3\' }} />',
    hint: 'Use a propriedade style com um objeto contendo width, height e backgroundColor',
    difficulty: 'Fácil',
  },
  {
    id: 2,
    title: '🔢 Contador com useState',
    description: 'Declare um state chamado "count" com valor inicial 0 usando useState',
    expectedCode: 'const [count, setCount] = useState(0);',
    hint: 'useState retorna um array com o valor e a função para atualizar',
    difficulty: 'Fácil',
  },
  {
    id: 3,
    title: '🎨 Texto Estilizado',
    description: 'Crie um Text com cor branca, tamanho 20 e negrito',
    expectedCode: '<Text style={{ color: \'white\', fontSize: 20, fontWeight: \'bold\' }}>Texto</Text>',
    hint: 'Use fontWeight: "bold" para deixar em negrito',
    difficulty: 'Médio',
  },
  {
    id: 4,
    title: '🔘 Botão com onPress',
    description: 'Crie um TouchableOpacity que chama a função handlePress quando clicado',
    expectedCode: '<TouchableOpacity onPress={handlePress}><Text>Clique</Text></TouchableOpacity>',
    hint: 'Use a prop onPress para executar uma função ao clicar',
    difficulty: 'Médio',
  },
  {
    id: 5,
    title: '⚡ useEffect Básico',
    description: 'Crie um useEffect que executa apenas uma vez ao montar o componente',
    expectedCode: 'useEffect(() => { console.log(\'montado\'); }, []);',
    hint: 'O array vazio [] como segundo parâmetro faz executar apenas uma vez',
    difficulty: 'Difícil',
  },
];

export default function Exercise9_CodeChallenge() {
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [solved, setSolved] = useState([]);
  const [showHint, setShowHint] = useState(false);

  const challenge = CHALLENGES[currentChallenge];

  const normalizeCode = (code) => {
    return code
      .replace(/\s+/g, '') // Remove espaços
      .replace(/"/g, "'") // Normaliza aspas
      .replace(/;$/g, '') // Remove ponto e vírgula final
      .replace(/>texto<\/text>/gi, '>texto</text>') // Normaliza texto
      .replace(/>clique<\/text>/gi, '>clique</text>') // Normaliza texto clique
      .toLowerCase();
  };

  const checkCodeMatch = (userCode, expectedCode) => {
    const normalizedUser = normalizeCode(userCode);
    const normalizedExpected = normalizeCode(expectedCode);
    
    // Verifica correspondência exata primeiro
    if (normalizedUser === normalizedExpected) return true;
    
    // Verificações flexíveis por desafio
    const challenge = CHALLENGES[currentChallenge];
    
    // Para o desafio da View azul, verifica se contém os elementos essenciais
    if (challenge.id === 1) {
      return normalizedUser.includes('view') &&
             normalizedUser.includes('width:100') &&
             normalizedUser.includes('height:100') &&
             (normalizedUser.includes("backgroundcolor:'#2196f3'") || normalizedUser.includes('backgroundcolor:\'#2196f3\''));
    }
    
    // Para useState
    if (challenge.id === 2) {
      return normalizedUser.includes('const[count,setcount]=usestate(0)');
    }
    
    // Para Text estilizado
    if (challenge.id === 3) {
      return normalizedUser.includes('text') &&
             (normalizedUser.includes("color:'white'") || normalizedUser.includes('color:\'white\'')) &&
             normalizedUser.includes('fontsize:20') &&
             (normalizedUser.includes("fontweight:'bold'") || normalizedUser.includes('fontweight:\'bold\''));
    }
    
    // Para TouchableOpacity
    if (challenge.id === 4) {
      return normalizedUser.includes('touchableopacity') &&
             normalizedUser.includes('onpress={handlepress}');
    }
    
    // Para useEffect
    if (challenge.id === 5) {
      return normalizedUser.includes('useeffect') &&
             normalizedUser.includes('[],')  || normalizedUser.includes('[])');
    }
    
    return false;
  };

  const checkAnswer = () => {
    setAttempts(attempts + 1);

    if (checkCodeMatch(userCode, challenge.expectedCode)) {
      setSolved([...solved, challenge.id]);
      Alert.alert(
        '🎉 Correto!',
        `Parabéns! Você resolveu o desafio em ${attempts + 1} tentativa(s).`,
        [
          {
            text: 'Próximo',
            onPress: () => {
              if (currentChallenge < CHALLENGES.length - 1) {
                setCurrentChallenge(currentChallenge + 1);
                setUserCode('');
                setShowHint(false);
                setAttempts(0);
              } else {
                Alert.alert(
                  '🏆 Parabéns!',
                  `Você completou todos os desafios!\n\nTotal de tentativas: ${attempts + solved.length}`,
                  [{ text: 'OK' }]
                );
              }
            },
          },
        ]
      );
    } else {
      Alert.alert(
        '❌ Tente novamente',
        'O código não está correto. Verifique a sintaxe e tente novamente.',
        [
          { text: 'Ver Dica', onPress: () => setShowHint(true) },
          { text: 'Tentar de novo', style: 'cancel' },
        ]
      );
    }
  };

  const skipChallenge = () => {
    Alert.alert(
      '⏭️ Pular Desafio',
      'Tem certeza que quer pular este desafio?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sim, pular',
          onPress: () => {
            if (currentChallenge < CHALLENGES.length - 1) {
              setCurrentChallenge(currentChallenge + 1);
              setUserCode('');
              setShowHint(false);
              setAttempts(0);
            }
          },
        },
      ]
    );
  };

  const resetChallenge = () => {
    setCurrentChallenge(0);
    setUserCode('');
    setSolved([]);
    setShowHint(false);
    setAttempts(0);
  };

  const progress = ((solved.length / CHALLENGES.length) * 100).toFixed(0);

  return (
    <ExerciseContainer
      title="⌨️ Desafio de Código"
      subtitle="Digite o código para resolver os desafios"
    >
      <View style={styles.header}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {solved.length} de {CHALLENGES.length} completados ({progress}%)
          </Text>
        </View>

        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetChallenge}
          activeOpacity={0.7}
        >
          <Text style={styles.resetButtonText}>🔄 Reiniciar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.challengeCard}>
        <View style={styles.challengeHeader}>
          <Text style={styles.challengeTitle}>{challenge.title}</Text>
          <View
            style={[
              styles.difficultyBadge,
              challenge.difficulty === 'Fácil' && styles.easyBadge,
              challenge.difficulty === 'Médio' && styles.mediumBadge,
              challenge.difficulty === 'Difícil' && styles.hardBadge,
            ]}
          >
            <Text style={styles.difficultyText}>{challenge.difficulty}</Text>
          </View>
        </View>

        <Text style={styles.challengeDescription}>{challenge.description}</Text>

        <Text style={styles.label}>💻 Digite seu código:</Text>
        <TextInput
          style={styles.codeInput}
          value={userCode}
          onChangeText={setUserCode}
          placeholder="Digite o código aqui..."
          placeholderTextColor="#6B7280"
          multiline
          autoCapitalize="none"
          autoCorrect={false}
        />

        {showHint && (
          <View style={styles.hintBox}>
            <Text style={styles.hintTitle}>💡 Dica:</Text>
            <Text style={styles.hintText}>{challenge.hint}</Text>
          </View>
        )}

        <View style={styles.statsRow}>
          <Text style={styles.statsText}>Tentativas: {attempts}</Text>
          <TouchableOpacity onPress={() => setShowHint(!showHint)}>
            <Text style={styles.hintLink}>{showHint ? '🙈 Esconder' : '💡 Ver'} Dica</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.skipButton]}
            onPress={skipChallenge}
            activeOpacity={0.8}
          >
            <Text style={styles.skipButtonText}>⏭️ Pular</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.checkButton, !userCode && styles.disabledButton]}
            onPress={checkAnswer}
            disabled={!userCode}
            activeOpacity={0.8}
          >
            <Text style={styles.checkButtonText}>✓ Verificar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>📝 Instruções:</Text>
        <Text style={styles.infoText}>
          • Digite o código exatamente como solicitado
        </Text>
        <Text style={styles.infoText}>
          • Use aspas simples (') ou duplas (")
        </Text>
        <Text style={styles.infoText}>
          • Preste atenção aos detalhes de sintaxe
        </Text>
        <Text style={styles.infoText}>
          • Se errar, use a dica para ajudar
        </Text>
      </View>

      <View style={styles.challengesListBox}>
        <Text style={styles.listTitle}>🎯 Lista de Desafios:</Text>
        {CHALLENGES.map((ch, index) => (
          <View key={ch.id} style={styles.listItem}>
            <Text style={styles.listNumber}>{index + 1}.</Text>
            <Text style={[styles.listText, solved.includes(ch.id) && styles.solvedText]}>
              {ch.title}
            </Text>
            {solved.includes(ch.id) && <Text style={styles.checkMark}>✓</Text>}
          </View>
        ))}
      </View>

      <View style={styles.tipBox}>
        <Text style={styles.tipTitle}>💡 Dica Final:</Text>
        <Text style={styles.tipText}>
          Este exercício simula o desenvolvimento real: você precisa escrever código preciso.
          Preste atenção em cada caractere, vírgula e parêntese!
        </Text>
      </View>
    </ExerciseContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#1E293B',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#A9B4D0',
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#1E293B',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  resetButtonText: {
    color: '#6C8CFF',
    fontSize: 14,
    fontWeight: '600',
  },
  challengeCard: {
    backgroundColor: '#151B2B',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A3250',
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E8EEFF',
    flex: 1,
  },
  difficultyBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  easyBadge: {
    backgroundColor: '#4CAF50',
  },
  mediumBadge: {
    backgroundColor: '#FF9800',
  },
  hardBadge: {
    backgroundColor: '#F44336',
  },
  difficultyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  challengeDescription: {
    fontSize: 15,
    color: '#A9B4D0',
    lineHeight: 22,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E8EEFF',
    marginBottom: 8,
  },
  codeInput: {
    backgroundColor: '#0D1117',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: '#E8EEFF',
    fontFamily: 'monospace',
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#2A3250',
    marginBottom: 12,
  },
  hintBox: {
    backgroundColor: '#1E2A3A',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#FFB020',
  },
  hintTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFB020',
    marginBottom: 6,
  },
  hintText: {
    fontSize: 13,
    color: '#A9B4D0',
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statsText: {
    fontSize: 13,
    color: '#A9B4D0',
  },
  hintLink: {
    fontSize: 13,
    color: '#6C8CFF',
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  skipButton: {
    backgroundColor: '#1E293B',
  },
  skipButtonText: {
    color: '#A9B4D0',
    fontSize: 16,
    fontWeight: '600',
  },
  checkButton: {
    backgroundColor: '#6C8CFF',
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  disabledButton: {
    opacity: 0.5,
  },
  infoBox: {
    backgroundColor: '#1E2A3A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E8EEFF',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#A9B4D0',
    marginBottom: 6,
    lineHeight: 20,
  },
  challengesListBox: {
    backgroundColor: '#151B2B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2A3250',
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E8EEFF',
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  listNumber: {
    fontSize: 14,
    color: '#6C8CFF',
    fontWeight: '600',
    marginRight: 8,
    width: 20,
  },
  listText: {
    fontSize: 14,
    color: '#A9B4D0',
    flex: 1,
  },
  solvedText: {
    color: '#4CAF50',
    textDecorationLine: 'line-through',
  },
  checkMark: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '700',
  },
  tipBox: {
    backgroundColor: '#2A3F5F',
    borderRadius: 12,
    padding: 16,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E8EEFF',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#A9B4D0',
    lineHeight: 22,
  },
});
