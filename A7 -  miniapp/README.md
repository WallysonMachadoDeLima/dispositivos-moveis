# React Native Learning Lab 🚀

Um **miniapp educacional completo** para ensinar React Native através de exercícios práticos e interativos, organizados por ordem de dificuldade.

## 📱 Sobre o Projeto

Este aplicativo foi desenvolvido com o objetivo de ensinar conceitos fundamentais do React Native para iniciantes. Através de uma abordagem hands-on, o usuário aprende na prática experimentando com componentes, hooks e APIs nativas.

## 🎯 Proposta Pedagógica

O app utiliza uma **metodologia interativa** onde cada conceito é apresentado da seguinte forma:

1. **Explicação Teórica** - Introdução clara ao conceito
2. **Exemplos de Código** - Snippets comentados e formatados
3. **Exercícios Práticos** - Componentes funcionais e interativos
4. **Dicas e Boas Práticas** - Orientações para desenvolvimento profissional
5. **Avaliação Final** - Quiz com pontuação de 0 a 100

## 📚 Conteúdo Ensinado

O app cobre **11 exercícios** organizados por níveis de dificuldade:

### 🟢 Nível Básico

#### 0. **Introdução ao React Native** 📚
- O que é React Native e por que usá-lo
- JSX: sintaxe e boas práticas
- Props: passando parâmetros entre componentes
- Estrutura de um projeto React Native
- Diferenças de estilo entre CSS e React Native
- Exercícios interativos com toggle
- Dificuldade: **Básico**

#### 6. **Criando Componentes** 🧩
- Como criar componentes funcionais
- Reutilização de componentes
- Props e children
- Exercícios: Botão de curtir, toggle de imagem, cards
- Dificuldade: **Básico**

#### 5. **Estilos & Layouts** 🎨
- StyleSheet API
- Flexbox Layout
- Exercícios: Exemplos visuais de layouts
- Dificuldade: **Básico**

#### 3. **FlatList Component** 📜
- Renderização eficiente de listas
- Exercício: Lista interativa com seleção
- Dificuldade: **Básico**

### 🟡 Nível Intermediário

#### 1. **useState Hook** 📦
- Gerenciamento de estado em componentes funcionais
- Exercícios: Input de texto e contador
- Dificuldade: **Intermediário**

#### 2. **useEffect Hook** ⚡
- Efeitos colaterais e ciclo de vida
- Exercícios: Cronômetro e fetch de API
- Dificuldade: **Intermediário**

#### 7. **Formulários e Validação** 📝
- Manipulação de formulários
- Validação de campos (email, senha, idade)
- TextInput com diferentes tipos de teclado
- Feedback de erro em tempo real
- Dificuldade: **Intermediário**

### 🔴 Nível Avançado

#### 4. **APIs Nativas** 🔧
- Animated API (animações)
- Alert API (diálogos nativos)
- Vibration API (feedback háptico)
- Dimensions API (informações do dispositivo)
- Exercícios: Múltiplas demonstrações práticas
- Dificuldade: **Avançado**

#### 8. **Mini-Game Completo** 🚀
- Combina todos os conceitos aprendidos
- Jogo interativo: "Encontre a caixa verde"
- Gerenciamento de múltiplos estados
- Temporizador com useEffect
- Animações sequenciais
- Lógica condicional complexa
- Sistema de pontuação
- Dificuldade: **Avançado**

### 💻 Exercícios Práticos

#### 9. **Desafio de Código** ⌨️
- Escreva código para resolver 5 desafios
- Validação automática de resposta
- Sistema de dicas
- Níveis: Fácil, Médio e Difícil
- Progresso rastreado
- Dificuldade: **Prático**

### 📝 Avaliação Final

#### 10. **Quiz Final** 📝
- 10 perguntas de múltipla escolha
- Cobre todos os tópicos do app
- Sistema de pontuação de 0 a 100
- Explicação para cada resposta
- Revisão completa ao final
- Opção de refazer o quiz
- Dificuldade: **Avaliação**

## 🚀 Recursos do React Native Utilizados

O app demonstra diversos recursos nativos:

- ✅ **Navegação**: Stack Navigator e Bottom Tabs
- ✅ **Animações**: Animated API com spring e timing
- ✅ **Alertas Nativos**: Alert API
- ✅ **Vibração**: Vibration API
- ✅ **Dimensões**: Dimensions API
- ✅ **Listas Otimizadas**: FlatList com virtualização
- ✅ **Requisições HTTP**: Fetch API
- ✅ **Gestos**: TouchableOpacity
- ✅ **Status Bar**: Controle da barra de status
- ✅ **Linking**: Abertura de URLs externas

## 🏗️ Estrutura do Projeto

