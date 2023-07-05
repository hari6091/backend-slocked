import { MQTTService } from "../service/mqttService.js";

// Change this to point to your MQTT broker
const MQTT_HOST_NAME = "mqtt://10.49.6.51:1883";

var mqttClient = new MQTTService(MQTT_HOST_NAME);
mqttClient.connect();
mqttClient.subscribe("teste");

export const getPublisherPage = async function (req, res) {
  try {
    res.render("pages/publisher");
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

export const publishMQTTMessage = async function (req, res) {
  try {
    const topic = req.body.topic;
    const message = req.body.message;

    console.log(`Request Topic :: ${topic}`);
    console.log(`Request Message :: ${message}`);

    mqttClient.publish(topic, message, {});
    res
      .status(200)
      .json({ status: "200", message: "Sucessfully published MQTT Message" });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};
