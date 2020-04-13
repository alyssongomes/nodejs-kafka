# Micro-serviço com Node.js

- Utilizando o Kafka
- Utilizando o Node.js

## Aplicações 

- API principal (Station);
- Geração de certificado;

## Fluxo

- API principal envia uma mensagem pro serviço de certificado para gerar o certificado''
- Micro-serviço de certificado devolve uma resposta (sincrona/assincrona);

Se conseguir sincrona/assincrona

- Recever uma resposta assincrona de quando o e-mail com o certificado foi enviado;

## O que sabemos? (Comunicação)

- REST (latência);
- Redis / RabbitMQ / **Kafka**;
- Nubank, uber, Paypal, Netflix