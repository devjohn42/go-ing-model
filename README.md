# go-ing

## Requisitos

### Requisitos Funcionais

- [] O Organizador deve poder cadastrar um novo evento;
- [] O Organizador deve poder vizualizar dados de um evento;
- [] O Organizador deve poder vizualizar a lista de participantes;
- [] O Participante deve poder se inscrever em um evento;
- [] O Participante deve poder vizualizar seu crachá de inscrição;
- [] O Participante deve poder realizar check-in no evento;

### Regras de Negócio

- [x] O Participante só pode se inscrever em um evento uma única vez;
- [x] O Participante só pode se inscrever em eventos com vagas disponíveis;
- [] O Participante só pode realizar check-in em um evento uma única vez;

### Requisitos não-funcionais

- [] O check-in no evento será realizado através de um QRCode;

#### Status Code

20x => Sucesso
30x => Redirecionamento
40x => Erro do cliente (Erro em alguma informação enviada por QUEM está fazendo a chamada para API)
50x => Erro do servidor (Um erro que está acontecendo INDEPENDENTE do que está sendo enviado para o servidor)

19:38