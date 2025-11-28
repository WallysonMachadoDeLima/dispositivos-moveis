import { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
import CodeBlock from '../components/CodeBlock';
import ExerciseContainer from '../components/ExerciseContainer';

export default function Exercise2_Effect() {
  const [segundos, setSegundos] = useState(0);
  const [rodando, setRodando] = useState(false);
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(false);

  // Exercício 1: Timer
  useEffect(() => {
    let interval;
    if (rodando) {
      interval = setInterval(() => {
        setSegundos(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [rodando]);

  // Exercício 2: Fetch de dados
  const buscarDados = () => {
    setCarregando(true);
    fetch('https://api.github.com/users/github')
      .then(res => res.json())
      .then(data => {
        setDados(data);
        setCarregando(false);
      })
      .catch(() => setCarregando(false));
  };

  return (
    <ExerciseContainer
      title="⚡ useEffect Hook"
      subtitle="Gerencie efeitos colaterais e ciclo de vida dos componentes"
    >
      <Text style={styles.sectionTitle}>O que é useEffect?</Text>
      <Text style={styles.text}>
        O <Text style={styles.highlight}>useEffect</Text> permite executar efeitos colaterais em
        componentes funcionais, como chamadas de API, timers, ou subscriptions.
      </Text>

      <CodeBlock
        code={`import { useEffect, useState } from 'react';

function Exemplo() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    // Executa após cada render
    document.title = \`Você clicou \${count} vezes\`;
    
    // Função de limpeza (cleanup)
    return () => {
      console.log('Limpando...');
    };
  }, [count]); // Dependências
}`}
      />

      <Text style={styles.sectionTitle}>🎯 Exercício 1: Cronômetro</Text>
      <Text style={styles.text}>
        Use <Text style={styles.highlight}>useEffect</Text> para criar um cronômetro que atualiza a
        cada segundo:
      </Text>

      <View style={styles.exerciseBox}>
        <Text style={styles.timerText}>{segundos}s</Text>
        <View style={styles.buttonRow}>
          <View style={styles.buttonWrapper}>
            {!rodando ? (
              <Button title="▶️ Iniciar" onPress={() => setRodando(true)} color="#4CAF50" />
            ) : (
              <Button title="⏸️ Pausar" onPress={() => setRodando(false)} color="#FF9800" />
            )}
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              title="🔄 Resetar"
              onPress={() => {
                setRodando(false);
                setSegundos(0);
              }}
              color="#F44336"
            />
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>🎯 Exercício 2: Fetch de API</Text>
      <Text style={styles.text}>
        Use <Text style={styles.highlight}>useEffect</Text> para buscar dados de uma API externa:
      </Text>

      <View style={styles.exerciseBox}>
        {!dados && !carregando && (
          <Button title="📡 Buscar Dados do GitHub" onPress={buscarDados} color="#6C8CFF" />
        )}

        {carregando && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6C8CFF" />
            <Text style={styles.loadingText}>Carregando...</Text>
          </View>
        )}

        {dados && (
          <View style={styles.dataContainer}>
            <Text style={styles.dataTitle}>✅ Dados Carregados!</Text>
            <Text style={styles.dataText}>👤 Login: {dados.login}</Text>
            <Text style={styles.dataText}>📝 Nome: {dados.name}</Text>
            <Text style={styles.dataText}>👥 Seguidores: {dados.followers}</Text>
            <Text style={styles.dataText}>📚 Repos: {dados.public_repos}</Text>
            <Button
              title="Buscar Novamente"
              onPress={() => {
                setDados(null);
                buscarDados();
              }}
              color="#6C8CFF"
            />
          </View>
        )}
      </View>

      <Text style={styles.tip}>
        💡 <Text style={styles.highlight}>Importante:</Text> O array de dependências define quando
        o efeito será executado. Um array vazio [] executa apenas uma vez, após a montagem do
        componente.
      </Text>

      <CodeBlock
        code={`// Executa após cada render
useEffect(() => {
  console.log('Renderizou!');
});

// Executa apenas na montagem
useEffect(() => {
  console.log('Componente montado!');
}, []);

// Executa quando 'valor' muda
useEffect(() => {
  console.log('Valor mudou!');
}, [valor]);`}
      />
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
  timerText: {
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
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    color: '#A9B4D0',
    marginTop: 12,
    fontSize: 16,
  },
  dataContainer: {
    padding: 8,
  },
  dataTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4CAF50',
    marginBottom: 16,
    textAlign: 'center',
  },
  dataText: {
    fontSize: 16,
    color: '#E8EEFF',
    marginBottom: 8,
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
