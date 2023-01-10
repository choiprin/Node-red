module.exports = function(RED) {
    "use strict";

    function test_l(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var received = "";
        var mqtt    = require('mqtt');
        var nodeContext = this.context();
        var outTopic=  String(config.id) + "-out";
        var inTopic =  String(config.id) + "-in";
        
        var offLoad = [
            '{\"mac\":' +  '\"'+ config.id + '\"' + ", \"type\":100" + ", \"outNo\" :0" + ", \"value\" :0" + '}',
            '{\"mac\":' +  '\"'+ config.id + '\"' + ", \"type\":100" + ", \"outNo\" :1" + ", \"value\" :0" + '}',
            '{\"mac\":' +  '\"'+ config.id + '\"' + ", \"type\":100" + ", \"outNo\" :2" + ", \"value\" :0" + '}',
            '{\"mac\":' +  '\"'+ config.id + '\"' + ", \"type\":100" + ", \"outNo\" :3" + ", \"value\" :0" + '}'
        ]; //turns all ports off

        var onLoad = [
            '{\"mac\":' +  '\"'+ config.id + '\"' + ", \"type\":100" + ", \"outNo\" :0" + ", \"value\" :1" + '}',
            '{\"mac\":' +  '\"'+ config.id + '\"' + ", \"type\":100" + ", \"outNo\" :1" + ", \"value\" :1" + '}',
            '{\"mac\":' +  '\"'+ config.id + '\"' + ", \"type\":100" + ", \"outNo\" :2" + ", \"value\" :1" + '}',
            '{\"mac\":' +  '\"'+ config.id + '\"' + ", \"type\":100" + ", \"outNo\" :3" + ", \"value\" :1" + '}'
        ]; //turns all ports on
        
        var client  = mqtt.connect("mqtt://broker.mqtt-dashboard.com");
    
        node.connstatusSet = 0; //status set? (to prevent repetitive status actions)
        node.savedMsgEventFlag = false;
        node.msgStack = [];
        //var outputs = [0, 0, 0, 0]; //initialize to 0s
        //var configNode = RED.nodes.getNode(config);
        console.log(config.id);

        console.log(outTopic);
        console.log(inTopic);

          
        
        client.on('message',function(outTopic, msg, packet){
            console.log("connStatus : " + node.connstatusSet);
            if (!node.connstatusSet) {
                node.status({fill:"green",shape:"dot",text:"연결됨"});
                node.connstatusSet = 1;
            }
            //client.publish("LightTalk-sendMac", inTopic); //send Node-RED the topic with the MAC Addr.
            nodeContext.set("isValidMsg", true);
            console.log(msg != null);
            console.log("Message arrived : " + msg);
            console.log("With the topic of "+ outTopic);
            received = JSON.parse(String(msg));
            // for (var i = 0; i < 4; i++)
            //     outputs[i] = Number(received.out[i]); 
            // var msg1 = {};
            // var msg2 = {};
            // var msg3 = {};
            // var msg4 = {};
            // msg1.payload = outputs[0];
            // msg2.payload = outputs[1];
            // msg3.payload = outputs[2];
            // msg4.payload = outputs[3];
            //node.send([msg1, msg2, msg3, msg4]); //주석 해제 시 노드 출력에 0 or 1 지속적 출력
        });
        

        

        client.on("connect",function(){	
            console.log("connected  "+ client.connected);
            nodeContext.set("isValidMsg", false); //reset the status
            console.log(outTopic);
            client.subscribe(outTopic,{qos:0}); 
            if(client.connected==true)
                node.status({fill:"green",shape:"dot",text:"접속됨"});
            else
                node.status({fill:"red",shape:"ring",text:"절단"});
        });
        
        //handle errors
        client.on("error",function(error){
	        console.log("Can't connect" + error);
	        process.exit(1)});


        node.on('close', function() {
            node.connstatusSet = 0;
            node.status({}); //clear the status of a node
            node.status({fill:"yellow",shape:"ring",text:"연결 중.."});
            client.end();
        });

        node.on('input', function(msg) {
            var pLoad = msg.payload;

            var msg_toPublish = '{\"mac\":' + "\"" + String(config.id) + "\",\"outNo\":" 
            + String(pLoad.outNo) + ",\"value\":" + String(pLoad.value) + "}";

            var msg_toPublish2 = '{\"mac\":' + "\"" + String(config.id) + "\",\"No0\":" 
            + String(pLoad.No0) + ",\"No1\":" + String(pLoad.No1) + ",\"No2\":" + String(pLoad.No2) 
            + ",\"No3\":" + String(pLoad.No3) + "}"; 

            console.log(msg.payload);
            //var pLoad = JSON.parse(msg.payload);
            if(pLoad.outNo != undefined && pLoad.value != undefined){
                client.publish(inTopic, msg_toPublish);
            }
            else if(pLoad.No0 != undefined && pLoad.No1 != undefined && pLoad.No2 != undefined && pLoad.No3 != undefined){
                client.publish(inTopic,msg_toPublish2);
            }

            //client.publish(inTopic, msg.payload);
            //node.send(msg);
        });
    }
    RED.nodes.registerType("릴레이노드",test_l);
}