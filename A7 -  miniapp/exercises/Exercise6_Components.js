import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CodeBlock from '../components/CodeBlock';
import ExerciseContainer from '../components/ExerciseContainer';

export default function Exercise6_Components() {
  const [likes, setLikes] = useState(0);
  const [showImage, setShowImage] = useState(true);

  return (
    <ExerciseContainer
      title="🧩 Componentes e Props"
      subtitle="Aprenda a criar e usar componentes reutilizáveis"
    >
      <Text style={styles.sectionTitle}>O que você vai aprender</Text>
      <Text style={styles.text}>
        Componentes são a base do React Native. Neste exercício você aprenderá a criar, customizar
        e reutilizar componentes.
      </Text>

      <Text style={styles.sectionTitle}>📦 Criando um Componente</Text>
      <Text style={styles.text}>
        Um componente é uma função que retorna JSX. Veja este exemplo:
      </Text>

      <CodeBlock
        code={`function Botao({ texto, cor }) {
  return (
    <TouchableOpacity 
      style={{ backgroundColor: cor }}
    >
      <Text>{texto}</Text>
    </TouchableOpacity>
  );
}`}
      />

      <Text style={styles.sectionTitle}>🎯 Exercício 1: Botão de Like</Text>
      <Text style={styles.text}>
        Veja um componente funcional que usa estado e props:
      </Text>

      <View style={styles.exerciseBox}>
        <View style={styles.likesDisplay}>
          <Text style={styles.likesIcon}>❤️</Text>
          <Text style={styles.likesCount}>{likes}</Text>
          <Text style={styles.likesText}>curtidas</Text>
        </View>

        <TouchableOpacity
          style={styles.likeButton}
          onPress={() => setLikes(likes + 1)}
          activeOpacity={0.8}
        >
          <Text style={styles.likeButtonText}>👍 Curtir</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => setLikes(0)}
          activeOpacity={0.8}
        >
          <Text style={styles.resetButtonText}>🔄 Resetar</Text>
        </TouchableOpacity>
      </View>

      <CodeBlock
        code={`function BotaoLike() {
  const [likes, setLikes] = useState(0);
  
  return (
    <View>
      <Text>{likes} curtidas</Text>
      <TouchableOpacity 
        onPress={() => setLikes(likes + 1)}
      >
        <Text>Curtir</Text>
      </TouchableOpacity>
    </View>
  );
}`}
      />

      <Text style={styles.sectionTitle}>🎯 Exercício 2: Componente com Condicional</Text>
      <Text style={styles.text}>
        Componentes podem renderizar conteúdo diferente baseado em condições:
      </Text>

      <View style={styles.exerciseBox}>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowImage(!showImage)}
          activeOpacity={0.8}
        >
          <Text style={styles.toggleButtonText}>
            {showImage ? '🙈 Ocultar Imagem' : '👁️ Mostrar Imagem'}
          </Text>
        </TouchableOpacity>

        {showImage && (
          <View style={styles.imageContainer}>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imagePlaceholderText}>🖼️</Text>
              <Text style={styles.imagePlaceholderSubtext}>Imagem de Exemplo</Text>
            </View>
          </View>
        )}
      </View>

      <CodeBlock
        code={`function ImagemToggle() {
  const [mostrar, setMostrar] = useState(true);
  
  return (
    <View>
      <Button 
        title={mostrar ? "Ocultar" : "Mostrar"}
        onPress={() => setMostrar(!mostrar)}
      />
      
      {mostrar && (
        <Image source={{ uri: 'url-da-imagem' }} />
      )}
    </View>
  );
}`}
      />

      <Text style={styles.sectionTitle}>🎨 Componentes Reutilizáveis</Text>
      <Text style={styles.text}>
        Crie componentes que podem ser usados múltiplas vezes com props diferentes:
      </Text>

      <View style={styles.exerciseBox}>
        <Card
          icon="🚀"
          title="React Native"
          description="Framework mobile"
          color="#6C8CFF"
        />
        <Card
          icon="⚛️"
          title="React"
          description="Biblioteca JavaScript"
          color="#61DAFB"
        />
        <Card
          icon="📱"
          title="Mobile"
          description="Apps nativos"
          color="#4CAF50"
        />
      </View>

      <CodeBlock
        code={`function Card({ icon, title, description, color }) {
  return (
    <View style={{ borderLeftColor: color }}>
      <Text>{icon}</Text>
      <Text>{title}</Text>
      <Text>{description}</Text>
    </View>
  );
}

// Uso:
<Card 
  icon="🚀" 
  title="React Native" 
  description="Framework mobile"
  color="#6C8CFF"
/>`}
      />

      <View style={styles.tipBox}>
        <Text style={styles.tipTitle}>💡 Dicas Importantes:</Text>
        <Text style={styles.tipText}>
          • Componentes devem começar com letra maiúscula
        </Text>
        <Text style={styles.tipText}>
          • Props tornam componentes flexíveis e reutilizáveis
        </Text>
        <Text style={styles.tipText}>
          • Use estado para valores que mudam ao longo do tempo
        </Text>
        <Text style={styles.tipText}>
          • Componentes pequenos são mais fáceis de manter
        </Text>
      </View>

      <View style={styles.summaryBox}>
        <Text style={styles.summaryTitle}>✅ Você aprendeu:</Text>
        <Text style={styles.summaryItem}>✓ Como criar componentes funcionais</Text>
        <Text style={styles.summaryItem}>✓ Como passar e usar props</Text>
        <Text style={styles.summaryItem}>✓ Renderização condicional</Text>
        <Text style={styles.summaryItem}>✓ Reutilizar componentes</Text>
      </View>
    </ExerciseContainer>
  );
}

// Componente Card reutilizável
function Card({ icon, title, description, color }) {
  return (
    <View style={[styles.card, { borderLeftColor: color }]}>
      <Text style={styles.cardIcon}>{icon}</Text>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
      <View style={[styles.cardIndicator, { backgroundColor: color }]} />
    </View>
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
  exerciseBox: {
    backgroundColor: '#151B2B',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#2A3250',
  },
  likesDisplay: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  likesIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  likesCount: {
    fontSize: 36,
    fontWeight: '800',
    color: '#E8EEFF',
    marginBottom: 4,
  },
  likesText: {
    fontSize: 16,
    color: '#A9B4D0',
  },
  likeButton: {
    backgroundColor: '#6C8CFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 8,
  },
  likeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  resetButton: {
    backgroundColor: '#2A3250',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#A9B4D0',
    fontSize: 14,
    fontWeight: '600',
  },
  toggleButton: {
    backgroundColor: '#6C8CFF',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  imageContainer: {
    marginTop: 8,
  },
  imagePlaceholder: {
    backgroundColor: '#2A3F5F',
    height: 150,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 48,
    marginBottom: 8,
  },
  imagePlaceholderSubtext: {
    fontSize: 14,
    color: '#A9B4D0',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1E2A3A',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    borderLeftWidth: 4,
  },
  cardIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E8EEFF',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    color: '#A9B4D0',
  },
  cardIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 12,
  },
  tipBox: {
    backgroundColor: '#1E2A3A',
    borderLeftWidth: 4,
    borderLeftColor: '#6C8CFF',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E8EEFF',
    marginBottom: 12,
  },
  tipText: {
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
