import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Vibration,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  // Estados
  const [tempoInicialEmMinutos, setTempoInicialEmMinutos] = useState('25');
  const [segundosRestantes, setSegundosRestantes] = useState(25 * 60);
  const [ativo, setAtivo] = useState(false);
  const [sessoesCompletas, setSessoesCompletas] = useState(0);
  const [tempoTotalEstudado, setTempoTotalEstudado] = useState(0); // em segundos

  // useEffect para controlar o timer
  useEffect(() => {
    let intervalo = null;

    if (ativo && segundosRestantes > 0) {
      intervalo = setInterval(() => {
        setSegundosRestantes((segundos) => segundos - 1);
      }, 1000);
    } else if (!ativo && intervalo) {
      clearInterval(intervalo);
    }

    return () => {
      if (intervalo) clearInterval(intervalo);
    };
  }, [ativo, segundosRestantes]);

  // useEffect para detectar quando o tempo chegar a zero
  useEffect(() => {
    if (segundosRestantes === 0 && ativo) {
      // Parar o timer
      setAtivo(false);

      // Incrementar sessões completas
      setSessoesCompletas((prev) => prev + 1);

      // Atualizar tempo total estudado
      const tempoSessao = parseInt(tempoInicialEmMinutos) * 60 || 0;
      setTempoTotalEstudado((prev) => prev + tempoSessao);

      // Vibração
      Vibration.vibrate([0, 500, 200, 500]);

      // Alerta
      Alert.alert(
        '🎉 Sessão Concluída!',
        `Parabéns! Você completou ${parseInt(tempoInicialEmMinutos)} minutos de estudo.`,
        [{ text: 'OK' }]
      );
    }
  }, [segundosRestantes, ativo, tempoInicialEmMinutos]);

  // Funções de controle
  const iniciar = () => {
    if (segundosRestantes > 0) {
      setAtivo(true);
    }
  };

  const pausar = () => {
    setAtivo(false);
  };

  const resetar = () => {
    setAtivo(false);
    const minutos = parseInt(tempoInicialEmMinutos) || 25;
    setSegundosRestantes(minutos * 60);
  };

  const atualizarTempoInicial = (texto) => {
    setTempoInicialEmMinutos(texto);
    if (!ativo) {
      const minutos = parseInt(texto) || 0;
      setSegundosRestantes(minutos * 60);
    }
  };

  // Formatação do tempo em MM:SS
  const formatarTempo = (segundos) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Formatação do tempo total estudado
  const formatarTempoTotal = (segundos) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    if (horas > 0) {
      return `${horas}h ${minutos}m`;
    }
    return `${minutos}m`;
  };

  // Determinar cor do display (vermelho se < 60s)
  const corDisplay = segundosRestantes < 60 && segundosRestantes > 0 ? '#ff4444' : '#2196F3';

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.titulo}>⏱️ Temporizador de Estudos</Text>

        {/* Configuração de tempo */}
        <View style={styles.configuracao}>
          <Text style={styles.label}>Tempo da sessão (minutos):</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={tempoInicialEmMinutos}
            onChangeText={atualizarTempoInicial}
            editable={!ativo}
            placeholder="25"
          />
        </View>

        {/* Display do timer */}
        <View style={[styles.displayContainer, { borderColor: corDisplay }]}>
          <Text style={[styles.display, { color: corDisplay }]}>
            {formatarTempo(segundosRestantes)}
          </Text>
          {segundosRestantes < 60 && segundosRestantes > 0 && (
            <Text style={styles.alerta}>⚠️ Menos de 1 minuto!</Text>
          )}
          {segundosRestantes === 0 && (
            <Text style={styles.mensagemFim}>✅ Tempo finalizado!</Text>
          )}
        </View>

        {/* Botões de controle */}
        <View style={styles.botoesContainer}>
          <Pressable
            style={[styles.botao, styles.botaoIniciar, ativo && styles.botaoDesabilitado]}
            onPress={iniciar}
            disabled={ativo || segundosRestantes === 0}
          >
            <Text style={styles.textoBotao}>▶️ Iniciar</Text>
          </Pressable>

          <Pressable
            style={[styles.botao, styles.botaoPausar, !ativo && styles.botaoDesabilitado]}
            onPress={pausar}
            disabled={!ativo}
          >
            <Text style={styles.textoBotao}>⏸️ Pausar</Text>
          </Pressable>

          <Pressable
            style={[styles.botao, styles.botaoResetar]}
            onPress={resetar}
          >
            <Text style={styles.textoBotao}>🔄 Resetar</Text>
          </Pressable>
        </View>

        {/* Estatísticas */}
        <View style={styles.estatisticas}>
          <Text style={styles.tituloEstatisticas}>📊 Estatísticas</Text>
          
          <View style={styles.estatisticaItem}>
            <Text style={styles.estatisticaLabel}>Sessões completas:</Text>
            <Text style={styles.estatisticaValor}>{sessoesCompletas}</Text>
          </View>

          <View style={styles.estatisticaItem}>
            <Text style={styles.estatisticaLabel}>Tempo total estudado:</Text>
            <Text style={styles.estatisticaValor}>{formatarTempoTotal(tempoTotalEstudado)}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  configuracao: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
    fontWeight: '600',
  },
  input: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    backgroundColor: '#fafafa',
  },
  displayContainer: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  display: {
    fontSize: 72,
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
  },
  alerta: {
    marginTop: 10,
    fontSize: 16,
    color: '#ff4444',
    fontWeight: 'bold',
  },
  mensagemFim: {
    marginTop: 10,
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 10,
  },
  botao: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  botaoIniciar: {
    backgroundColor: '#4CAF50',
  },
  botaoPausar: {
    backgroundColor: '#FF9800',
  },
  botaoResetar: {
    backgroundColor: '#2196F3',
  },
  botaoDesabilitado: {
    opacity: 0.5,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  estatisticas: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tituloEstatisticas: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  estatisticaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  estatisticaLabel: {
    fontSize: 16,
    color: '#666',
  },
  estatisticaValor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
});
