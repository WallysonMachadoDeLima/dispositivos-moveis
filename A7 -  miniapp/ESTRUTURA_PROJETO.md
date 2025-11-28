# 📂 ESTRUTURA DO PROJETO

```
A7 - miniapp/
│
├── 📱 App.js                          # Navegação principal (Stack + Bottom Tabs)
├── 📄 package.json                    # Dependências do projeto
├── 📋 app.json                        # Configurações do Expo
│
├── 📚 DOCUMENTAÇÃO
│   ├── README.md                      # Documentação completa
│   ├── QUICK_START.md                 # Guia rápido de início
│   ├── ROTEIRO_APRESENTACAO.md        # Roteiro de apresentação 15min
│   ├── RESUMO_EXECUTIVO.md            # Resumo do projeto
│   └── ESTRUTURA_PROJETO.md           # Este arquivo
│
├── 🖼️ assets/                         # Imagens e recursos
│   ├── adaptive-icon.png
│   ├── favicon.png
│   ├── icon.png
│   └── splash.png
│
├── 🧩 components/                     # Componentes reutilizáveis
│   ├── LessonCard.js                  # Card de exercício
│   ├── CodeBlock.js                   # Bloco de código formatado
│   └── ExerciseContainer.js           # Container padrão
│
├── 🏠 screens/                        # Telas principais
│   ├── HomeScreen.js                  # Lista de exercícios
│   └── AboutScreen.js                 # Sobre o app
│
└── 📝 exercises/                      # Exercícios práticos
    ├── Exercise1_State.js             # useState Hook
    ├── Exercise2_Effect.js            # useEffect Hook
    ├── Exercise3_FlatList.js          # FlatList Component
    ├── Exercise4_NativeAPIs.js        # APIs Nativas ⭐
    └── Exercise5_Styling.js           # Estilos & Layouts
```

---

## 📱 ARQUITETURA DE NAVEGAÇÃO

```
NavigationContainer
│
└── Bottom Tab Navigator
    │
    ├── Tab 1: "Exercícios" (📚)
    │   │
    │   └── Stack Navigator
    │       │
    │       ├── HomeScreen
    │       │   └── Lista de exercícios
    │       │
    │       ├── Exercise1_State
    │       ├── Exercise2_Effect
    │       ├── Exercise3_FlatList
    │       ├── Exercise4_NativeAPIs
    │       └── Exercise5_Styling
    │
    └── Tab 2: "Sobre" (ℹ️)
        │
        └── AboutScreen
            └── Informações do app
```

---

## 🎯 FLUXO DO USUÁRIO

```
1. App Inicia
   │
   └─> HomeScreen (Lista de 5 exercícios)
       │
       ├─> Clica em "useState Hook"
       │   └─> Exercise1_State
       │       ├─> Lê teoria
       │       ├─> Vê código
       │       ├─> Experimenta input
       │       ├─> Experimenta contador
       │       └─> Volta (botão back)
       │
       ├─> Clica em "useEffect Hook"
       │   └─> Exercise2_Effect
       │       ├─> Cronômetro
       │       └─> Fetch API
       │
       ├─> Clica em "FlatList"
       │   └─> Exercise3_FlatList
       │       └─> Lista interativa
       │
       ├─> Clica em "APIs Nativas" ⭐
       │   └─> Exercise4_NativeAPIs
       │       ├─> Animações
       │       ├─> Alertas
       │       ├─> Vibração
       │       └─> Dimensões
       │
       └─> Clica em "Estilos & Layouts"
           └─> Exercise5_Styling
               └─> Exemplos Flexbox

2. Bottom Tab
   │
   └─> Clica em "Sobre"
       └─> AboutScreen
           ├─> Objetivo
           ├─> Conteúdo
           ├─> Recursos
           ├─> Metodologia
           └─> Link documentação
```

---

## 🧩 COMPONENTES REUTILIZÁVEIS

### LessonCard.js
**Usado em**: HomeScreen  
**Props**:
- `title` - Título do exercício
- `description` - Descrição breve
- `icon` - Emoji do exercício
- `difficulty` - Nível (Iniciante/Intermediário)
- `onPress` - Função de navegação

**Exemplo**:
```jsx
<LessonCard
  title="useState Hook"
  description="Gerencie estado em componentes"
  icon="📦"
  difficulty="Iniciante"
  onPress={() => navigation.navigate('Exercise1')}
/>
```

---

### CodeBlock.js
**Usado em**: Todos os exercícios  
**Props**:
- `code` - String com o código
- `language` - Linguagem (padrão: 'javascript')

**Exemplo**:
```jsx
<CodeBlock
  code={`const [valor, setValor] = useState(0);`}
  language="javascript"
/>
```

---

### ExerciseContainer.js
**Usado em**: Todos os exercícios  
**Props**:
- `title` - Título do exercício
- `subtitle` - Subtítulo explicativo
- `children` - Conteúdo do exercício

**Exemplo**:
```jsx
<ExerciseContainer
  title="useState Hook"
  subtitle="Aprenda a gerenciar estado"
>
  {/* Conteúdo aqui */}
</ExerciseContainer>
```

---

## 📝 EXERCÍCIOS - VISÃO DETALHADA

### Exercise1_State.js (useState Hook)
**Estrutura**:
```
├── Teoria (O que é useState?)
├── CodeBlock (Exemplo de código)
├── Exercício 1: Input de texto
│   └── TextInput + Estado
├── Exercício 2: Contador
│   ├── Botão Decrementar
│   ├── Botão Resetar
│   └── Botão Incrementar
└── Dica final
```

