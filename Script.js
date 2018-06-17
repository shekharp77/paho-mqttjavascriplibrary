$(document).ready(function () {
// Create a client instance: Broker, Port, Websocket Path, Client ID
client = new Paho.MQTT.Client("iot.eclipse.org", Number(80), "/ws", "q1w2e3r4");
 
// set callback handlers
client.onConnectionLost = function (responseObject) {
    console.log("Connection Lost: "+responseObject.errorMessage);
}
 
client.onMessageArrived = function (message) {
  console.log("Message Arrived: "+message.payloadString);
}
 
 client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
// Called when the connection is made
function onConnect(){
    console.log("Connected!");
}

//-----------------------------------------------------------------------------------------------

$('#querry').click(function (event) {

  var input=$('#msg').val();
  
  message = new Paho.MQTT.Message(input);
  // message.destinationName = "chat/dev";
  client.send("chat/shekhar/infy",input,2);

     }
  
 
// Connect the client, providing an onConnect callback
client.connect({
    onSuccess: onConnect, 
    mqttVersion: 3,
    keepAliveInterval:120

})

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}

// called when a message arrives
function onMessageArrived(message) {
  console.log(message.payloadString);
}




      });
