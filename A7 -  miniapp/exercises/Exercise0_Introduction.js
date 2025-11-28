import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CodeBlock from '../components/CodeBlock';
import ExerciseContainer from '../components/ExerciseContainer';

export default function Exercise0_Introduction() {
  const [showExample1, setShowExample1] = useState(false);
  const [showExample2, setShowExample2] = useState(false);

  return (
    <ExerciseContainer
      title="🎓 Introdução ao React Native"
      subtitle="Fundamentos essenciais antes de começar"
    >
      <Text style={styles.sectionTitle}>Bem-vindo ao React Native! 👋</Text>
      <Text style={styles.text}>
        React Native é um framework que permite criar aplicativos mobile usando JavaScript e React.
        Você escreve código uma vez e ele funciona tanto no iOS quanto no Android!
      </Text>

      <View style={styles.highlightBox}>
        <Text style={styles.highlightText}>
          💡 Diferente do desenvolvimento web, aqui não usamos HTML. Usamos componentes nativos do
          React Native!
        </Text>
      </View>

      <Text style={styles.sectionTitle}>📦 O que são Componentes?</Text>
      <Text style={styles.text}>
        Componentes são blocos de construção reutilizáveis. Pense neles como peças de LEGO que você
        combina para criar sua interface.
      </Text>

      <CodeBlock
        code={`// Exemplo de componente simples
function MeuComponente() {
  return (
    <View>
      <Text>Olá, Mundo!</Text>
    </View>
  );
}`}
      />

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>🧩 Componentes Básicos:</Text>
        <Text style={styles.infoItem}>• <Text style={styles.bold}>View</Text> - Container (como uma div)</Text>
        <Text style={styles.infoItem}>• <Text style={styles.bold}>Text</Text> - Texto (como p ou span)</Text>
        <Text style={styles.infoItem}>• <Text style={styles.bold}>Button</Text> - Botão interativo</Text>
        <Text style={styles.infoItem}>• <Text style={styles.bold}>TextInput</Text> - Campo de texto</Text>
        <Text style={styles.infoItem}>• <Text style={styles.bold}>Image</Text> - Imagens</Text>
      </View>

      <Text style={styles.sectionTitle}>🎨 JSX - A Sintaxe do React</Text>
      <Text style={styles.text}>
        JSX é uma sintaxe que parece HTML mas é JavaScript. Permite escrever a estrutura da
        interface de forma declarativa.
      </Text>

      <CodeBlock
        code={`// JSX permite misturar marcação com lógica
function Saudacao({ nome }) {
  return (
    <View>
      <Text>Olá, {nome}!</Text>
      {nome === 'João' && <Text>Bem-vindo de volta!</Text>}
    </View>
  );
}`}
      />

      <View style={styles.ruleBox}>
        <Text style={styles.ruleTitle}>📋 Regras do JSX:</Text>
        <Text style={styles.ruleItem}>1. Todo componente deve retornar um único elemento pai</Text>
        <Text style={styles.ruleItem}>2. Use {`{}`} para inserir JavaScript</Text>
        <Text style={styles.ruleItem}>3. Atributos em camelCase (onClick → onPress)</Text>
        <Text style={styles.ruleItem}>4. Tags devem ser fechadas: {`<Image />`}</Text>
      </View>

      <Text style={styles.sectionTitle}>🔧 O que são Props (Parâmetros)?</Text>
      <Text style={styles.text}>
        Props (propriedades) são parâmetros que você passa para componentes, como argumentos de uma
        função. Eles permitem customizar e reutilizar componentes.
      </Text>

      <CodeBlock
        code={`// Componente com props
function Cartao({ titulo, descricao, cor }) {
  return (
    <View style={{ backgroundColor: cor }}>
      <Text>{titulo}</Text>
      <Text>{descricao}</Text>
    </View>
  );
}

// Usando o componente
<Cartao 
  titulo="React Native" 
  descricao="É incrível!" 
  cor="blue" 
/>`}
      />

      <Text style={styles.sectionTitle}>🎯 Exemplo Interativo: Props</Text>
      <Text style={styles.text}>Veja como props funcionam na prática:</Text>

      <TouchableOpacity
        style={styles.demoButton}
        onPress={() => setShowExample1(!showExample1)}
        activeOpacity={0.8}
      >
        <Text style={styles.demoButtonText}>
          {showExample1 ? '🔼 Ocultar Exemplo' : '▶️ Mostrar Exemplo'}
        </Text>
      </TouchableOpacity>

      {showExample1 && (
        <View style={styles.exampleBox}>
          <ComponenteDemo titulo="Primeiro Card" cor="#6C8CFF" />
          <View style={styles.spacer} />
          <ComponenteDemo titulo="Segundo Card" cor="#4CAF50" />
          <View style={styles.spacer} />
          <ComponenteDemo titulo="Terceiro Card" cor="#FF9800" />
          <Text style={styles.exampleNote}>
            ✨ Mesmo componente, props diferentes = resultados diferentes!
          </Text>
        </View>
      )}

      <Text style={styles.sectionTitle}>📐 Estrutura de um Projeto React Native</Text>
      <Text style={styles.text}>Entenda como organizar seu código:</Text>

      <View style={styles.structureBox}>
        <Text style={styles.structureItem}>📂 <Text style={styles.bold}>components/</Text> - Componentes reutilizáveis</Text>
        <Text style={styles.structureItem}>📂 <Text style={styles.bold}>screens/</Text> - Telas do aplicativo</Text>
        <Text style={styles.structureItem}>📂 <Text style={styles.bold}>assets/</Text> - Imagens, fontes, etc</Text>
        <Text style={styles.structureItem}>📄 <Text style={styles.bold}>App.js</Text> - Ponto de entrada</Text>
      </View>

      <CodeBlock
        code={`// Estrutura típica de um arquivo
// 1. Imports
import React from 'react';
import { View, Text } from 'react-native';

// 2. Componente principal
export default function MeuApp() {
  return (
    <View>
      <Text>Meu App</Text>
    </View>
  );
}

// 3. Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});`}
      />

      <Text style={styles.sectionTitle}>🎨 Estilos no React Native</Text>
      <Text style={styles.text}>
        Estilos são escritos em JavaScript, não CSS. Mas muitas propriedades são similares!
      </Text>

      <CodeBlock
        code={`import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,                    // Ocupa todo espaço
    backgroundColor: '#fff',    // Cor de fundo
    padding: 20,                // Espaçamento interno
    justifyContent: 'center',   // Alinha verticalmente
    alignItems: 'center',       // Alinha horizontalmente
  },
  texto: {
    fontSize: 16,               // Tamanho da fonte
    color: '#333',              // Cor do texto
    fontWeight: 'bold',         // Negrito
  },
});`}
      />

      <View style={styles.compareBox}>
        <Text style={styles.compareTitle}>CSS vs React Native:</Text>
        <Text style={styles.compareItem}>• background-color → <Text style={styles.code}>backgroundColor</Text></Text>
        <Text style={styles.compareItem}>• font-size → <Text style={styles.code}>fontSize</Text></Text>
        <Text style={styles.compareItem}>• margin-top → <Text style={styles.code}>marginTop</Text></Text>
        <Text style={styles.compareItem}>• Valores numéricos sem 'px'</Text>
      </View>

      <Text style={styles.sectionTitle}>🎯 Exemplo Interativo: Estilos</Text>

      <TouchableOpacity
        style={styles.demoButton}
        onPress={() => setShowExample2(!showExample2)}
        activeOpacity={0.8}
      >
        <Text style={styles.demoButtonText}>
          {showExample2 ? '🔼 Ocultar Exemplo' : '▶️ Mostrar Exemplo de Estilos'}
        </Text>
      </TouchableOpacity>

      {showExample2 && (
        <View style={styles.exampleBox}>
          <View style={styles.styleExample1}>
            <Text style={styles.styleExampleText}>padding: 20</Text>
          </View>
          <View style={styles.styleExample2}>
            <Text style={styles.styleExampleText}>borderRadius: 15</Text>
          </View>
          <View style={styles.styleExample3}>
            <Text style={styles.styleExampleText}>flexDirection: 'row'</Text>
            <View style={styles.miniBox} />
            <View style={styles.miniBox} />
            <View style={styles.miniBox} />
          </View>
        </View>
      )}

      <Text style={styles.sectionTitle}>🚀 Pronto para Começar!</Text>
      <View style={styles.finalBox}>
        <Text style={styles.finalTitle}>✅ Você aprendeu:</Text>
        <Text style={styles.finalItem}>✓ O que é React Native</Text>
        <Text style={styles.finalItem}>✓ Componentes básicos</Text>
        <Text style={styles.finalItem}>✓ Sintaxe JSX</Text>
        <Text style={styles.finalItem}>✓ Props (parâmetros)</Text>
        <Text style={styles.finalItem}>✓ Estrutura de projeto</Text>
        <Text style={styles.finalItem}>✓ Como funcionam os estilos</Text>
      </View>

      <View style={styles.nextStepBox}>
        <Text style={styles.nextStepText}>
          🎯 Agora você está pronto para os exercícios práticos! Comece pelo primeiro exercício
          simples e vá avançando gradualmente.
        </Text>
      </View>
    </ExerciseContainer>
  );
}

