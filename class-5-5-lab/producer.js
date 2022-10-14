const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    brokers: ['pkc-ymrq7.us-east-2.aws.confluent.cloud:9092'],
    ssl: true,
    logLevel: 2,
    sasl: {
        mechanism: 'plain',
        username: 'J5PHIGDLW3FQTK5O',
        password: '+8olTPmQBrzLaY5tEhBse409l7TNeg6SgnOTRbL7dJuR0seFTU40fj71m+UKj/lQ'
    }
})

const producer = kafka.producer();
const run = async () => {
    await producer.connect()
    await producer.send({
        topic: 'bdtech-ecommerce-users-v1',
        messages: [
            { value: 'hello world' },
        ],
    })
}

run().catch(console.error)