import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CodeBlock from '../components/CodeBlock';
import ExerciseContainer from '../components/ExerciseContainer';

export default function Exercise7_Forms() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [idade, setIdade] = useState('');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validarFormulario = () => {
    const newErrors = {};

    if (nome.trim().length < 3) {
      newErrors.nome = 'Nome deve ter no mínimo 3 caracteres';
    }

    if (!email.includes('@') || !email.includes('.')) {
      newErrors.email = 'Email inválido';
    }

    if (senha.length < 6) {
      newErrors.senha = 'Senha deve ter no mínimo 6 caracteres';
    }

    const idadeNum = parseInt(idade);
    if (isNaN(idadeNum) || idadeNum < 18 || idadeNum > 120) {
      newErrors.idade = 'Idade deve ser entre 18 e 120';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validarFormulario()) {
      setSubmitted(true);
      Alert.alert(
        '✅ Sucesso!',
        `Cadastro realizado!\n\nNome: ${nome}\nEmail: ${email}\nIdade: ${idade}`,
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert('❌ Erro', 'Por favor, corrija os erros no formulário');
    }
  };

  const limparFormulario = () => {
    setNome('');
    setEmail('');
    setSenha('');
    setIdade('');
    setErrors({});
    setSubmitted(false);
  };

  return (
    <ExerciseContainer
      title="📝 Formulários e Validação"
      subtitle="Trabalhando com inputs e validação de dados"
    >
      <Text style={styles.sectionTitle}>Por que aprender Formulários?</Text>
      <Text style={styles.text}>
        Formulários são essenciais em apps. Você vai aprender a capturar dados do usuário, validar
        informações e fornecer feedback.
      </Text>

      <Text style={styles.sectionTitle}>📱 TextInput Component</Text>
      <Text style={styles.text}>
        O componente TextInput permite ao usuário inserir texto:
      </Text>

      <CodeBlock
        code={`const [texto, setTexto] = useState('');

<TextInput
  value={texto}
  onChangeText={setTexto}
  placeholder="Digite aqui..."
  keyboardType="default"
/>`}
      />

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>⌨️ Tipos de Teclado:</Text>
        <Text style={styles.infoItem}>• <Text style={styles.bold}>default</Text> - Teclado padrão</Text>
        <Text style={styles.infoItem}>• <Text style={styles.bold}>email-address</Text> - Para emails</Text>
        <Text style={styles.infoItem}>• <Text style={styles.bold}>numeric</Text> - Apenas números</Text>
        <Text style={styles.infoItem}>• <Text style={styles.bold}>phone-pad</Text> - Para telefones</Text>
      </View>

      <Text style={styles.sectionTitle}>🎯 Exercício Prático: Formulário Completo</Text>
      <Text style={styles.text}>
        Complete o formulário abaixo e veja a validação em ação:
      </Text>

      <View style={styles.formBox}>
        <Text style={styles.formTitle}>📋 Cadastro</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput
            style={[styles.input, errors.nome && styles.inputError]}
            value={nome}
            onChangeText={setNome}
            placeholder="Ex: João Silva"
            placeholderTextColor="#A9B4D0"
          />
          {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            value={email}
            onChangeText={setEmail}
            placeholder="seu@email.com"
            placeholderTextColor="#A9B4D0"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={[styles.input, errors.senha && styles.inputError]}
            value={senha}
            onChangeText={setSenha}
            placeholder="••••••••"
            placeholderTextColor="#A9B4D0"
            secureTextEntry
          />
          {errors.senha && <Text style={styles.errorText}>{errors.senha}</Text>}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Idade</Text>
          <TextInput
            style={[styles.input, errors.idade && styles.inputError]}
            value={idade}
            onChangeText={setIdade}
            placeholder="18"
            placeholderTextColor="#A9B4D0"
            keyboardType="numeric"
          />
          {errors.idade && <Text style={styles.errorText}>{errors.idade}</Text>}
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.8}>
          <Text style={styles.submitButtonText}>✅ Enviar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.clearButton} onPress={limparFormulario} activeOpacity={0.8}>
          <Text style={styles.clearButtonText}>🔄 Limpar</Text>
        </TouchableOpacity>

        {submitted && Object.keys(errors).length === 0 && (
          <View style={styles.successBox}>
            <Text style={styles.successText}>✨ Formulário enviado com sucesso!</Text>
          </View>
        )}
      </View>

      <Text style={styles.sectionTitle}>🔍 Validação de Formulário</Text>
      <Text style={styles.text}>
        A validação garante que os dados estão corretos antes de processar:
      </Text>

      <CodeBlock
        code={`const validar = () => {
  const erros = {};
  
  // Validar nome
  if (nome.length < 3) {
    erros.nome = 'Nome muito curto';
  }
  
  // Validar email
  if (!email.includes('@')) {
    erros.email = 'Email inválido';
  }
  
  // Validar senha
  if (senha.length < 6) {
    erros.senha = 'Senha muito curta';
  }
  
  return Object.keys(erros).length === 0;
};`}
      />

      <View style={styles.tipsBox}>
        <Text style={styles.tipsTitle}>💡 Boas Práticas:</Text>
        <Text style={styles.tipsItem}>
          ✓ <Text style={styles.bold}>Validação em tempo real</Text> - Feedback imediato
        </Text>
        <Text style={styles.tipsItem}>
          ✓ <Text style={styles.bold}>Mensagens claras</Text> - Diga exatamente o que está errado
        </Text>
        <Text style={styles.tipsItem}>
          ✓ <Text style={styles.bold}>Teclado apropriado</Text> - Use keyboardType correto
        </Text>
        <Text style={styles.tipsItem}>
          ✓ <Text style={styles.bold}>autoCapitalize</Text> - Controle capitalização
        </Text>
        <Text style={styles.tipsItem}>
          ✓ <Text style={styles.bold}>secureTextEntry</Text> - Para senhas
        </Text>
      </View>

      <View style={styles.summaryBox}>
        <Text style={styles.summaryTitle}>✅ O que você aprendeu:</Text>
        <Text style={styles.summaryItem}>✓ Usar TextInput para capturar dados</Text>
        <Text style={styles.summaryItem}>✓ Diferentes tipos de teclado</Text>
        <Text style={styles.summaryItem}>✓ Validar dados do usuário</Text>
        <Text style={styles.summaryItem}>✓ Exibir mensagens de erro</Text>
        <Text style={styles.summaryItem}>✓ Processar formulários</Text>
      </View>
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
  formBox: {
    backgroundColor: '#151B2B',
    borderRadius: 12,
    padding: 20,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#2A3250',
  },
  formTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#E8EEFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#A9B4D0',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#0B1020',
    borderWidth: 1,
    borderColor: '#2A3250',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#E8EEFF',
  },
  inputError: {
    borderColor: '#F44336',
    borderWidth: 2,
  },
  errorText: {
    fontSize: 12,
    color: '#F44336',
    marginTop: 6,
  },
  submitButton: {
    backgroundColor: '#6C8CFF',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  clearButton: {
    backgroundColor: '#2A3250',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  clearButtonText: {
    color: '#A9B4D0',
    fontSize: 14,
    fontWeight: '600',
  },
  successBox: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  successText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  tipsBox: {
    backgroundColor: '#1E2A3A',
    borderLeftWidth: 4,
    borderLeftColor: '#6C8CFF',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E8EEFF',
    marginBottom: 12,
  },
  tipsItem: {
    fontSize: 14,
    color: '#A9B4D0',
    marginBottom: 10,
    lineHeight: 22,
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
