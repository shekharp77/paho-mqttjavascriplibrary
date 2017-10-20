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

    client.subscribe("chat/dev/infy");
    $('#msg').keypress(function (event) {
if (event.which == 13) {
var input=$('#msg').val();
                if(input!="") {   
                    $('#display').append(
                            $('<div/>')
                              .attr("class","you")
                              .addClass("jumbotron")
                              .append("<label>"+input+"</label><br>")
                              ); 
                      $('html,body').animate({ scrollTop: 9999 }, 'slow');
                    console.log(input);
                    message = new Paho.MQTT.Message(input);
                    // message.destinationName = "chat/dev/in";
                    client.send("chat/shekhar/infy",input,2);
                    var input=$('#msg').val("");
                  }

   }    

        })

//-----------------------------------------------------------------------------------------------

$('#querry').click(function (event) {

  var input=$('#msg').val();
  if(input!=""){
  $('#display').append(
          $('<div/>')
            .attr("class","querry")
            .addClass("jumbotron")
            .append("<label>"+input+"</label><br><small>"+new Date($.now())+"</small>")
            ); 
    $('html,body').animate({ scrollTop: 9999 }, 'slow');
  console.log(input);
  message = new Paho.MQTT.Message(input);
  // message.destinationName = "chat/dev";
  client.send("chat/shekhar/infy",input,2);
  var input=$('#msg').val("");

     }

        })
  
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
  $('#display').append(
  				$('<div/>')
  					.attr("class","reply")
    				.addClass("jumbotron")
    				.append("<label>"+message.payloadString+"</label><br>")
    				); 
		$('html,body').animate({ scrollTop: 9999 }, 'slow');
}




      });