---

### Exercise2_Effect.js (useEffect Hook)
**Estrutura**:
```
├── Teoria (O que é useEffect?)
├── CodeBlock (Exemplo de código)
├── Exercício 1: Cronômetro
│   ├── useEffect com setInterval
│   ├── Botão Iniciar/Pausar
│   └── Botão Resetar
├── Exercício 2: Fetch de API
│   ├── useEffect para fetch
│   ├── Loading state
│   └── Exibição de dados
├── Dica final
└── CodeBlock (Exemplos de dependências)
```

---

### Exercise3_FlatList.js (FlatList Component)
**Estrutura**:
```
├── Teoria (O que é FlatList?)
├── CodeBlock (Exemplo de código)
├── Exercício: Lista interativa
│   ├── FlatList com 6 itens
│   ├── TouchableOpacity em cada item
│   └── Estado de seleção
├── Exibição do item selecionado
├── Propriedades principais
│   ├── data
│   ├── renderItem
│   ├── keyExtractor
│   └── horizontal
└── Dica final
```

---

### Exercise4_NativeAPIs.js (APIs Nativas) ⭐
**Estrutura**:
```
├── Teoria (O que são APIs Nativas?)
├── Exercício 1: Animated API
│   ├── Animated.Value para escala
│   ├── Animated.Value para rotação
│   ├── Botão "Escalar" (spring animation)
│   ├── Botão "Rotacionar" (timing animation)
│   └── CodeBlock (Exemplo Animated)
├── Exercício 2: Alert API
│   ├── Botão "Mostrar Alerta"
│   ├── Alert.alert nativo
│   └── CodeBlock (Exemplo Alert)
├── Exercício 3: Vibration API
│   ├── Botão "Vibrar"
│   ├── Padrão de vibração
│   └── CodeBlock (Exemplo Vibration)
├── Exercício 4: Dimensions API
│   ├── Botão "Ver Dimensões"
│   ├── Dimensions.get('window')
│   └── CodeBlock (Exemplo Dimensions)
└── Dica final
```

---

### Exercise5_Styling.js (Estilos & Layouts)
**Estrutura**:
```
├── Teoria (StyleSheet API)
├── CodeBlock (Exemplo StyleSheet)
├── Exercício 1: Flexbox Layout
│   ├── flexDirection: 'row'
│   └── flexDirection: 'column'
├── Exercício 2: Alinhamento
│   ├── justifyContent: 'space-between'
│   └── alignItems: 'center'
├── CodeBlock (Propriedades Flexbox)
├── Exercício 3: Estilização Avançada
│   └── Card completo com sombras
├── CodeBlock (Exemplo de Card)
├── Propriedades Comuns
│   ├── backgroundColor
│   ├── padding / margin
│   ├── borderRadius
│   └── fontSize / fontWeight
└── Dica final
```

---

## 🎨 DESIGN SYSTEM

### Cores
```javascript
const colors = {
  background: '#0B1020',      // Fundo principal
  card: '#151B2B',            // Cards
  cardAlt: '#0F1525',         // Cards alternativos
  border: '#2A3250',          // Bordas
  text: '#E8EEFF',            // Texto principal
  textDim: '#A9B4D0',         // Texto secundário
  primary: '#6C8CFF',         // Cor primária
  success: '#4CAF50',         // Verde
  warning: '#FF9800',         // Laranja
  danger: '#F44336',          // Vermelho
};
```

### Tipografia
```javascript
const typography = {
  title: { fontSize: 28, fontWeight: '800' },
  subtitle: { fontSize: 20, fontWeight: '700' },
  body: { fontSize: 15, lineHeight: 24 },
  code: { fontFamily: 'Courier', fontSize: 13 },
};
```

### Espaçamentos
```javascript
const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
};
```

---

## 📦 DEPENDÊNCIAS

### Principais
```json
{
  "expo": "~53.0.20",
  "react": "19.0.0",
  "react-native": "0.79.5"
}
```

### Navegação
```json
{
  "@react-navigation/native": "^6.x",
  "@react-navigation/stack": "^6.x",
  "@react-navigation/bottom-tabs": "^6.x",
  "react-native-screens": "~4.11.1",
  "react-native-safe-area-context": "5.4.0",
  "react-native-gesture-handler": "~2.24.0"
}
```

---

## 🚀 SCRIPTS DISPONÍVEIS

```json
{
  "start": "expo start",          // Inicia servidor dev
  "android": "expo start --android", // Abre no Android
  "ios": "expo start --ios",      // Abre no iOS
  "web": "expo start --web"       // Abre no navegador
}
```

---

## 📊 ESTATÍSTICAS

### Código
- **Total de arquivos**: 14
- **Linhas de código**: ~2.200
- **Componentes**: 8 (3 reutilizáveis + 5 exercícios)
- **Telas**: 2

### Conceitos Ensinados
- **Hooks**: 2 (useState, useEffect)
- **Componentes**: 5+ (FlatList, TouchableOpacity, etc.)
- **APIs**: 4 (Animated, Alert, Vibration, Dimensions)
- **Estilos**: StyleSheet + Flexbox completo

### Recursos Nativos
- **Navegação**: Stack + Bottom Tabs
- **Animações**: Animated API
- **Alertas**: Alert API
- **Vibração**: Vibration API
- **Dimensões**: Dimensions API
- **Listas**: FlatList
- **HTTP**: Fetch API
- **Links**: Linking API

---

**Estrutura completa e organizada! 🎉**
