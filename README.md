# 💰 Labubonico

Um aplicativo inteligente de gestão financeira pessoal que utiliza IA para automatizar o controle de despesas através de análise de documentos e conversação natural.

## 📱 Sobre o Projeto

Labubonico é uma solução moderna para gestão de finanças pessoais que elimina a necessidade de lançamento manual de despesas. Simplesmente tire fotos de seus comprovantes ou envie notas fiscais e deixe a inteligência artificial fazer o resto.

### ✨ Funcionalidades Principais

- **📸 Captura Inteligente de Documentos**

  - Tire fotos de comprovantes e recibos físicos
  - Envie documentos digitais gerados por apps bancários
  - Reconhecimento automático de valores, datas e categorias
  - Processamento instantâneo com IA para extração de dados

- **🤖 Chatbot Financeiro Inteligente**

  - Converse naturalmente sobre suas finanças
  - Perguntas como "Qual foi meu maior gasto esse mês?"
  - Análise de gastos recorrentes e padrões de consumo
  - Insights personalizados sobre seus hábitos financeiros
  - Relatórios sob demanda em linguagem natural

- **📊 Balanço Mensal Automático**

  - Consolidação automática de todas as despesas
  - Visualização clara de entradas e saídas
  - Categorização inteligente de gastos
  - Histórico completo de transações

- **⚙️ Gerenciamento Customizável de Categorias**
  - Crie, edite e delete categorias personalizadas
  - Atribua cores exclusivas para cada categoria
  - Sincronização automática com Firebase Firestore
  - Categorias padrão pré-configuradas para facilitar o uso

## 🛠️ Tecnologias Utilizadas

### Frontend

- **Expo** - Framework para desenvolvimento React Native
- **TypeScript** - Tipagem estática e melhor experiência de desenvolvimento
- **React Native Gesture Handler** - Manipulação de gestos táteis
- **React Native Actions Sheet** - Interface de action sheets personalizadas

### Backend & Serviços

- **Firebase Authentication** - Autenticação segura de usuários
- **Cloud Firestore** - Banco de dados em tempo real e escalável
- **Firebase AI Logic** - Processamento inteligente de documentos e chatbot
- **Firebase Storage** - Armazenamento seguro de imagens e documentos

## 🚀 Como Começar

### Pré-requisitos

```bash
node >= 18.0.0
npm ou yarn
expo-cli
```

### Instalação

1. Clone o repositório

```bash
git clone https://github.com/LABUBONICO/labubonico-mobile.git
cd labubonico-mobile
```

2. Instale as dependências

```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=sua_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=seu_app_id
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=seu_google_web_client_id
```

4. Inicie o projeto

```bash
npx start
```

## ⚙️ Configurações Importantes

### Google Sign-In Setup

Para usar o **Google Sign-In** com sucesso, você precisará:

1. **Usar Prebuild (Obrigatório)**

   - O Google Sign-In requer código nativo que não pode ser executado com Expo Go
   - Use o seguinte comando para criar um build précompilado:

   ```bash
   npx expo prebuild --clean
   ```

   - Depois, execute com:

   ```bash
   npx expo run:android
   # ou
   npx expo run:ios
   ```

2. **Descomente o código no AuthContext.tsx**

   - Abra `src/contexts/AuthContext.tsx`
   - Descomente os comentários relacionados ao Google Sign-In (import, configuração e função loginWithGoogle)
   - O código está marcado com comentários `/* ... */` para facilitar a identificação

3. **Configure as credenciais do Google**
   - Obtenha seu `EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID` no [Google Cloud Console](https://console.cloud.google.com/)
   - Adicione a variável ao arquivo `.env`

### Notas Técnicas

- **Expo Go Limitation**: O Google Sign-In não funciona com Expo Go devido aos requisitos de código nativo
- **Build Preview**: Sempre use o Expo Preview (iOS) ou Android build para testar autenticação com Google
- **Firebase Auth**: A autenticação via Email/Senha funciona tanto com Expo Go quanto com builds precompilados

## 📁 Estrutura do Projeto

```
labubonico/
├── src/
│   ├── api/             # Inicialização (Firebase, IA)
│   ├── components/      # Componentes reutilizáveis
│   │   └── sheets/      # Action sheets personalizadas
│   ├── contexts/        # Contexts da aplicação (Auth, Categories)
│   ├── navigation/      # Config de navegação do App (Stack, Bottom Tabs, Top Tabs)
│   ├── screens/         # Telas do aplicativo
│   ├── sheets/          # Registro e configuração de action sheets
│   ├── types/           # Definições TypeScript
│   ├── utils/           # Funções utilitárias
│   └── styles/          # Estilos compartilhados
├── assets/              # Imagens e recursos
├── app.json            # Configuração do Expo
└── package.json        # Dependências do projeto
```

## 🔒 Segurança

- Autenticação segura via Firebase Authentication
- Dados criptografados em trânsito e em repouso
- Regras de segurança do Firestore implementadas
- Acesso aos dados restrito ao usuário proprietário

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autores

- Daniel Barros - [@Barros263inf](https://github.com/Barros263inf)
- Luccas Alencar - [@luccasalencar](https://github.com/luccasalencar)
- Raul Clausson - [@raulclauson](https://github.com/raulclauson)

## 🙏 Agradecimentos

- Firebase pelo ecossistema robusto de desenvolvimento
- Expo pela facilidade no desenvolvimento mobile
- Comunidade open source

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!