// Componente de demonstração
function ComponenteDemo({ titulo, cor }) {
  return (
    <View style={[styles.demoCard, { borderLeftColor: cor }]}>
      <View style={[styles.demoIndicator, { backgroundColor: cor }]} />
      <View style={styles.demoContent}>
        <Text style={styles.demoTitle}>{titulo}</Text>
        <Text style={styles.demoText}>Cor: {cor}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E8EEFF',
    marginTop: 24,
    marginBottom: 12,
  },
  text: {
    fontSize: 15,
    color: '#A9B4D0',
    lineHeight: 24,
    marginBottom: 12,
  },
  highlightBox: {
    backgroundColor: '#1E2A3A',
    borderLeftWidth: 4,
    borderLeftColor: '#6C8CFF',
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
  },
  highlightText: {
    color: '#E8EEFF',
    fontSize: 14,
    lineHeight: 22,
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
  bold: {
    fontWeight: '700',
    color: '#6C8CFF',
  },
  ruleBox: {
    backgroundColor: '#1E2A3A',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#6C8CFF',
  },
  ruleTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E8EEFF',
    marginBottom: 12,
  },
  ruleItem: {
    fontSize: 14,
    color: '#A9B4D0',
    marginBottom: 8,
    lineHeight: 20,
  },
  demoButton: {
    backgroundColor: '#6C8CFF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginVertical: 12,
    alignItems: 'center',
  },
  demoButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  exampleBox: {
    backgroundColor: '#151B2B',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#2A3250',
  },
  demoCard: {
    flexDirection: 'row',
    backgroundColor: '#1E2A3A',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    borderLeftWidth: 4,
  },
  demoIndicator: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  demoContent: {
    flex: 1,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E8EEFF',
  },
  demoText: {
    fontSize: 13,
    color: '#A9B4D0',
    marginTop: 4,
  },
  spacer: {
    height: 12,
  },
  exampleNote: {
    fontSize: 13,
    color: '#6C8CFF',
    fontStyle: 'italic',
    marginTop: 12,
    textAlign: 'center',
  },
  structureBox: {
    backgroundColor: '#151B2B',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#2A3250',
  },
  structureItem: {
    fontSize: 14,
    color: '#A9B4D0',
    marginBottom: 10,
    lineHeight: 20,
  },
  compareBox: {
    backgroundColor: '#1E2A3A',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
  },
  compareTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E8EEFF',
    marginBottom: 12,
  },
  compareItem: {
    fontSize: 14,
    color: '#A9B4D0',
    marginBottom: 8,
    lineHeight: 20,
  },
  code: {
    fontFamily: 'Courier',
    color: '#6C8CFF',
    fontSize: 13,
  },
  styleExample1: {
    backgroundColor: '#2A3F5F',
    padding: 20,
    borderRadius: 8,
    marginBottom: 12,
  },
  styleExample2: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 15,
    marginBottom: 12,
  },
  styleExample3: {
    backgroundColor: '#FF9800',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  styleExampleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  miniBox: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 4,
    marginLeft: 8,
  },
  finalBox: {
    backgroundColor: '#1E2A3A',
    borderRadius: 12,
    padding: 20,
    marginVertical: 16,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  finalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4CAF50',
    marginBottom: 16,
  },
  finalItem: {
    fontSize: 15,
    color: '#E8EEFF',
    marginBottom: 8,
    lineHeight: 22,
  },
  nextStepBox: {
    backgroundColor: '#6C8CFF',
    borderRadius: 12,
    padding: 20,
    marginTop: 8,
  },
  nextStepText: {
    fontSize: 15,
    color: '#fff',
    lineHeight: 24,
    textAlign: 'center',
  },
});
