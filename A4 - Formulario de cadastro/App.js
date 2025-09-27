import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import React from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import * as Yup from 'yup';

/* ===================== Utilitários (iguais) ===================== */
function validarCPF(cpf) {
  cpf = cpf.replace(/[.\-]/g, '');
  if (cpf.length !== 11 || /^([0-9])\1+$/.test(cpf)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
  let resto = soma % 11;
  let digito1 = resto < 2 ? 0 : 11 - resto;
  if (parseInt(cpf.charAt(9)) !== digito1) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
  resto = soma % 11;
  let digito2 = resto < 2 ? 0 : 11 - resto;
  if (parseInt(cpf.charAt(10)) !== digito2) return false;
  return true;
}

function calcularIdade(dataNascimento) {
  const [dia, mes, ano] = dataNascimento.split('/').map(Number);
  const hoje = new Date();
  const nascimento = new Date(ano, mes - 1, dia);
  let idade = hoje.getFullYear() - nascimento.getFullYear();
  const m = hoje.getMonth() - nascimento.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) idade--;
  return idade;
}

/* ===================== Validações (iguais) ===================== */
const validationSchema = Yup.object().shape({
  nomeCompleto: Yup.string()
    .required('Campo obrigatório')
    .test('dois-nomes', 'Informe nome e sobrenome', v => v && v.trim().split(' ').length >= 2),
  dataNascimento: Yup.string()
    .required('Campo obrigatório')
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, 'Formato DD/MM/AAAA')
    .test('data-valida', 'Data inválida', v => {
      if (!v) return false;
      const [d, m, a] = v.split('/').map(Number);
      const dt = new Date(a, m - 1, d);
      return dt && dt.getDate() === d && dt.getMonth() === m - 1 && dt.getFullYear() === a;
    }),
  cpf: Yup.string().required('Campo obrigatório').test('cpf-valido', 'CPF inválido', v => v && validarCPF(v)),
  telefoneFixo: Yup.string().required('Campo obrigatório').matches(/^\(\d{2}\) \d{4}-\d{4}$/, 'Formato: (11) 2345-6789'),
  celular: Yup.string().required('Campo obrigatório').matches(/^\(\d{2}\) 9\d{4}-\d{4}$/, 'Formato: (11) 91234-5678'),
  cep: Yup.string().required('Campo obrigatório').matches(/^(\d{5}-\d{3}|\d{8})$/, 'Formato: XXXXX-XXX ou 8 dígitos'),
  endereco: Yup.string().required('Campo obrigatório'),
  numero: Yup.string().required('Campo obrigatório'),
  complemento: Yup.string(),
  cidade: Yup.string().required('Campo obrigatório'),
  estado: Yup.string().required('Campo obrigatório'),
  email: Yup.string().required('Campo obrigatório').email('Email inválido'),
  senha: Yup.string()
    .required('Campo obrigatório')
    .min(8, 'Mínimo 8 caracteres')
    .matches(/[A-Z]/, 'Deve conter letra maiúscula')
    .matches(/[a-z]/, 'Deve conter letra minúscula')
    .matches(/\d/, 'Deve conter número')
    .matches(/[^A-Za-z0-9]/, 'Deve conter caractere especial'),
  confirmarSenha: Yup.string().required('Campo obrigatório').oneOf([Yup.ref('senha')], 'Senhas não coincidem'),
  nomePai: Yup.string().when('dataNascimento', {
    is: dn => dn && calcularIdade(dn) < 18,
    then: s => s.required('Campo obrigatório para menores de idade'),
    otherwise: s => s,
  }),
  nomeMae: Yup.string().when('dataNascimento', {
    is: dn => dn && calcularIdade(dn) < 18,
    then: s => s.required('Campo obrigatório para menores de idade'),
    otherwise: s => s,
  }),
});

const initialValues = {
  nomeCompleto: '',
  dataNascimento: '',
  cpf: '',
  telefoneFixo: '',
  celular: '',
  nomePai: '',
  nomeMae: '',
  cep: '',
  endereco: '',
  numero: '',
  complemento: '',
  cidade: '',
  estado: '',
  email: '',
  senha: '',
  confirmarSenha: '',
};

/* ===================== UI Helpers ===================== */
const Colors = {
  bg: '#0B1020',
  card: '#151B2B',
  cardAlt: '#0F1525',
  border: '#2A3250',
  text: '#E8EEFF',
  textDim: '#A9B4D0',
  danger: '#FF6B6B',
  primary: '#6C8CFF',
  primaryDark: '#5073FF',
  success: '#3DDC97',
};

