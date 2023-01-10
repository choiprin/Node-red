module.exports = function(RED) {
    "use strict";
    function test_l(config) {
        RED.nodes.createNode(this,config);
        var node = this;

        var curTimestamp = 0;
        var sTimestamp = 0;
        var eTimestamp = 0;   
        var curTimestamp = Date.now();
        
        var start = String(config.startTime);
        var end = String(config.endTime);

        sTimestamp = new Date(start).getTime(); //stime timestamp
        eTimestamp = new Date(end).getTime(); //etime timestamp

        if (!sTimestamp && !eTimestamp) { //form is empty, bring inputs to the current schedule
            node.warn('전달된 페이로드가 없습니다. 스케쥴 날짜를 페이로드로 넘기거나, 노드 설정에서 스케쥴 날짜를 선택해주세요.');
            //node does not have the property of the schedule inputs, so warn the user.
        }
        
        node.warn('노드 스케쥴 설정 되었습니다.\n***********************\n시작 : ' + start + '\n종료 : ' + end + '\n***********************');

        if (curTimestamp < sTimestamp) { //timer hasn't started (considering the case where the flow has been restarted)
            node.warn("스케쥴 시작 전 입니다");

            setTimeout(function() {
                node.warn("등록하신 스케쥴\n***********************\n시작 : "  + start + '\n종료 : ' + end + '\n***********************\n실행됩니다.');
                var msg = { payload:1 }
                node.send(msg);
            }, sTimestamp - curTimestamp);
           
            setTimeout(function() {
                node.warn("등록하신 스케쥴\n***********************\n시작 : "  + start + '\n종료 : ' + end + '\n***********************\n끝났습니다.'); 
                var msg = { payload:0 }
                node.send(msg);
            }, eTimestamp - curTimestamp);

        } else if (curTimestamp >= sTimestamp && curTimestamp <= eTimestamp) { //schedule has been up and running

            node.warn("등록하신 스케쥴\n***********************\n시작 : "  + start + '\n종료 : ' + end + '\n***********************\n실행됩니다.'); 
            setTimeout(function(){
                var msg = { payload:1 }
                node.send(msg);
            }, 0);

            setTimeout(function() {
                node.warn("등록하신 스케쥴\n***********************\n시작 : "  + start + '\n종료 : ' + end + '\n***********************\n끝났습니다.'); 
                var msg = { payload:0 }
                node.send(msg);
            }, eTimestamp - curTimestamp);

        } else if (curTimestamp > eTimestamp) {
            node.warn("등록하신 스케쥴\n***********************\n시작 : "  + start + '\n종료 : ' + end + '\n***********************\n종료 시간이 이미 지났습니다.\n시간을 확인 후 재설정 해주세요.'); 
            
        } else {
            
        } 

        /* ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ외부 Inject로 시간 값 부여할 때ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ 
           ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ*/

        node.on('input', function(msg) {
            var pLoad = msg.payload;

            if (sTimestamp || eTimestamp) {
                node.warn('페이로드로 날짜를 전달할 때는 노드 설정의 스케쥴을 비워주세요.');
            }

            else if (pLoad.start_time != undefined && pLoad.end_time != undefined) {
                node.start_time = pLoad.start_time;
                node.end_time = pLoad.end_time;

                var stime = new Date(node.start_time).getTime();
                var etime = new Date(node.end_time).getTime();


                var cur = Date.now();
                node.warn("외부에서 입력한 스케쥴\n***********************\n시작 : "  + String(node.start_time) + '\n종료 : ' + String(node.end_time) + '\n***********************\n이 설정되었습니다.');
                
                if (cur < stime) { //timer hasn't started (considering the case where the flow has been restarted)
                    node.warn("외부입력 스케쥴 시작 전 입니다");

                    setTimeout(function() {
                        node.warn("외부입력 스케쥴\n***********************\n시작 : "  + String(node.start_time) + '\n종료 : ' + String(node.end_time) + '\n***********************\n실행됩니다.');
                        msg.payload=1;
                        node.send(msg);
                    }, stime - cur);
                        
                    setTimeout(function() {
                        node.warn("외부입력 스케쥴\n***********************\n시작 : "  + String(node.start_time) + '\n종료 : ' + String(node.end_time) + '\n***********************\n끝났습니다.');
                        msg.payload=0;
                        node.send(msg);
                    }, etime - cur); //turn all ports off when the schedule has been finished.
                    //node.warn("등록하신 스케쥴 " + String(node.start_time) + '~' + String(node.end_time) + '이 끝났습니다.');

                } else if (cur >= stime && cur <= etime) { //schedule has been up and running
                    //{"mac":"048e741c5210","type":100,"outNo":2,"value":1}
                    node.warn("외부입력 스케쥴\n***********************\n시작 : "  + String(node.start_time) + '\n종료 : ' + String(node.end_time) + '\n***********************\n실행됩니다.');
                    msg.payload=1;
                    node.send(msg);

                    setTimeout(function() {
                        node.warn("외부입력 스케쥴\n***********************\n시작 : "  + String(node.start_time) + '\n종료 : ' + String(node.end_time) + '\n***********************\n끝났습니다.');
                        msg.payload=0;
                        node.send(msg);
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
            //client.publish(inTopic, msg.payload);
            //node.send(msg);
        });
    }
    RED.nodes.registerType("스케쥴노드",test_l);
}