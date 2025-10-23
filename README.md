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

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Expo** - Framework para desenvolvimento React Native
- **TypeScript** - Tipagem estática e melhor experiência de desenvolvimento

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
```

4. Inicie o projeto
```bash
npx start
```

## 📁 Estrutura do Projeto
```
labubonico/
├── src/
│   ├── api/             # Inicialização (Firebase, IA)
│   ├── components/      # Componentes reutilizáveis
│   ├── contexts/        # Contexts da aplicação
│   ├── navigation/      # Config de navegação do App (Stack, Bottom Tabs, Top Tabs)
│   ├── screens/         # Telas do aplicativo
│   ├── services/        # Serviços (Firebase, IA)
│   ├── types/           # Definições TypeScript
│   └── utils/           # Funções utilitárias
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