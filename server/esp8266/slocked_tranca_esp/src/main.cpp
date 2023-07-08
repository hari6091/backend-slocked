#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>

// WiFi configs
const char* ssid = "Network_ID";
const char* password = "Network_Pass";

// MQTT Config
const char *mqtt_broker = "MQTT_IP";
const char *serverTopic = "MPU/Keyboard";
const char *pongTopic = "locksPong";
const char *mqtt_username = "";
const char *mqtt_password = "";
const int mqtt_port = 1883;

// Identifying as a client
WiFiClient espClient;
PubSubClient client(espClient);

const char *id = "D18";
boolean open = false;

void reconnectWiFi();
void setupWifi();
void reconnectMQTT();
void callback(char *, uint8_t *, unsigned int);
void setupMQTT();
const char *converter(uint8_t);
void sendPong(boolean);

void setup() {
  Serial.begin(9600);
  setupWifi();
  setupMQTT();
}

void loop() {
  if(WiFi.status() != WL_CONNECTED){
    reconnectWiFi();
  }
  if(!client.connected()){
    reconnectMQTT();
  }
  client.subscribe(serverTopic);  
  client.loop();
}

void reconnectWiFi(){
  // Starting the conection
  WiFi.begin(ssid, password);
  // Waiting conection been established
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
}

void setupWifi(){
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  // Seting the ESP8266 as a client not an AP 
  WiFi.mode(WIFI_STA);
  reconnectWiFi();
  // Visual confirmation
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.println("");
  
}

void reconnectMQTT(){
  while(!client.connected()){
    if(client.connect("ESP8266-Receptor", mqtt_username, mqtt_password)){
      Serial.println("Conected on Broker!!");
    } else {
      Serial.print("failed with state ");
      Serial.print(client.state());
      delay(2000);
    }
  }
}

void callback(char *topic, uint8_t *payload, unsigned int length) {
  // Callback for listen what is been published
  char *message = "";
  for (uint i; i < length; i++){
    const char *u = converter(payload[i]);
    strcat(message, u);
  }
  if(message == id){
    open = !open;
    sendPong(open);
  }

}

void setupMQTT(){
  // Seting things here
  client.setServer(mqtt_broker, mqtt_port);
  client.setCallback(callback);
  Serial.println("Conecting to Broker...");
  
  // Enlace until conects to the broker
  reconnectMQTT();
}

const char *converter(uint8_t character) {
  if (character >= 48 && character <= 59) {
    return (const char[]){(char)character, '\0'};
  } else if (character >= 65 && character <= 90) {
    return (const char[]){(char)character, '\0'};
  } else {
    return "!";
  }
}

void sendPong(boolean open){
  if(open){
    client.publish(pongTopic, "D18-O");
  } else {
    client.publish(pongTopic, "D18-C");
  }
}