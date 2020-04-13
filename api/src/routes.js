import express from 'express';
import { CompressionTypes } from 'kafkajs'; 

const routes = express.Router()

routes.post('/certifications', async (req, res) => {
    // Chamar micro serviçoss
    const certificate = {
        user: { id: 1, name: 'Alysson Gomes'},
        course: 'Kafka com NodeJS',
        grade: 10
    }
    await req.producer.send({
        topic: 'issue-certificate',
        compression: CompressionTypes.GZIP,
        messages:[
            { value: JSON.stringify(certificate) },
        ],
    })
    return res.json({ ok : true })
})
    
export default routes;