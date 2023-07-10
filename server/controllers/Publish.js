import { MQTTService } from "../service/mqttService.js";
import Sala from "../models/SalaModel.js";

// Change this to point to your MQTT broker
const MQTT_HOST_NAME = "mqtt://10.0.0.105:1883";

const updateSala = async (lockId, lockState) => {
  try {
    const sala = await Sala.findOne({
      where: {
        numero: lockId,
      },
    });
    if (!sala) return res.status(404).json({ msg: "Data not found" });
    const { status } = sala;
    status = lockState;
    await Sala.update(
        { status },
        {
          where: {
            id: sala.id,
          },
        }
      );
    res.status(200).json({ msg: "Sala updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const messageCallback = async (topic, message) => {
  const command = message.toString();
  let piece = 0;
  var lockId;
  var lockState;
  for(var i; i < command.lenght(); i++){
    if(command[i] != "-" && piece == 0){
      lockId += command[i];
    } else if(command[i] != "-" && piece == 1){
      if(command[i] == "O"){
        lockState = "ativo";
      } else {
        lockState = "inativo";
      }
    } else {
      piece = 1;
    }
    console.log("muda Status");
    await updateSala(lockId, lockState);
  }
};

var mqttClient = new MQTTService(MQTT_HOST_NAME, messageCallback);
mqttClient.connect();
mqttClient.subscribe("locksPong");

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
