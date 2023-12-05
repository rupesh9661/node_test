const amqp = require('amqplib');
const subscriber = require('./subscriber')

const publishEvent = async (queue, message) => {
  const connection = await amqp.connect(process.env.RABITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(queue, { durable: false });
  channel.sendToQueue(queue, Buffer.from(message));
  subscriber.subscribeEvent(queue)
}

module.exports = { publishEvent }