```
A7 - miniapp/
├── App.js                    # Navegação principal
├── screens/
│   ├── HomeScreen.js        # Tela inicial com lista de exercícios
│   └── AboutScreen.js       # Informações sobre o app
├── exercises/
│   ├── Exercise1_State.js   # useState Hook
│   ├── Exercise2_Effect.js  # useEffect Hook
│   ├── Exercise3_FlatList.js # FlatList
│   ├── Exercise4_NativeAPIs.js # APIs Nativas
│   └── Exercise5_Styling.js # Estilos e Layouts
└── components/
    ├── LessonCard.js        # Card de lição
    ├── CodeBlock.js         # Bloco de código formatado
    └── ExerciseContainer.js # Container para exercícios
```

## 🎨 Interface

- **Design moderno** com tema dark
- **Navegação intuitiva** entre tópicos
- **Exemplos visuais** e interativos
- **Código formatado** em blocos destacados
- **Feedback visual** em todas as interações

## 🛠️ Tecnologias

- **React Native** 0.79.5
- **Expo** ~53.0.20
- **React Navigation** (Stack & Bottom Tabs)
- **React** 19.0.0

## 📦 Instalação e Execução

```bash
# Instalar dependências
npm install

# Iniciar o app
npm start

# Ou usar comandos específicos
npm run android
npm run ios
npm run web
```

## 🎓 Decisões Técnicas

### 1. **Navegação Híbrida**
Utilizamos **Stack Navigator** para navegação entre exercícios e **Bottom Tabs** para alternar entre seções principais (Exercícios e Sobre).

### 2. **Componentes Reutilizáveis**
Criamos componentes como `LessonCard`, `CodeBlock` e `ExerciseContainer` para manter consistência e facilitar manutenção.

### 3. **Aprendizado Progressivo**
Os exercícios estão ordenados por dificuldade, do mais básico (useState) ao mais complexo (APIs Nativas).

### 4. **Interatividade em Tempo Real**
Todos os exercícios são funcionais e executam em tempo real, permitindo experimentação imediata.

### 5. **Design System Consistente**
Paleta de cores e estilos unificados em todo o app para uma experiência coesa.

## 🎯 Recursos Destacados para Apresentação

### 1. **Animated API** (Exercício 4)
Demonstra animações nativas com:
- Escala (spring animation)
- Rotação (timing animation)
- Performance nativa via `useNativeDriver`

### 2. **Vibration API** (Exercício 4)
Feedback tátil com padrões customizados

### 3. **FlatList com Virtualização** (Exercício 3)
Lista otimizada que renderiza apenas itens visíveis

### 4. **Fetch API** (Exercício 2)
Integração com API externa (GitHub) demonstrando loading states

## 📱 Compatibilidade

- ✅ iOS
- ✅ Android
- ✅ Web (via Expo)

## 👥 Público-Alvo

Iniciantes em React Native que:
- Conhecem JavaScript básico
- Querem aprender React Native de forma prática
- Buscam entender conceitos fundamentais
- Desejam ver exemplos funcionais

## 💡 Diferenciais

- **100% funcional**: Todos os exercícios executam de verdade
- **Código real**: Snippets que funcionam e podem ser copiados
- **APIs nativas**: Demonstração de recursos exclusivos do React Native
- **Open learning**: Código-fonte disponível para estudo

## 📊 Tempo Estimado de Aprendizado

- Exercício 1 (useState): ~10 min
- Exercício 2 (useEffect): ~15 min
- Exercício 3 (FlatList): ~10 min
- Exercício 4 (APIs Nativas): ~15 min
- Exercício 5 (Estilos): ~10 min

**Total**: ~60 minutos para completar todos os exercícios

## 🎤 Roteiro de Apresentação (10-15 min)

### 1. Introdução (2 min)
- Apresentar o conceito do app
- Explicar a proposta pedagógica

### 2. Demonstração da Interface (3 min)
- Navegar pela tela inicial
- Mostrar a estrutura de navegação
- Demonstrar tabs e stack navigation

### 3. Exercícios Práticos (7 min)
- **useState**: Demonstrar input e contador
- **useEffect**: Mostrar cronômetro e fetch de API
- **APIs Nativas**: Executar animações e vibração (destaque principal)

### 4. Decisões Técnicas (2 min)
- Explicar arquitetura de componentes
- Destacar recursos nativos utilizados
- Mostrar estrutura de código

### 5. Conclusão (1 min)
- Resumir aprendizados possíveis
- Mencionar próximos passos para os usuários

## 📄 Licença

Este é um projeto educacional desenvolvido para fins acadêmicos.

---

**Desenvolvido com 💙 para ensinar React Native**
