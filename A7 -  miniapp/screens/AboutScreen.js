import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AboutScreen() {
  const openGitHub = () => {
    Linking.openURL('https://reactnative.dev/docs/getting-started');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.icon}>📱</Text>
        <Text style={styles.title}>Sobre o App</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎯 Objetivo</Text>
        <Text style={styles.cardText}>
          Este app foi desenvolvido para ensinar React Native de forma prática e interativa. Cada
          exercício demonstra conceitos fundamentais através de exemplos funcionais que você pode
          experimentar em tempo real.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📚 O que você aprenderá</Text>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>
            <Text style={styles.highlight}>Hooks:</Text> useState e useEffect
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>
            <Text style={styles.highlight}>Componentes:</Text> FlatList e componentes customizados
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>
            <Text style={styles.highlight}>APIs Nativas:</Text> Animated, Alert, Vibration,
            Dimensions
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>
            <Text style={styles.highlight}>Estilos:</Text> StyleSheet e Flexbox
          </Text>
        </View>
        <View style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>
            <Text style={styles.highlight}>Navegação:</Text> React Navigation Stack e Bottom Tabs
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🚀 Recursos Utilizados</Text>
        <Text style={styles.cardText}>
          Este app demonstra diversos recursos nativos do React Native:
        </Text>
        <View style={styles.featureBox}>
          <Text style={styles.featureText}>✅ Navegação entre telas (Stack & Bottom Tabs)</Text>
          <Text style={styles.featureText}>✅ Animações nativas (Animated API)</Text>
          <Text style={styles.featureText}>✅ Alertas nativos (Alert API)</Text>
          <Text style={styles.featureText}>✅ Feedback háptico (Vibration API)</Text>
          <Text style={styles.featureText}>✅ Informações do dispositivo (Dimensions API)</Text>
          <Text style={styles.featureText}>✅ Listas otimizadas (FlatList)</Text>
          <Text style={styles.featureText}>✅ Requisições HTTP (Fetch API)</Text>
          <Text style={styles.featureText}>✅ Gestos e interações touch</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>👨‍💻 Metodologia</Text>
        <Text style={styles.cardText}>
          Cada exercício apresenta:
        </Text>
        <Text style={styles.methodText}>1️⃣ Explicação teórica do conceito</Text>
        <Text style={styles.methodText}>2️⃣ Exemplos de código comentados</Text>
        <Text style={styles.methodText}>3️⃣ Exercícios práticos interativos</Text>
        <Text style={styles.methodText}>4️⃣ Dicas e boas práticas</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>📖 Documentação Oficial</Text>
        <Text style={styles.cardText}>
          Para se aprofundar ainda mais, visite a documentação oficial:
        </Text>
        <TouchableOpacity style={styles.linkButton} onPress={openGitHub} activeOpacity={0.8}>
          <Text style={styles.linkButtonText}>🔗 React Native Docs</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Desenvolvido para ensinar React Native 💙
        </Text>
        <Text style={styles.version}>v1.0.0</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1020',
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  icon: {
    fontSize: 64,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#E8EEFF',
  },
  card: {
    backgroundColor: '#151B2B',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2A3250',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#E8EEFF',
    marginBottom: 12,
  },
  cardText: {
    fontSize: 15,
    color: '#A9B4D0',
    lineHeight: 24,
    marginBottom: 12,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bullet: {
    color: '#6C8CFF',
    fontSize: 18,
    marginRight: 12,
    fontWeight: '700',
  },
  listText: {
    flex: 1,
    fontSize: 15,
    color: '#A9B4D0',
    lineHeight: 22,
  },
  highlight: {
    color: '#6C8CFF',
    fontWeight: '700',
  },
  featureBox: {
    backgroundColor: '#0B1020',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#A9B4D0',
    marginBottom: 8,
    lineHeight: 20,
  },
  methodText: {
    fontSize: 15,
    color: '#A9B4D0',
    marginBottom: 8,
    lineHeight: 22,
  },
  linkButton: {
    backgroundColor: '#6C8CFF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  linkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#2A3250',
  },
  footerText: {
    fontSize: 16,
    color: '#A9B4D0',
    marginBottom: 8,
  },
  version: {
    fontSize: 12,
    color: '#6C8CFF',
    fontWeight: '600',
  },
});
