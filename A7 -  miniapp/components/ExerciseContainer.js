import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ExerciseContainer({ title, children, subtitle }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      <View style={styles.content}>{children}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1020',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#151B2B',
    borderBottomWidth: 1,
    borderBottomColor: '#2A3250',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#E8EEFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#A9B4D0',
    lineHeight: 22,
  },
  content: {
    padding: 20,
  },
});