function Section({ title, children }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.divider} />
      {children}
    </View>
  );
}

function Row2({ children }) {
  const arr = React.Children.toArray(children);
  return (
    <View style={styles.row}>
      <View style={[styles.col, { marginRight: 8 }]}>{arr[0]}</View>
      <View style={[styles.col, { marginLeft: 8 }]}>{arr[1]}</View>
    </View>
  );
}

function Field({ label, error, touched, inputProps }) {
  const showError = !!error && touched;
  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholderTextColor={Colors.textDim}
        style={[styles.input, showError && { borderColor: Colors.danger }]}
        {...inputProps}
      />
      {showError && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

/* ===================== App (JS) ===================== */
export default function App() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
      <Text style={styles.title}>Cadastro</Text>
      <Text style={styles.subtitle}>Preencha seus dados para criar a conta</Text>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
        onSubmit={() => alert('Cadastro realizado com sucesso!')}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => {
          const idade =
            /^\d{2}\/\d{2}\/\d{4}$/.test(values.dataNascimento)
              ? calcularIdade(values.dataNascimento)
              : null;
          const isMenor = idade !== null && idade < 18;

          return (
            <View>
              <Section title="Informações Pessoais">
                <Field
                  label="Nome completo"
                  error={errors.nomeCompleto}
                  touched={touched.nomeCompleto}
                  inputProps={{
                    placeholder: 'Nome e sobrenome',
                    onChangeText: handleChange('nomeCompleto'),
                    onBlur: handleBlur('nomeCompleto'),
                    value: values.nomeCompleto,
                  }}
                />

                <Row2>
                  <Field
                    label="Data de nascimento"
                    error={errors.dataNascimento}
                    touched={touched.dataNascimento}
                    inputProps={{
                      placeholder: 'DD/MM/AAAA',
                      onChangeText: handleChange('dataNascimento'),
                      onBlur: handleBlur('dataNascimento'),
                      value: values.dataNascimento,
                      keyboardType: 'numeric',
                    }}
                  />
                  <Field
                    label="CPF"
                    error={errors.cpf}
                    touched={touched.cpf}
                    inputProps={{
                      placeholder: 'XXX.XXX.XXX-XX',
                      onChangeText: handleChange('cpf'),
                      onBlur: handleBlur('cpf'),
                      value: values.cpf,
                      keyboardType: 'numeric',
                    }}
                  />
                </Row2>

                <Row2>
                  <Field
                    label="Telefone fixo"
                    error={errors.telefoneFixo}
                    touched={touched.telefoneFixo}
                    inputProps={{
                      placeholder: '(11) 2345-6789',
                      onChangeText: handleChange('telefoneFixo'),
                      onBlur: handleBlur('telefoneFixo'),
                      value: values.telefoneFixo,
                      keyboardType: 'phone-pad',
                    }}
                  />
                  <Field
                    label="Celular"
                    error={errors.celular}
                    touched={touched.celular}
                    inputProps={{
                      placeholder: '(11) 91234-5678',
                      onChangeText: handleChange('celular'),
                      onBlur: handleBlur('celular'),
                      value: values.celular,
                      keyboardType: 'phone-pad',
                    }}
                  />
                </Row2>

                {idade !== null && (
                  <Text style={styles.badge}>
                    Idade: <Text style={{ fontWeight: '700' }}>{idade}</Text> anos
                  </Text>
                )}
              </Section>

              {isMenor && (
                <Section title="Informações Complementares">
                  <Field
                    label="Nome do pai"
                    error={errors.nomePai}
                    touched={touched.nomePai}
                    inputProps={{
                      placeholder: 'Ex.: João da Silva',
                      onChangeText: handleChange('nomePai'),
                      onBlur: handleBlur('nomePai'),
                      value: values.nomePai,
                    }}
                  />
                  <Field
                    label="Nome da mãe"
                    error={errors.nomeMae}
                    touched={touched.nomeMae}
                    inputProps={{
                      placeholder: 'Ex.: Maria Souza',
                      onChangeText: handleChange('nomeMae'),
                      onBlur: handleBlur('nomeMae'),
                      value: values.nomeMae,
                    }}
                  />
                </Section>
              )}

              <Section title="Endereço">
                <Row2>
                  <Field
                    label="CEP"
                    error={errors.cep}
                    touched={touched.cep}
                    inputProps={{
                      placeholder: 'XXXXX-XXX',
                      onChangeText: handleChange('cep'),
                      onBlur: handleBlur('cep'),
                      value: values.cep,
                      keyboardType: 'numeric',
                    }}
                  />
                  <Field
                    label="Número"
                    error={errors.numero}
                    touched={touched.numero}
                    inputProps={{
                      placeholder: 'Nº',
                      onChangeText: handleChange('numero'),
                      onBlur: handleBlur('numero'),
                      value: values.numero,
                      keyboardType: 'numeric',
                    }}
                  />
                </Row2>

                <Field
                  label="Endereço"
                  error={errors.endereco}
                  touched={touched.endereco}
                  inputProps={{
                    placeholder: 'Rua, avenida...',
                    onChangeText: handleChange('endereco'),
                    onBlur: handleBlur('endereco'),
                    value: values.endereco,
                  }}
                />

                <Row2>
                  <Field
                    label="Complemento (opcional)"
                    error={errors.complemento}
                    touched={touched.complemento}
                    inputProps={{
                      placeholder: 'Apto, bloco...',
                      onChangeText: handleChange('complemento'),
                      onBlur: handleBlur('complemento'),
                      value: values.complemento,
                    }}
                  />
                  <Field
                    label="Cidade"
                    error={errors.cidade}
                    touched={touched.cidade}
                    inputProps={{
                      placeholder: 'Cidade',
                      onChangeText: handleChange('cidade'),
                      onBlur: handleBlur('cidade'),
                      value: values.cidade,
                    }}
                  />
                </Row2>

                <Field
                  label="Estado"
                  error={errors.estado}
                  touched={touched.estado}
                  inputProps={{
                    placeholder: 'UF (ex.: RO)',
                    onChangeText: handleChange('estado'),
                    onBlur: handleBlur('estado'),
                    value: values.estado,
                    autoCapitalize: 'characters',
                    maxLength: 2,
                  }}
                />
              </Section>

              <Section title="Conta de Acesso">
                <Field
                  label="Email"
                  error={errors.email}
                  touched={touched.email}
                  inputProps={{
                    placeholder: 'seu@email.com',
                    onChangeText: handleChange('email'),
                    onBlur: handleBlur('email'),
                    value: values.email,
                    keyboardType: 'email-address',
                    autoCapitalize: 'none',
                  }}
                />
                <Row2>
                  <Field
                    label="Senha"
                    error={errors.senha}
                    touched={touched.senha}
                    inputProps={{
                      placeholder: '••••••••',
                      onChangeText: handleChange('senha'),
                      onBlur: handleBlur('senha'),
                      value: values.senha,
                      secureTextEntry: true,
                    }}
                  />
                  <Field
                    label="Confirmar senha"
                    error={errors.confirmarSenha}
                    touched={touched.confirmarSenha}
                    inputProps={{
                      placeholder: 'Repita a senha',
                      onChangeText: handleChange('confirmarSenha'),
                      onBlur: handleBlur('confirmarSenha'),
                      value: values.confirmarSenha,
                      secureTextEntry: true,
                    }}
                  />
                </Row2>
              </Section>

              <TouchableOpacity onPress={handleSubmit} activeOpacity={0.9} style={styles.button}>
                <Text style={styles.buttonText}>Cadastrar</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </Formik>

      <StatusBar style="light" />
    </ScrollView>
  );
}

/* ===================== Estilos ===================== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  title: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  subtitle: {
    color: Colors.textDim,
    marginTop: 6,
    marginBottom: 16,
  },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    ...(Platform.OS === 'ios'
      ? { shadowColor: '#000', shadowOpacity: 0.25, shadowRadius: 8, shadowOffset: { width: 0, height: 4 } }
      : { elevation: 3 }),
  },
  cardTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flex: 1,
  },
  label: {
    color: Colors.textDim,
    fontSize: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
    color: Colors.text,
    backgroundColor: Colors.cardAlt,
  },
  error: {
    color: Colors.danger,
    marginTop: 6,
    fontSize: 12,
  },
  badge: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#0D1B35',
    borderRadius: 999,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  button: {
    marginTop: 6,
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    ...(Platform.OS === 'ios'
      ? { shadowColor: Colors.primary, shadowOpacity: 0.4, shadowRadius: 10, shadowOffset: { width: 0, height: 6 } }
      : { elevation: 4 }),
  },
  buttonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
