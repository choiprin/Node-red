# 릴레이 노드
## 4채널 보드의 릴레이를 동작시키는 노드 입니다.

### *Mac address*
***

![1_mac input](https://user-images.githubusercontent.com/98401825/206085780-b05a0a76-bd41-48db-a58f-c0028edfd24f.png)

위와 같이 노드 설정에서 MAC 주소값을 넣어 주시면 됩니다.


MAC 주소값을 얻는 방법은 다음과 같습니다.   
__*1. 아두이노 시리얼 모니터 확인*__   
__*2. 4채널 보드의 ESP32 칩 겉면 확인*__ 

### 1) 아두이노 시리얼 모니터 확인   

![2_mac check](https://user-images.githubusercontent.com/98401825/206086249-81f43df4-f806-4465-8e2d-678d8162bf1e.png)


위와 같이 시리얼 모니터에서 Mac address를 확인할 수 있습니다.   
   
### 2) 4채널 보드의 ESP32 칩 겉면 확인

![3_esp32 mac](https://user-images.githubusercontent.com/98401825/206086323-c7b88e4a-e01a-467b-9a26-be9d65ed5386.jpg)   
   
Mac address만 정상적으로 기입 하시면 자동으로 MQTT 서버에 접속 됩니다.   
***
### *구동 방식 ( 입력 데이터 구분 )*

해당 노드는 2가지의 기능을 갖고 있습니다.   

__*1. 릴레이 개별 구동*__   
__*2. 릴레이 전체 구동*__   

### 1) 릴레이 개별 구동   

![image](https://user-images.githubusercontent.com/98401825/206086949-44589664-0743-403b-bdfc-f1602133cba6.png)

입력되는 데이터의 형식 입니다. 두 가지 key 중   
outNo는 릴레이 순서(0 ~ 3) value는 on/off 입니다.   
   
### 2) 릴레이 전체 구동   
   
![image](https://user-images.githubusercontent.com/98401825/206087083-8cc5db82-94c5-47f2-884a-baf5a0642ac6.png)

개별 데이터와 다르게 한 msg로 제어하고 싶을 때는
위와 같이 No0 ~ No3 으로 입력 해주세요.

### *Node-red Flow*
***
Node-red 에서 실습해보실 수 있는 예제 코드입니다.  
__*1.릴레이 개별 구동*__

![image](https://user-images.githubusercontent.com/98401825/206088113-3af4fa8c-0e90-4d8e-8fea-5782f422adf9.png)


~~~ 
[
    {
        "id": "14c9fc5abc1defe8",
        "type": "tab",
        "label": "플로우 3",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "c049ef34003c",
        "type": "릴레이노드",
        "z": "14c9fc5abc1defe8",
        "name": "",
        "startTime": "",
        "endTime": "",
        "heat": "",
        "cool": "",
        "exha": "",
        "led": "",
        "x": 550,
        "y": 200,
        "wires": []
    },
    {
        "id": "5887c22f6d8fa367",
        "type": "inject",
        "z": "14c9fc5abc1defe8",
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
        "x": 100,
        "y": 240,
        "wires": [
            [
                "ca901640739770fb"
            ]
        ]
    },
    {
        "id": "ca901640739770fb",
        "type": "function",
        "z": "14c9fc5abc1defe8",
        "name": "outNo 1 켜기",
        "func": "msg.payload={\n    \"outNo\":1,\n    \"value\":0\n    \n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 270,
        "y": 240,
        "wires": [
            [
                "c049ef34003c"
            ]
        ]
    },
    {
        "id": "abac927800514904",
        "type": "function",
        "z": "14c9fc5abc1defe8",
        "name": "outNo 1 끄기",
        "func": "msg.payload={\n    \"outNo\":1,\n    \"value\":1\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 270,
        "y": 280,
        "wires": [
            [
                "c049ef34003c"
            ]
        ]
    },
    {
        "id": "0b4d43c6b77467c8",
        "type": "inject",
        "z": "14c9fc5abc1defe8",
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
        "x": 100,
        "y": 280,
        "wires": [
            [
                "abac927800514904"
            ]
        ]
    },
    {
        "id": "84bcfc77147de92f",
        "type": "function",
        "z": "14c9fc5abc1defe8",
        "name": "outNo 0 켜기",
        "func": "msg.payload={\n    \"outNo\":0,\n    \"value\":0\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 270,
        "y": 340,
        "wires": [
            [
                "c049ef34003c"
            ]
        ]
    },
    {
        "id": "4ca388479787c92e",
        "type": "function",
        "z": "14c9fc5abc1defe8",
        "name": "outNo 0 끄기",
        "func": "msg.payload={\n    \"outNo\":0,\n    \"value\":1\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 270,
        "y": 380,
        "wires": [
            [
                "c049ef34003c"
            ]
        ]
    },
    {
        "id": "18bfd078b9bfe289",
        "type": "inject",
        "z": "14c9fc5abc1defe8",
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
        "x": 100,
        "y": 380,
        "wires": [
            [
                "4ca388479787c92e"
            ]
        ]
    },
    {
        "id": "f8590fe79ab38b4f",
        "type": "inject",
        "z": "14c9fc5abc1defe8",
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
        "x": 100,
        "y": 340,
        "wires": [
            [
                "84bcfc77147de92f"
            ]
        ]
    },
    {
        "id": "f2682838defe8ebd",
        "type": "inject",
        "z": "14c9fc5abc1defe8",
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
        "x": 100,
        "y": 40,
        "wires": [
            [
                "c280b44abcaa6420"
            ]
        ]
    },
    {
        "id": "c280b44abcaa6420",
        "type": "function",
        "z": "14c9fc5abc1defe8",
        "name": "outNo 3 켜기",
        "func": "msg.payload={\n    \"outNo\":3,\n    \"value\":0\n    \n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 270,
        "y": 40,
        "wires": [
            [
                "c049ef34003c"
            ]
        ]
    },
    {
        "id": "4f2ae18ee5f45227",
        "type": "function",
        "z": "14c9fc5abc1defe8",
        "name": "outNo 3 끄기",
        "func": "msg.payload={\n    \"outNo\":3,\n    \"value\":1\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 270,
        "y": 80,
        "wires": [
            [
                "c049ef34003c"
            ]
        ]
    },
    {
        "id": "536e51c66d2628df",
        "type": "inject",
        "z": "14c9fc5abc1defe8",
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
        "x": 100,
        "y": 80,
        "wires": [
            [
                "4f2ae18ee5f45227"
            ]
        ]
    },
    {
        "id": "b7fc0867b6f62906",
        "type": "function",
        "z": "14c9fc5abc1defe8",
        "name": "outNo 2 켜기",
        "func": "msg.payload={\n    \"outNo\":2,\n    \"value\":0\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 270,
        "y": 140,
        "wires": [
            [
                "c049ef34003c"
            ]
        ]
    },
    {
        "id": "0262f648f0c90c14",
        "type": "function",
        "z": "14c9fc5abc1defe8",
        "name": "outNo 2 끄기",
        "func": "msg.payload={\n    \"outNo\":2,\n    \"value\":1\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 270,
        "y": 180,
        "wires": [
            [
                "c049ef34003c"
            ]
        ]
    },
    {
        "id": "fc11ecceeef4b16d",
        "type": "inject",
        "z": "14c9fc5abc1defe8",
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
        "x": 100,
        "y": 180,
        "wires": [
            [
                "0262f648f0c90c14"
            ]
        ]
    },
    {
        "id": "c38144eff08b6bed",
        "type": "inject",
        "z": "14c9fc5abc1defe8",
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
        "x": 100,
        "y": 140,
        "wires": [
            [
                "b7fc0867b6f62906"
            ]
        ]
    }
]
~~~


__*2.릴레이 전체 구동*__  

![image](https://user-images.githubusercontent.com/98401825/206088319-a9bea02b-57ca-4459-9a45-78f3bb6d8c42.png)

~~~
[
    {
        "id": "14c9fc5abc1defe8",
        "type": "tab",
        "label": "플로우 3",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "8ad5518f6ab8c763",
        "type": "inject",
        "z": "14c9fc5abc1defe8",
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
        "y": 80,
        "wires": [
            [
                "300bd355e9a8c32b"
            ]
        ]
    },
    {
        "id": "300bd355e9a8c32b",
        "type": "function",
        "z": "14c9fc5abc1defe8",
        "name": "function 20",
        "func": "msg.payload={\n    \"No0\":1,\n    \"No1\":0,\n    \"No2\":0,\n    \"No3\":1\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 290,
        "y": 80,
        "wires": [
            [
                "c049ef34003c"
            ]
        ]
    },
    {
        "id": "c049ef34003c",
        "type": "릴레이노드",
        "z": "14c9fc5abc1defe8",
        "name": "",
        "startTime": "",
        "endTime": "",
        "heat": "",
        "cool": "",
        "exha": "",
        "led": "",
        "x": 470,
        "y": 80,
        "wires": []
    }
]
~~~

**License**


김동일 http://i2r.link 


개발자 : 최윤섭