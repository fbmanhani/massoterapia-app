# APP
Pré-requisitos:
- NodeJS
- Ionic Cli
- API em execução
- VSCode ou editor de sua preferência
- Criação do client no Firebase https://console.firebase.google.com/

## Como executar

- Importar o projeto no VSCode
- Instalar o Ionic
  ```
  npm install -g @ionic/cli
  ```

- Instalar as bibliotecas 
  ```
  npm install
  ```
- Configurar as informações do client Firebase no arquivo environment.ts

  ```
  firebaseConfig: {
    apiKey: 'databasexxxx_key',
    authDomain: 'databasexxxx.firebaseapp.com',
    databaseURL: 'https://databasexxxx-3c8d9.firebaseio.com',
    projectId: 'databasexxxx',
    storageBucket: 'databasexxxx.appspot.com',
    messagingSenderId: '123123123',
    appId: '1:388123459736:web:788ce5412341741c21f30d',
  }
  ```
- Inicie a aplicação 

  ```
  ionic serve --lab
  ```
    
### Usuários 

Todos os usuários de teste estão com senha padrão 123456

- ben.alex (Administrador)
- maria.silva (Massoterapeuta)

