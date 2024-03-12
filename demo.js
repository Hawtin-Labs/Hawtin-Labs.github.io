function startConnect(){

    clientID = "clientID - "+parseInt(Math.random() * 1000);

    host = document.getElementById("host").value;   
    port = document.getElementById("port").value;  
    userId  = document.getElementById("username").value;  
    passwordId = document.getElementById("password").value;  

    // document.getElementById("messages").innerHTML += "<span> Connecting to " + host + "on port " + port + "</span><br>";
    document.getElementById("messages").innerHTML += "<span> Connecting ... </span><br>";
    document.getElementById("messages").innerHTML += "<span> Using the client Id " + clientID +" </span><br>";

    client = new Paho.MQTT.Client(host,Number(port),clientID);

    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    client.connect({
        onSuccess: onConnect,
        useSSL: true,
        // userName: userId,
        // passwordId: passwordId
    });


}


function onConnect(){
    topic = document.getElementById("topic_s").value;

    document.getElementById("messages").innerHTML += "<span> Connected </span><br>";
    document.getElementById("messages").innerHTML += "<span> Subscribing to field "+ topic + "</span><br>";

    client.subscribe(topic);
}



function onConnectionLost(responseObject){
    document.getElementById("messages").innerHTML += "<span> ERROR: Connection is lost.</span><br>";
    if(responseObject !=0){
        document.getElementById("messages").innerHTML += "<span> ERROR:"+ responseObject.errorMessage +"</span><br>";
    }
}

function onMessageArrived(message){
    // console.log("OnMessageArrived: " + message.payloadString);
    const element = document.createElement('div');
    element.append("Field: " + message.destinationName + " | Value : " + message.payloadString);
    const autoscrollableMessages = document.querySelector('.messages');
    autoscrollableMessages.append(element);
}

function startDisconnect(){
    client.disconnect();
    document.getElementById("messages").innerHTML += "<span> Disconnected. </span><br>";
}

function publishMessage(){
msg = document.getElementById("Message").value;
topic = document.getElementById("topic_p").value;

Message = new Paho.MQTT.Message(msg);
Message.destinationName = topic;

client.send(Message);
document.getElementById("messages").innerHTML += "<span> Message to field "+topic+" is sent </span><br>";


}
