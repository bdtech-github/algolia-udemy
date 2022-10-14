const { Kafka } = require('kafkajs')

const kafka = new Kafka({
    brokers: [''],
    ssl: true,
    logLevel: 2,
    sasl: {
        mechanism: 'plain',
        username: '',
        password: ''
    }
})

const producer = kafka.producer();
const run = async () => {
    await producer.connect()
    await producer.send({
        topic: '',
        messages: [
            { value: 'hello world' },
        ],
    })
}

run().catch(console.error)