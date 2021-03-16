# Imagens da aplicação

[imagens]

## Instalação

### Clonando:
O primeiro comando clona apenas o backend, o segundo apenas o front-end que está em um modulo diferente. Com o terceiro comando, você pode clonar ambos repositórios.

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

# Aplicação

## Typescript
Além de clarear muitos lugares no código, *typescript* é um grande facilitador quando se trabalha com diversos tipos de dados mais complexos.
## Front-end
O [front-end encontra-se em outro modulo](https://github.com/Nadno/vaga-react-frontend) para facilitar o deploy dessa parte na vercel com o uso de Next.
### Next
A escolha do *Next*, deu-se para criação de caminhos estáticos, e uso de *props* estáticas, para me permitir criar páginas estáticas, como a de categoria *mouses*, que transforma sua primeira página de produtos em uma página estática junto com o uso de **meta tags**, acrescentando ao **SEO** da página, claro, de maneira simples nesta ocasião.
### Axios
Optei pelo axios devido a familiaridade com a biblioteca para o estabelecimento de uma *baseURL*, métodos **HTTP**, e cancelamento de requisições para impedir `setStates` em componentes desmontados.
### Styled Components
Acredito que user styled components me permite, apesar de não conseguir aproveitar muito bem metodologias como **BEM**, a criação e reutilização de componentes/estilos repetitivos como é o caso do `Container`, `FlexContainer` e `GridContainer`, componentes que utilizei bastante nos layouts das páginas.