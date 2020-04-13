import express from 'express';
import { Kafka, logLevel } from 'kafkajs';
import routes from './routes';

const app = express();

// Conecta com o Kafka
const kafka = new Kafka({
    clientId: 'api-producer',
    brokers: ['localhost:9092'],
    retry: {
        initialRetryTime: 300,
        retries: 8
    },
    // logLevel: logLevel.NOTHING  // desabilita os logs
})

const producer = kafka.producer()

const consumer = kafka.consumer({ groupId:'certificate-group-receiver' })

// Disponibiliza o producer para todas as rotas
app.use((req, res, next) => {
    req.producer = producer;
    return next();
})

// cadastra rotas
app.use(routes);

// 
async function run(){
    await producer.connect()
    await consumer.connect()

    await consumer.subscribe({ topic: 'certification-response' }) 
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log('Resposta', `${message.value}`)
        }
    })

    app.listen(3333);
}

run().catch(console.error)
 
