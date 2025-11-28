import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function CodeBlock({ code, language = 'javascript' }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.language}>{language}</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Text style={styles.code}>{code}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0D1117',
    borderRadius: 12,
    marginVertical: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#2A3250',
  },
  header: {
    backgroundColor: '#161B22',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2A3250',
  },
  language: {
    color: '#8B949E',
    fontSize: 12,
    fontWeight: '600',
  },
  code: {
    color: '#E8EEFF',
    fontFamily: 'Courier',
    fontSize: 13,
    padding: 16,
    lineHeight: 20,
  },
});
