
# Temporizador de Estudos

Aplicativo simples de temporizador de sessões de estudo feito em React Native com Expo.

## Funcionalidades

- Iniciar, pausar e resetar o timer
- Definir minutos da sessão
- Exibe tempo em MM:SS
- Alerta visual e mensagem ao finalizar
- Vibração ao finalizar (opcional)
- Conta sessões completas e tempo total estudado

## Como executar

Pré-requisitos:
- Node.js 14+
- npm ou yarn
- Expo CLI (global ou via npx)

1. Instale as dependências:
  npm install
2. Inicie o projeto:
  npm start
  # ou
  npx expo start
3. Escaneie o QR Code com o app Expo Go no celular

Para rodar em emulador Android:
  npm run android
Para rodar em emulador iOS (macOS):
  npm run ios
Para rodar no navegador:
  npm run web

## Estrutura

App.js         # Lógica principal
app.json       # Configuração Expo
package.json   # Dependências

## Personalização

Altere valores no App.js para mudar tempo padrão, cores ou mensagens.

---
Projeto para fins de estudo.
