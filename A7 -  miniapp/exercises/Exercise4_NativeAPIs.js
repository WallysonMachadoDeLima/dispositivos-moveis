import { useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    Vibration,
    View,
} from 'react-native';
import CodeBlock from '../components/CodeBlock';
import ExerciseContainer from '../components/ExerciseContainer';

const { width } = Dimensions.get('window');

export default function Exercise4_NativeAPIs() {
  const [escala] = useState(new Animated.Value(1));
  const [rotacao] = useState(new Animated.Value(0));

  const animarEscala = () => {
    Animated.sequence([
      Animated.spring(escala, {
        toValue: 1.5,
        useNativeDriver: true,
      }),
      Animated.spring(escala, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const animarRotacao = () => {
    rotacao.setValue(0);
    Animated.timing(rotacao, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const rotacaoInterpolada = rotacao.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const mostrarAlerta = () => {
    Alert.alert(
      '🎉 Alerta Nativo!',
      'Este é um alerta usando a API nativa do React Native',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => console.log('OK pressionado'),
        },
      ]
    );
  };

  const vibrar = () => {
    Vibration.vibrate([0, 100, 50, 100, 50, 200]);
  };

  const obterDimensoes = () => {
    const { width, height } = Dimensions.get('window');
    Alert.alert(
      '📱 Dimensões da Tela',
      `Largura: ${width.toFixed(0)}px\nAltura: ${height.toFixed(0)}px`
    );
  };

  return (
    <ExerciseContainer
      title="🔧 APIs Nativas"
      subtitle="Explore recursos nativos do React Native"
    >
      <Text style={styles.sectionTitle}>O que são APIs Nativas?</Text>
      <Text style={styles.text}>
        React Native fornece acesso a recursos nativos do dispositivo através de APIs JavaScript.
        Você pode usar funcionalidades como animações, alertas, vibrações, dimensões e muito mais!
      </Text>

      <Text style={styles.sectionTitle}>🎯 Exercício 1: Animated API</Text>
      <Text style={styles.text}>
        Use a <Text style={styles.highlight}>Animated API</Text> para criar animações suaves e
        performáticas:
      </Text>

      <View style={styles.exerciseBox}>
        <Animated.View
          style={[
            styles.animatedBox,
            {
              transform: [{ scale: escala }, { rotate: rotacaoInterpolada }],
            },
          ]}
        >
          <Text style={styles.animatedText}>🎨</Text>
        </Animated.View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.animButton} onPress={animarEscala} activeOpacity={0.7}>
            <Text style={styles.animButtonText}>📏 Escalar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.animButton} onPress={animarRotacao} activeOpacity={0.7}>
            <Text style={styles.animButtonText}>🔄 Rotacionar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <CodeBlock
        code={`import { Animated } from 'react-native';

const [escala] = useState(new Animated.Value(1));

const animar = () => {
  Animated.spring(escala, {
    toValue: 1.5,
    useNativeDriver: true,
  }).start();
};

<Animated.View 
  style={{ transform: [{ scale: escala }] }}
/>`}
      />

      <Text style={styles.sectionTitle}>🎯 Exercício 2: Alert API</Text>
      <Text style={styles.text}>
        Use <Text style={styles.highlight}>Alert</Text> para mostrar diálogos nativos:
      </Text>

      <View style={styles.exerciseBox}>
        <TouchableOpacity style={styles.apiButton} onPress={mostrarAlerta} activeOpacity={0.8}>
          <Text style={styles.apiButtonText}>🔔 Mostrar Alerta</Text>
        </TouchableOpacity>
      </View>

      <CodeBlock
        code={`import { Alert } from 'react-native';

Alert.alert(
  'Título',
  'Mensagem aqui',
  [
    { text: 'Cancelar', style: 'cancel' },
    { text: 'OK', onPress: () => {} }
  ]
);`}
      />

      <Text style={styles.sectionTitle}>🎯 Exercício 3: Vibration API</Text>
      <Text style={styles.text}>
        Use <Text style={styles.highlight}>Vibration</Text> para fornecer feedback tátil:
      </Text>

      <View style={styles.exerciseBox}>
        <TouchableOpacity style={styles.apiButton} onPress={vibrar} activeOpacity={0.8}>
          <Text style={styles.apiButtonText}>📳 Vibrar</Text>
        </TouchableOpacity>
      </View>

      <CodeBlock
        code={`import { Vibration } from 'react-native';

// Vibração simples
Vibration.vibrate(100);

// Padrão: [espera, vibra, espera, vibra]
Vibration.vibrate([0, 100, 50, 100]);`}
      />

      <Text style={styles.sectionTitle}>🎯 Exercício 4: Dimensions API</Text>
      <Text style={styles.text}>
        Use <Text style={styles.highlight}>Dimensions</Text> para obter informações da tela:
      </Text>

      <View style={styles.exerciseBox}>
        <TouchableOpacity style={styles.apiButton} onPress={obterDimensoes} activeOpacity={0.8}>
          <Text style={styles.apiButtonText}>📐 Ver Dimensões</Text>
        </TouchableOpacity>
      </View>

      <CodeBlock
        code={`import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

console.log('Largura:', width);
console.log('Altura:', height);`}
      />

      <Text style={styles.tip}>
        💡 <Text style={styles.highlight}>Importante:</Text> As APIs nativas permitem acessar
        funcionalidades do dispositivo diretamente do JavaScript, mantendo a experiência nativa!
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
    padding: 20,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#2A3250',
    alignItems: 'center',
  },
  animatedBox: {
    width: 120,
    height: 120,
    backgroundColor: '#6C8CFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  animatedText: {
    fontSize: 48,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  animButton: {
    backgroundColor: '#2A3F5F',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6C8CFF',
  },
  animButtonText: {
    color: '#E8EEFF',
    fontWeight: '700',
    fontSize: 14,
  },
  apiButton: {
    backgroundColor: '#6C8CFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  apiButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
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
