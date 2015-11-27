/**
  * Copyright (c) 2015 Digital Airways (www.DigitalAirways.com)
  * This work is free. You can redistribute it and/or modify it under the
  * terms of the "Do What The Fuck You Want To" Public License, Version 2,
  * as published by Sam Hocevar. 
  * See http://www.wtfpl.net for more details.
  **/
module.exports = function(RED) {
    "use strict";
    var connectionPool = require(process.env.NODE_RED_HOME+"/nodes/core/io/lib/mqttConnectionPool");
    var util = require("util");
    
    function OwntracksNode(n) {
        RED.nodes.createNode(this,n);
        this.topic = n.topic;
        this.broker = n.broker;
        this.port = n.port;
        this.user = n.user;
        this.pass = n.pass;
		this.clientid = n.clientid;

        var node = this;
		
        this.status({fill:"red",shape:"ring",text:"disconnected"},true);
        this.client = connectionPool.get(this.broker,this.port,this.clientid,this.user,this.pass);
        this.client.subscribe(this.topic,2,function(topic,payload,qos,retain) {
          	var coorown = JSON.parse(payload);
        	payload = {
        			"@context" : "http://schema.org",
        			"@type" : "GeoCordinates",
        			longitude: coorown.lon,
        			latitude: coorown.lat,
        	}
			var msg = {topic:topic,payload:payload,qos:qos,retain:retain};
			node.send(msg);
        });
        this.client.on("connectionlost",function() {
            node.status({fill:"red",shape:"ring",text:"disconnected"},true);
        });
        this.client.on("connect",function() {
            node.status({fill:"green",shape:"dot",text:"connected"},true);
        });
        this.client.connect();

    }
    
    RED.nodes.registerType("owntracks", OwntracksNode);
    
    OwntracksNode.prototype.close = function() {
        if (this.client) {
            this.client.disconnect();
        }
    }
}

