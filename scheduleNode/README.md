# lighttalk
## 라이트토크(주)에서 개발한 노드입니다.
해당 노드에서는 다음과 같은 기능을 지원합니다.
* 라이트토크 기기의 mac 주소를 입력하면 주변의 이용가능한 기기와 노드가 연결됩니다.
![image](https://user-images.githubusercontent.com/100942304/194800638-2018ee24-9028-4f96-8f1d-086cc19256d1.png)


### *Mac address*
***
위의 사진의 칸에 MAC 주소값을 넣어 주시면 됩니다.


MAC 주소값을 얻는 방법은 다음과 같습니다.


![image](https://user-images.githubusercontent.com/100942304/194800909-4f6edefc-b968-40de-bf94-39d6cd30eb94.png)


클릭하면 다음 화면으로 넘어옵니다. 이 화면에서의 MAC 주소값 문자열을 노드 설정에 입력하시면 됩니다.

![image](https://user-images.githubusercontent.com/100942304/194801183-7ca4761c-e5ed-4466-81e5-3a622f8a9f7d.png)

* 입력으로 `'{'startTime' : (시작 시간), 'endTime' : (끝나는 시간), 'outNo' : (제어하려고 하는 기기의 번호), 'value' : (1 또는 0) }'` 와 같이 JSON 형태의 페이로드를 전달해 주면 startTime 부터 endTime 까지 기기를 value에 맞게 제어하는 스케쥴 하나를 형성합니다.
* 출력으로는 현 기기들의 상태를 볼 수 있습니다.
* 노드 설정에서 직접 스케쥴을 추가하실 수 있습니다.
+ 추가하신 스케쥴이 시작하고 끝날 때 이제 노드가 알림 메시지를 디버그 탭에 출력하게 되어, 기능을 눈
으로 확인하실 수 있습니다.

+ 쉽게 테스트해보실 수 있도록 처음에는 가상 MAC 주소 **12345678** 로 설정해주시면 됩니다. 제품이 없어도 테스트는 가능합니다. MQTT 서버 통신 특성상 다른 사람이 페이로드를 같은 서버에 보낼 수 있어 관련 부분은 추후 버전에서 개선될 예정입니다.

### *Node-red Flow*
***
Node-red 에서 실습해보실 수 있는 예제 코드입니다.  
__*1.스케쥴 값을 외부에서 입력*__

![image](https://user-images.githubusercontent.com/98401825/203458261-84b4e6de-3c79-4318-9110-b68284a54db3.png)


~~~ 
[
    {
        "id": "0a7b81134c60823b",
        "type": "tab",
        "label": "플로우 1",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "6e29702fad515c3b",
        "type": "mqtt in",
        "z": "0a7b81134c60823b",
        "name": "",
        "topic": "LightTalk-inTest",
        "qos": "0",
        "datatype": "auto-detect",
        "broker": "ee14e4e972247982",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 120,
        "y": 180,
        "wires": [
            [
                "8735c42b592d19fb"
            ]
        ]
    },
    {
        "id": "c2b488f94fd35085",
        "type": "debug",
        "z": "0a7b81134c60823b",
        "name": "debug 41",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 660,
        "y": 60,
        "wires": []
    },
    {
        "id": "6c051238efeffd7e",
        "type": "debug",
        "z": "0a7b81134c60823b",
        "name": "debug 42",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 660,
        "y": 100,
        "wires": []
    },
    {
        "id": "4499a6b698c04f49",
        "type": "debug",
        "z": "0a7b81134c60823b",
        "name": "debug 43",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 660,
        "y": 140,
        "wires": []
    },
    {
        "id": "0906124032c587a9",
        "type": "debug",
        "z": "0a7b81134c60823b",
        "name": "debug 44",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 660,
        "y": 180,
        "wires": []
    },
    {
        "id": "8735c42b592d19fb",
        "type": "debug",
        "z": "0a7b81134c60823b",
        "name": "debug 45",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 300,
        "y": 180,
        "wires": []
    },
    {
        "id": "testing",
        "type": "라이트토크",
        "z": "0a7b81134c60823b",
        "name": "",
        "startTime": "2022-11-21T15:44",
        "endTime": "2022-11-21T15:45",
        "heat": true,
        "cool": false,
        "exha": "",
        "led": "",
        "x": 470,
        "y": 120,
        "wires": [
            [
                "c2b488f94fd35085"
            ],
            [
                "6c051238efeffd7e"
            ],
            [
                "4499a6b698c04f49"
            ],
            [
                "0906124032c587a9"
            ]
        ]
    },
    {
        "id": "0d7da38cdc3a034f",
        "type": "function",
        "z": "0a7b81134c60823b",
        "name": "function 19",
        "func": "msg.payload=\n{ \"start_time\" : \"2022-11-21 15:35\", \n    \"end_time\": \"2022-11-21 15:36\", \n\"outNo\" : 2, \"value\" : 1 };\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 290,
        "y": 120,
        "wires": [
            [
                "testing"
            ]
        ]
    },
    {
        "id": "39a7d86e55da9c09",
        "type": "inject",
        "z": "0a7b81134c60823b",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 120,
        "y": 120,
        "wires": [
            [
                "0d7da38cdc3a034f"
            ]
        ]
    },
    {
        "id": "da019fc40b47b78c",
        "type": "comment",
        "z": "0a7b81134c60823b",
        "name": "with Inject",
        "info": "",
        "x": 100,
        "y": 60,
        "wires": []
    },
    {
        "id": "ee14e4e972247982",
        "type": "mqtt-broker",
        "name": "",
        "broker": "mqtt://broker.mqtt-dashboard.com",
        "port": "1883",
        "clientid": "",
        "autoConnect": true,
        "usetls": false,
        "protocolVersion": "4",
        "keepalive": "60",
        "cleansession": true,
        "birthTopic": "",
        "birthQos": "0",
        "birthPayload": "",
        "birthMsg": {},
        "closeTopic": "",
        "closeQos": "0",
        "closePayload": "",
        "closeMsg": {},
        "willTopic": "",
        "willQos": "0",
        "willPayload": "",
        "willMsg": {},
        "userProps": "",
        "sessionExpiry": ""
    }
]
~~~


__*2.스케쥴 값을 노드 안에서 입력*__  

![image](https://user-images.githubusercontent.com/98401825/203458336-e3fd5d23-46a9-46f3-84af-3e7c2caf90a4.png)

~~~
[
    {
        "id": "a1b02921f2ac9763",
        "type": "tab",
        "label": "플로우 2",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "1d46afd3f81c9904",
        "type": "debug",
        "z": "a1b02921f2ac9763",
        "name": "debug 46",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 280,
        "y": 80,
        "wires": []
    },
    {
        "id": "bd8ffb173c4bbdec",
        "type": "debug",
        "z": "a1b02921f2ac9763",
        "name": "debug 47",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 280,
        "y": 120,
        "wires": []
    },
    {
        "id": "7e11355f8c6b66b5",
        "type": "debug",
        "z": "a1b02921f2ac9763",
        "name": "debug 48",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 280,
        "y": 160,
        "wires": []
    },
    {
        "id": "11c55b13233638b9",
        "type": "debug",
        "z": "a1b02921f2ac9763",
        "name": "debug 49",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 280,
        "y": 200,
        "wires": []
    },
    {
        "id": "testing",
        "type": "라이트토크",
        "z": "a1b02921f2ac9763",
        "name": "",
        "startTime": "2022-11-23T11:13",
        "endTime": "2022-11-23T11:15",
        "heat": true,
        "cool": false,
        "exha": "",
        "led": "",
        "x": 90,
        "y": 140,
        "wires": [
            [
                "1d46afd3f81c9904"
            ],
            [
                "bd8ffb173c4bbdec"
            ],
            [
                "7e11355f8c6b66b5"
            ],
            [
                "11c55b13233638b9"
            ]
        ]
    },
    {
        "id": "5889a7a80f047c26",
        "type": "mqtt in",
        "z": "a1b02921f2ac9763",
        "name": "",
        "topic": "LightTalk-inTest",
        "qos": "0",
        "datatype": "auto-detect",
        "broker": "ee14e4e972247982",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 100,
        "y": 260,
        "wires": [
            [
                "4d592988126f9042"
            ]
        ]
    },
    {
        "id": "4d592988126f9042",
        "type": "debug",
        "z": "a1b02921f2ac9763",
        "name": "debug 50",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 280,
        "y": 260,
        "wires": []
    },
    {
        "id": "87bb5d3b6bc07c93",
        "type": "comment",
        "z": "a1b02921f2ac9763",
        "name": "without Inject",
        "info": "",
        "x": 90,
        "y": 60,
        "wires": []
    },
    {
        "id": "ee14e4e972247982",
        "type": "mqtt-broker",
        "name": "",
        "broker": "mqtt://broker.mqtt-dashboard.com",
        "port": "1883",
        "clientid": "",
        "autoConnect": true,
        "usetls": false,
        "protocolVersion": "4",
        "keepalive": "60",
        "cleansession": true,
        "birthTopic": "",
        "birthQos": "0",
        "birthPayload": "",
        "birthMsg": {},
        "closeTopic": "",
        "closeQos": "0",
        "closePayload": "",
        "closeMsg": {},
        "willTopic": "",
        "willQos": "0",
        "willPayload": "",
        "willMsg": {},
        "userProps": "",
        "sessionExpiry": ""
    }
]
~~~

**License**


김동일 http://i2r.link 


개발자 : 이재진,최윤섭