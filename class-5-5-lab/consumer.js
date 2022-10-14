const { Kafka } = require('kafkajs');
const algoliasearch = require('algoliasearch');

const algoliaClient = algoliasearch('7PY39XS22I', '14055ed0c078950e1b255d0283d1fe50');
const index = algoliaClient.initIndex('users');

const kafka = new Kafka({
    brokers: ['pkc-ymrq7.us-east-2.aws.confluent.cloud:9092'],
    ssl: true,
    logLevel: 2,
    sasl: {
        mechanism: 'plain',
        username: 'CL44UWCRUKFWDO4J',
        password:'miguaM1WcmJozzJWB+lvamfDwqRKTFospmGcbyaZoO2rvWljkSRbUxcxOru/VydY'
    }
});
const consumer = kafka.consumer({ groupId: 'default' });

const run = async () => {
    // CONECTARSE AL SERVIDOR DE KAFKA
    await consumer.connect();

    // SUSCRIBIRSE A UN TOPICO
    await consumer.subscribe({ topic: 'bdtech-ecommerce-users-v1', fromBeginning: false });


    // INICIAR EL CONSUMIDOR
    consumer.run({
        eachMessage: async ({topic, partition, message}) => {
            const value = JSON.parse(message.value.toString());
            console.log({
                partition,
                offset: message.offset,
                value,
            });

            const user = { objectID: value.after.id, ...value.after};
            const result = await index.saveObject(user, { autoGenerateObjectIDIfNotExist: false });
            console.log(result);
        }
    })

};

run().catch(console.error)
