import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LessonCard({ title, description, icon, onPress, difficulty }) {
  const difficultyColors = {
    Básico: '#4CAF50',
    Iniciante: '#4CAF50',
    Intermediário: '#FF9800',
    Avançado: '#F44336',
    Prático: '#2196F3',
    Avaliação: '#9C27B0',
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        {difficulty && (
          <View style={[styles.badge, { backgroundColor: difficultyColors[difficulty] }]}>
            <Text style={styles.badgeText}>{difficulty}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#1E2A3A',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#6C8CFF',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2A3F5F',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 32,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#E8EEFF',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#A9B4D0',
    lineHeight: 20,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
});
