# Aplicação

[imagens]

## Instalação

### Clonando:
O primeiro comando clona apenas o backend, o segundo apenas o front-end que está em um modulo diferente. E com o terceiro comando você pode clonar ambos repositórios.

```sh
    git clone https://github.com/Nadno/vaga-react.git
    git clone https://github.com/Nadno/vaga-react-frontend.git
    git clone --recurse-submodules https://github.com/Nadno/vaga-react.git
```

### Dependências:

Para instalar as dependências, basta usar um dos comandos abaixo dentro das pastas backend e web.

```sh
    yarn install
    npm install
```

## Configurações

### Variáveis ambientes:
Para o backend é importante que seja configurado as seguintes variáveis ambientes dentro de um arquivo **.env** na raiz da pasta backend: *JWT_TOKEN_PRIVATE_KEY* e *JWT_REFRESH_TOKEN_PRIVATE_KEY*. Para cada variável basta uma sequência aleatória de caracteres. As variáveis servirão como chaves públicas/secretas para a verificação e autenticação dos usuários.

#### Ex.:
```sh
    JWT_TOKEN_PRIVATE_KEY = asfhsdsdgpshdighdjspgids
    JWT_REFRESH_TOKEN_PRIVATE_KEY = agikdaddasjlkfakdjghaldghal
```

### API
No front-end é preciso configurar a **baseURL** do *axios* no arquivo api dentro do diretório **utils**, como *localhost*, para que as demais funções fornecidas pelo util api consiga ter acesso aos caminhos a API.

## Comandos

```sh
    yarn dev
    npm run start
    yarn build
    npm run knex:migrate
```
### Backend
- *dev* inicializa o servidor de desenvolvimento com nodemon.
- *start* inicia o servidor na pasta dist, caso haja.
- *build* gera a pasta dist, utilizando o babel.
- *knex:migrate* gera o banco de dados de acordo com as migrations dentro de */database*.


### Front-end
- *dev* para desenvolvimento.
- *build* para gerar a versão de distribuição.
- *type-check* para procurar por erros de tipagem.
