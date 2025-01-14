# Imagens da aplicação

<p align="center"><img src="./img/mobile.jpg" alt="Print com imagens da parte mobile do site" /></p>

<p align="center"><img src="./img/desktop-cart.png" alt="Print com uma imagem desktop da página carrinho" /></p>
 
## Sobre
A aplicação possui funcionalidades como: pesquisar por um produto; filtrar por categoria; avaliar um produto; adicionar e retirar um produto do carrinho. E ao fim, na página de checkout é simulado a compra dos produtos.
Você pode acessar a aplicação [aqui](https://e-commerce-vert-one.vercel.app/products). Caso a API hospedada no *heroku* esteja em modo hibernação, você pode conferir as páginas estáticas das categorias **mouses** ou **impressoras**.

## Instalação
### Clonando
O primeiro comando clona apenas o backend, o segundo apenas o front-end que está em um módulo diferente. <mark>Com o terceiro comando, você pode clonar ambos repositórios</mark>.
 
```sh
    git clone https://github.com/Nadno/e-commerce.git
    git clone https://github.com/Nadno/e-commerce-web.git
    git clone --recurse-submodules https://github.com/Nadno/e-commerce.git
```
 
### Dependências
Para instalar as dependências, basta usar um dos comandos abaixo dentro das pastas backend e web.
 
```sh
    yarn install
    npm install
```
 
## Configurações
### API
No frontend caso não queira a url da API no heroku, você pode configurar a **baseURL** do *axios* no arquivo **api** dentro do diretório **src/utils**, como *localhost*, para que as demais funções fornecidas pelo útil api consiga ter acesso aos caminhos a API.
### Variáveis ambientes
Caso queira rodar o backend localmente, é importante que seja configurado as seguintes variáveis ambientes dentro de um arquivo **.env** na raiz da pasta backend: *JWT_TOKEN_PRIVATE_KEY* e *JWT_REFRESH_TOKEN_PRIVATE_KEY*. Para cada variável basta uma sequência aleatória de caracteres. As variáveis servirão como chaves públicas/secretas para a verificação e autenticação dos usuários.
**Ex.:**
```.env
    JWT_TOKEN_PRIVATE_KEY = asfhsdsdgpshdighdjspgids
    JWT_REFRESH_TOKEN_PRIVATE_KEY = agikdaddasjlkfakdjghaldghal
```
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
 
# Detalhes
## Typescript
Além de ajudar a identificar erros no código, *typescript* é um grande facilitador quando se trabalha com diversos tipos de dados mais complexos.
 
## Backend
Aqui aproveitei um pouco do conhecimento que já havia com *NodeJS*, *Knex*, e *Express* para criar as rotas da `API`, junto com a autenticação do usuário. E com *knex* e **sqlite3** criar as tabelas dos usuários e avaliações.
Utilizei um arquivo JSON, para guardar os produtos, de maneira a ter mais flexibilidade ante mudanças de implementações do que eu teria caso usasse um banco de dados. No backend utilizei a estrutura de classes do javascript em parte dos arquivos, com exceção de arquivos com poucas ou uma `função`.
### Controllers
#### Product: 
- Cuida do retorno dos produtos e categorias, podendo ser selecionado por `categoria` ou `id`;
- Trata avaliações/comentários, que contam com um limite de cinco comentários por página, deixando a implementação de selecionar o restante, caso haja, para o frontend;
#### User:
- Trata do cadastro e autenticação dos usuários;
- Atualiza os dados caso o usuário queira;
- Renova a autenticação do usuário quando expirada;
**Nota:** Optei por usar apenas um link para imagens, e por não implementar uma validação muito rigorosa para o cadastro a fim de ter maior flexibilidade quando for implementar o uso de imagens, e métodos de pagamento.
 
### Middlewares
#### HandleResponse
Define funções de resposta com `status` pré definidos como mostra o método abaixo:
 
```ts
    private jsonOk(this: Response, data = {}): Response  {
        const status = STATUS_CODE_OK;
        this.status(status);
 
        return this.json({ ...data, status });
    };
```
#### JWT
Impede acessos a rotas que precisam de autenticação, como a rota que simula a criação de um pedido, impedindo usuários não cadastrados de utilizá-la.
 
### Rotas
Para simplificar, comentarei apenas sobre as rotas de produtos.
- `product` que retorna um array de produtos. A rota `product` também possui um simples sistema de paginação ainda não implementado no *frontend*, dividindo o array em partes para a resposta, usando usando dois `query params`: `page` para determinar a página atual, e `offset` para o número de produtos a ser retornado por página;
- `product/:select` possui métodos que me permite selecionar os itens por categoria, id, ou como no método abaixo, por nome:
    ```ts
        public name(productName: string): object {
            const byName = ({ title }) =>
                ~title.toLowerCase().indexOf(productName.toLowerCase());
 
            return {
                products: db.products.filter(byName),
            };
        }
    ```
    A rota completa seria semelhante a: `product/name?value=#{nome_do_item}`;
- `product/rate` para criar uma avaliação/comentário de um produto, e retornar o comentário caso criado com sucesso;
- `/product/comments/:product_id` retorna comentários de um produto, com um limite de cinco por vez.
 
## Frontend
O [front-end encontra-se em outro modulo](https://github.com/Nadno/vaga-react-frontend) para facilitar o deploy dessa parte na vercel com o uso de Next. A estrutura de pastas foi separada em *components*, *HOC* (para componentes de alta ordem), *hooks*, *pages* (do próprio next), *providers* (para contexts), *screen*, *styles*, *types* e *utils*. A pasta styles cuida apenas do **tema** e **estilo global** da aplicação, os demais estilos foram mantidos com seus componentes.
Tive bastante dificuldade implementação de *loading* em componentes, portando até o momento há somente *loading* durante a navegação entre páginas.
### Next
A escolha do *Next*, deu-se para criação de caminhos estáticos, e uso de *props* estáticas, para me permitir criar páginas estáticas, como a de categoria *mouses*, que transforma sua primeira página de produtos em uma página estática junto com o uso de **meta tags**, acrescentando ao **SEO** da página, claro, de maneira simples nesta ocasião.
### Axios
Optei pelo axios devido a familiaridade com a biblioteca para o estabelecimento de uma *baseURL*, métodos **HTTP**, e cancelamento de requisições para impedir `setStates` em componentes desmontados.
### Styled Components
Acredito que usar styled components me permite, apesar de não ter conseguido aproveitar muito bem metodologias como **BEM**, a criação e reutilização de componentes/estilos repetitivos como é o caso do `Container`, `FlexContainer` e `GridContainer`, componentes que utilizei bastante nos layouts e outros componentes das páginas. Ao reutilizar o `Container` pude repassar sua animação css para todos componentes que o herdaram.

### Principais `components` / `hooks`
#### `FormData`
Como a aplicação possui quatro formulários diferentes, me dei ao trabalho de criar um *componente de alta ordem* para tratar e validar dados de formulários. O `FormData` recebe quatro parâmetros:
- `Component` o componente a ser encapsulado;
- `initialData` os dados do formulário;
- `validate` função que valida os dados do formulário;
- `optionalData` array contendo todos dados opcionais do formulário;
 
`FormData` possui três estados:
- `data` como os dados fornecido;
- `changedInput` armazena o nome do último input atualizado;
- `inputError` armazena erros dos inputs. Quando o componente é iniciado, esse estado recebe todos inputs que são requeridos, impedindo o *submit* do formulário com inputs vazios;
 
Esses estados junto a `validSubmit` (função que valida os dados antes de seu envio) e `handleChange` (função que altera o estado dos inputs), são retornados para o componente encapsulado. O componente possui um tipo, que recebe o tipo dos dados e das props do componente
 
```jsx
    const SignIn: FormComponent<SignInData /*, { props caso houvesse }*/ > = ({
        data,
        inputError,
        validSubmit,
        handleChange,
    }) => {
        //...
    }
```
 
#### `StoreProvider`
Possui métodos que validam a autenticação do usuário quando o componente é montado e então a cada cinco segundos. De maneira que sempre que o `token` estiver expirado, é feito seu `refresh`.
 
StoreProvider possui além dos estados de `token` e `refreshToken`, `account` contendo o `nome`, `avatar` e `id` do usuário. Esses estados contribuem para o **hook** `useAccount` que dá fácil acesso as funcionalidades de **login** e **logout**, e também ao `token` e `account`.
 
**Ex. da funcionalidade login:**
```ts
    const SignIn: FormComponent<SignInData> = ({
        data,
        inputError,
        validSubmit,
        handleChange,
    }) => {
        const { login } = useAccount();

        const handleSubmit = useCallback<ValidatedSubmit>(
            (warnModal) => {
                apiPost('/user/sign-in', { ...data })
                    .then(login)
                    .catch(handleRequest(warnModal));
            },
            [data, inputError]
        );

        // ...
    }
```
 
Ainda preciso refatorar `validSubmit` devido indentação *hadouken*, mas acredito estar limpo o suficiente para este exemplo.
 
StoreProvider também possui um estado chamado `cart`, que é aproveitado pelo **hook** `useCart` para facilitar o uso dos `id` dos produtos, e as funcionalidades de `addToCart` (utilizado nas páginas dos produtos) e `removeFromCart` (utilizado no próprio carrinho).
 
