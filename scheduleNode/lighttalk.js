module.exports = function(RED) {
    "use strict";
    /*
    function publishMessage(item, client, inTopic, config) {
        client.publish(inTopic, '{\"mac\": test' + ", \"type\":100" + ", \"outNo\" :0" + ", \"value\" :" + String(item[0]) + '}');
        client.publish(inTopic, '{\"mac\": test' + ", \"type\":100" + ", \"outNo\" :1" + ", \"value\" :" + String(item[1]) + '}');
        client.publish(inTopic, '{\"mac\": test' + ", \"type\":100" + ", \"outNo\" :2" + ", \"value\" :" + String(item[2]) + '}');
        client.publish(inTopic, '{\"mac\": test' + ", \"type\":100" + ", \"outNo\" :3" + ", \"value\" :" + String(item[3]) + '}');
        console.log(item[0], item[1], item[2], item[3]);
    }*/

    function publishMessage(item, client, inTopic, config) {
        client.publish(inTopic, '{\"mac\":' + "\""+ config.id + "\"" + ", \"type\":100" + ", \"outNo\" :0" + ", \"value\" :" + String(item[0]) + '}');
        client.publish(inTopic, '{\"mac\":' + "\""+ config.id + "\"" + ", \"type\":100" + ", \"outNo\" :1" + ", \"value\" :" + String(item[1]) + '}');
        client.publish(inTopic, '{\"mac\":' + "\""+ config.id + "\"" + ", \"type\":100" + ", \"outNo\" :2" + ", \"value\" :" + String(item[2]) + '}');
        client.publish(inTopic, '{\"mac\":' + "\""+ config.id + "\"" + ", \"type\":100" + ", \"outNo\" :3" + ", \"value\" :" + String(item[3]) + '}');
        console.log(item[0], item[1], item[2], item[3]);
    }

    function test_l(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        var received = "";
        var mqtt    = require('mqtt');
        //var mongo   = require('mongodb');
        //var url     = "";
        //var database = "";
        //var collectionName = "";
        //var savedData = "";
        var curTimestamp = 0;
        var sTimestamp = 0;
        var eTimestamp = 0;
        var nodeContext = this.context();
        
        var outTopic=  String(config.id) + "-out";
        var inTopic =  String(config.id) + "-in";
        
        //var outTopic= "LightTalk-outTest";
        //var inTopic = "LightTalk-inTest";
        var curTimestamp = Date.now();
        //console.log("Date : " + date);
        
        var start = String(config.startTime);
        var end = String(config.endTime);
        
        var item = [];
        
        /*
        var offLoad = [
            '{\"mac\": test' + ", \"type\":100" + ", \"outNo\" :0" + ", \"value\" :0" + '}',
            '{\"mac\": test' + ", \"type\":100" + ", \"outNo\" :1" + ", \"value\" :0" + '}',
            '{\"mac\": test' + ", \"type\":100" + ", \"outNo\" :2" + ", \"value\" :0" + '}',
            '{\"mac\": test' + ", \"type\":100" + ", \"outNo\" :3" + ", \"value\" :0" + '}'
        ]; //turns all ports off
        */
        
        var offLoad = [
            '{\"mac\":' +  '\"'+ config.id + '\"' + ", \"type\":100" + ", \"outNo\" :0" + ", \"value\" :0" + '}',
            '{\"mac\":' +  '\"'+ config.id + '\"' + ", \"type\":100" + ", \"outNo\" :1" + ", \"value\" :0" + '}',
            '{\"mac\":' +  '\"'+ config.id + '\"' + ", \"type\":100" + ", \"outNo\" :2" + ", \"value\" :0" + '}',
            '{\"mac\":' +  '\"'+ config.id + '\"' + ", \"type\":100" + ", \"outNo\" :3" + ", \"value\" :0" + '}'
        ]; //turns all ports off
        
        var client  = mqtt.connect("mqtt://broker.mqtt-dashboard.com");

        //console.log(start, end);
        //console.log('datedtae : ' + date);
        //console.log('itemcount : ' + itemCount);
        //console.log('current : '+curTimestamp + ' start : '+sTimestamp + ' end : '+eTimestamp);

        sTimestamp = new Date(start).getTime(); //stime timestamp
        eTimestamp = new Date(end).getTime(); //etime timestamp
        console.log('start : ' + sTimestamp + 'end : ' + eTimestamp);

        if (!sTimestamp && !eTimestamp) { //form is empty, bring inputs to the current schedule
            console.log('warning');
            node.warn('전달된 페이로드가 없습니다. 스케쥴 날짜를 페이로드로 넘기거나, 노드 설정에서 스케쥴 날짜를 선택해주세요.');
            //node does not have the property of the schedule inputs, so warn the user.
        }

        else {
            item.push(config.heat);
            item.push(config.cool);
            item.push(config.exha);
            item.push(config.led);

            for (var i = 0; i < 4; i++) {
                if(item[i]!==true){
                    item[i]=false;
                }
            }
        }
        
        //node.warn('등록하신 스케쥴을 시작합니다. (' + String(node.start_time) + '~' + String(node.end_time) + ')'); 2022-11-17 수정
        node.warn('노드 스케쥴 설정 되었습니다.\n***********************\n시작 : ' + start + '\n종료 : ' + end + '\n***********************');

        if (curTimestamp < sTimestamp) { //timer hasn't started (considering the case where the flow has been restarted)
            node.warn("스케쥴 시작 전 입니다");

            setTimeout(function() {
                node.warn("등록하신 스케쥴\n***********************\n시작 : "  + start + '\n종료 : ' + end + '\n***********************\n실행됩니다.');
                publishMessage(item, client, inTopic, config);
            }, sTimestamp - curTimestamp);

            /*
            setTimeout(function() { // 이 함수 추가
                node.warn("등록하신 스케쥴\n시작 : "  + start + '\n종료 : ' + end + '\n실행됩니다.');
            }, sTimestamp - curTimestamp);
            */
           
            setTimeout(function() {
                node.warn("등록하신 스케쥴\n***********************\n시작 : "  + start + '\n종료 : ' + end + '\n***********************\n끝났습니다.'); 
                for (var i = 0; i < 4; i++) {
                    client.publish(inTopic, offLoad[i]);
                }
                
            }, eTimestamp - curTimestamp); //turn all ports off when the schedule has been finished.
            //client.publish(inTopic,"error testing 1");
            //node.warn("등록하신 스케쥴 " + String(node.start_time) + '~' + String(node.end_time) + '이 끝났습니다1.');
            // 2022-11-17 이 부분 주석처리. 불필요한 메시지

        } else if (curTimestamp >= sTimestamp && curTimestamp <= eTimestamp) { //schedule has been up and running
            //{"mac":"048e741c5210","type":100,"outNo":2,"value":1}
            node.warn("등록하신 스케쥴\n***********************\n시작 : "  + start + '\n종료 : ' + end + '\n***********************\n실행됩니다.'); 
            publishMessage(item, client, inTopic, config);

            setTimeout(function() {
                node.warn("등록하신 스케쥴\n***********************\n시작 : "  + start + '\n종료 : ' + end + '\n***********************\n끝났습니다.'); 
                for (var i = 0; i < 4; i++) {
                    client.publish(inTopic, offLoad[i]);
                }
            }, eTimestamp - curTimestamp); //reset all ports
            //client.publish(inTopic,"error testing 2");
            //node.warn("등록하신 스케쥴 " + String(node.start_time) + '~' + String(node.end_time) + '이 끝났습니다2.');    
        } else if (curTimestamp > eTimestamp) {
            node.warn("등록하신 스케쥴\n***********************\n시작 : "  + start + '\n종료 : ' + end + '\n***********************\n종료 시간이 이미 지났습니다.\n시간을 확인 후 재설정 해주세요.'); 
            /*for (var i = 0; i < 4; i++) {
                client.publish(inTopic, offLoad[i]);
            }*/
             //reset all ports since the schedule has already been finished. Just in case the ports were not reset.
            //client.publish(inTopic,"error testing 3");
            
        } else {
            
        } 
        /*
        var startArr = Array(start.split());
        var endArr = Array(end.split());
        console.log(typeof startArr);
        console.log(startArr[0], startArr[1], endArr[0], endArr[1]);
        if (startArr.length != 2 || endArr.length != 2) {
            node.warn('에러 1 : 스케쥴 입력이 올바르지 않습니다. 다시 입력해주세요.');
        } else {
            var sFrontArr = startArr[0].split('-');
            var sRearArr = startArr[1].split(':');
            var eFrontArr = endArr[0].split('-');
            var eRearArr = endArr[1].split(':');
        }
        if (sFrontArr.length != 3 || sRearArr.length != 3 || eFrontArr.length != 3 || eRearArr.length != 3) {
            node.warn('에러 2 : 스케쥴 입력이 올바르지 않습니다. 다시 입력해주세요.');
        } else {
            var startYear = sFrontArr[0];
            var startMonth = sFrontArr[1];
            var startDay = sFrontArr[2];
            var startHour = sRearArr[0];
            var startMin = sRearArr[1];
            var startSec = sRearArr[2];
            var endYear = eFrontArr[0];
            var endMonth = eFrontArr[1];
            var endDay = eFrontArr[2];
            var endHour = eRearArr[0];
            var endMin = eRearArr[1];
            var endSec = eRearArr[2];
            console.log(startYear, startMonth, startDay, startHour, startMin, startSec, endYear, endMonth, endDay, endHour, endMin, endSec);
        }*/

        
        node.connstatusSet = 0; //status set? (to prevent repetitive status actions)
        node.savedMsgEventFlag = false;
        node.msgStack = [];
        var outputs = [0, 0, 0, 0]; //initialize to 0s
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
            for (var i = 0; i < 4; i++)
                outputs[i] = Number(received.out[i]); 
            var msg1 = {};
            var msg2 = {};
            var msg3 = {};
            var msg4 = {};
            msg1.payload = outputs[0];
            msg2.payload = outputs[1];
            msg3.payload = outputs[2];
            msg4.payload = outputs[3];
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
            curTimestamp = Date.now();

            /*
            //a very dirty solution, but we don't have the info of the IDs so just manually clear all random timeouts.
            for (let i = 0; i< 100000; i++) {
                clearTimeout(i);
            } //do not add this line if the user wants to keep the schedule set before.
            */

            node.status({}); //clear the status of a node
            node.status({fill:"yellow",shape:"ring",text:"연결 중.."});
            client.end();

            //client = mqtt.connect("mqtt://broker.mqtt-dashboard.com"); 2022-11-17 이 부분 주석처리. 상단에 mqtt.connect 이 이미 존재함

            // tidy up any state
        });

        /* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ외부 Inject로 시간 값 부여할 때ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 
           ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/

        node.on('input', function(msg) {
            console.log(msg.payload);
            //var pLoad = JSON.parse(msg.payload);
            var pLoad = msg.payload;

            if (sTimestamp || eTimestamp) {
                node.warn('페이로드로 날짜를 전달할 때는 노드 설정의 스케쥴을 비워주세요.');
            }

            else if (pLoad.start_time != undefined && pLoad.end_time != undefined) {
                //{"start_time" : "", "end_time" : "" ,"outNo" : 2, "value" : 1} -> {"mac":"048e741c5210","type":100,"outNo":2,"value":1}
                node.start_time = pLoad.start_time;
                node.end_time = pLoad.end_time;

                var stime = new Date(node.start_time).getTime();
                var etime = new Date(node.end_time).getTime();


                var cur = Date.now();
                node.warn("외부에서 입력한 스케쥴\n***********************\n시작 : "  + String(node.start_time) + '\n종료 : ' + String(node.end_time) + '\n***********************\n이 설정되었습니다.');
                //node.warn('등록하신 스케쥴을 시작합니다. (' + String(node.start_time) + '~' + String(node.end_time) + ')');
                var msg_toPublish = '{\"mac\" : ' + "\"" + String(config.id) + "\",\"type\" : 100,\"outNo\" : " + String(pLoad.outNo) + ",\"value\" : " + String(pLoad.value) + "}"; 
                
                if (cur < stime) { //timer hasn't started (considering the case where the flow has been restarted)
                    node.warn("외부입력 스케쥴 시작 전 입니다");

                    setTimeout(function() {
                        node.warn("외부입력 스케쥴\n***********************\n시작 : "  + String(node.start_time) + '\n종료 : ' + String(node.end_time) + '\n***********************\n실행됩니다.');
                        client.publish(inTopic, msg_toPublish);
                    }, stime - cur);
                        
                    setTimeout(function() {
                        node.warn("외부입력 스케쥴\n***********************\n시작 : "  + String(node.start_time) + '\n종료 : ' + String(node.end_time) + '\n***********************\n끝났습니다.');
                        for (var i = 0; i < 4; i++) {
                            client.publish(inTopic, offLoad[i]);
                        }
                    }, etime - cur); //turn all ports off when the schedule has been finished.
                    //node.warn("등록하신 스케쥴 " + String(node.start_time) + '~' + String(node.end_time) + '이 끝났습니다.');

                } else if (cur >= stime && cur <= etime) { //schedule has been up and running
                    //{"mac":"048e741c5210","type":100,"outNo":2,"value":1}
                    node.warn("외부입력 스케쥴\n***********************\n시작 : "  + String(node.start_time) + '\n종료 : ' + String(node.end_time) + '\n***********************\n실행됩니다.');
                    client.publish(inTopic, msg_toPublish);

                    setTimeout(function() {
                        node.warn("외부입력 스케쥴\n***********************\n시작 : "  + String(node.start_time) + '\n종료 : ' + String(node.end_time) + '\n***********************\n끝났습니다.');
                        for (var i = 0; i < 4; i++) {
                            client.publish(inTopic, offLoad[i]);
                        }
                    }, etime - cur); //reset all ports
                    //node.warn("등록하신 스케쥴 " + String(node.start_time) + '~' + String(node.end_time) + '이 끝났습니다.');

                } else if (cur > etime) {
                    node.warn("외부입력 스케쥴\n***********************\n시작 : "  + String(node.start_time) + '\n종료 : ' + String(node.end_time) + '\n***********************\n종료 시간이 이미 지났습니다.\n시간을 확인 후 재설정 해주세요.'); 
                    /*
                    for (var i = 0; i < 4; i++) {
                        client.publish(inTopic, offLoad[i]);
                    } //reset all ports since the schedule has already been finished. Just in case the ports were not reset.
                    */
                }

                else {
                    //node.send("nothing happened");
                } //do nothing since case does not exist.
            }
            else if(pLoad.start_time == undefined && pLoad.end_time == undefined && pLoad.outNo != undefined && pLoad.value !=undefined){
                // 스케쥴 값 없이 릴레이번호, on/off 만 입력됐을 때
                var msg_toPublish = '{\"mac\" : ' + "\"" + String(config.id) + "\",\"type\" : 100,\"outNo\" : " 
                + String(pLoad.outNo) + ",\"value\" : " + String(pLoad.value) + "}"; 

                client.publish(inTopic, msg_toPublish);
            }
            //client.publish(inTopic, msg.payload);
            //node.send(msg);
        });
    }
    RED.nodes.registerType("라이트토크",test_l);
}