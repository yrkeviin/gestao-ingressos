 ## 😎 ATIVIDADE-BILHETERIA-BD-API

  Esta atividade de Back-End tem como o objetivo criar rotas CRUD para uma bilheteria com ingressos de diversos eventos utilizando JavaScript e integrando-a com Banco de Dados (sql).

  #### 🎟️ Ingressos:
  
  #### - atributos

  - id - SERIAL PK
  - evento - VARCHAR(255)
  - local - VARCHAR(255)
  - data_evento - DATE
  - categoria - VARCHAR(50)
  - preco - DECIMAL(10,2)
  - quantidade_disponivel - INT

  #### - ações

  - getAllIngressos
  - getIngressos
  - createIngressos
  - updateIngressos
  - deleteIngressos
  - updateQuantidade

  🪄 A partir disso, os ingressos serão manipulados diretamente com suas requests.

  #### ⚒️ Aplicações/Apps:
  
  - Postman
  - VSCode
  - SQL Shell (psql)

  #### 🅱️ Dependências (bibliotecas):
  
  - express
  - dotenv
  - nodemon
  - cors
  - pg
  
### 🤖 ROTAS POSTMAN

  ### GET INGRESSOS

  Esta rota serve para a listagem de todos os ingressos - fixos e adicionados posteriormente.

  ```
  http://localhost:4000/api/ingressos
  ```

  #### Body

  ```
  {
        "id": 1,
        "evento": "Show MC Negao Original",
        "local": "Vitrine",
        "data_evento": "2025-04-20T03:00:00.000Z",
        "categoria": "Pista",
        "preco": "100.00",
        "quantidade_disponivel": 34
    },
    {
        "id": 4,
        "evento": "Show MC Negao Original",
        "local": "Vitrine",
        "data_evento": "2025-04-20T03:00:00.000Z",
        "categoria": "Arquibancada",
        "preco": "80.00",
        "quantidade_disponivel": 5
    },
    {
        "id": 6,
        "evento": "Show MC Tuto",
        "local": "Woods",
        "data_evento": "2025-04-24T03:00:00.000Z",
        "categoria": "Pista VIP",
        "preco": "100.00",
        "quantidade_disponivel": 42
    }
  ```
  
  ### GET INGRESSO BY ID

  Esta rota é responsável pela busca de um ingresso pelo seu **ID**.

  ```
  http://localhost:4000/api/ingressos/6
  ```

  #### Body

  ```
  {
        "id": 6,
        "evento": "Show MC Tuto",
        "local": "Woods",
        "data_evento": "2025-04-24T03:00:00.000Z",
        "categoria": "Pista VIP",
        "preco": "100.00",
        "quantidade_disponivel": 42
    }
```

 ### POST ADD INGRESSO

  Esta rota serve para adicionar um ingresso, respeitando as requisições de seu modelo.
  **{evento, local, data_evento, categoria, preco, quantidade_disponivel}**

  ```
  http://localhost:4000/api/ingressos
  ```

  #### Body

  ```
  {
        "id": 11,
        "evento": "Show MC IG",
        "local": "Curva do S",
        "data_evento": "2025-08-29T03:00:00.000Z",
        "categoria": "Pista VIP",
        "preco": "230.00",
        "quantidade_disponivel": 36
    }
```

### PUT UPDATE INGRESSO

  A rota PUT serve para atualizar os atributos de um ingresso a partir de seu **ID**.

  ```
  http://localhost:4000/api/ingressos/7
  ```

  ### DELETE INGRESSO

  A rota DELETE é responsável pela remoção de um ingresso a partir de seu **ID**.

  ```
  http://localhost:34000/api/ingressos/1
  ```

  #### Body

  ```
  {
    message: "Ingresso deletado com sucesso."
}
```

### POST VENDA_INGRESSO

  Por fim, esta rota **POST venda_ingresso** é responsável pela compra de um ingresso, solicitando seu **ID** - para identificar o evento - e a quantidade que se deseja comprar. Nesta rota há verificações de disponibilidade de ingressos em relação a quantos se deseja comprar.

  ```
  http://localhost:4000/api/venda
  ```
