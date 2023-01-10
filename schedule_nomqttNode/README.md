# 스케쥴 노드
## 시간 설정에 따라 메시지를 출력하는 노드입니다.

### *구동 방식*
***

시간 설정은 2가지 방식이 있습니다.   

__*1. 노드 내부 설정*__   
__*2. 노드 외부 입력*__   

### 1) 노드 내부 설정   

![image](https://user-images.githubusercontent.com/98401825/206356856-fbf78ac6-3d69-4e50-8d5b-c676ce540434.png)


노드 내부에서 시작시간 / 종료시간 을 선택해주시면 됩니다.   
현재 시간과 비교해서 자동으로 메시지가 출력됩니다.   
   
### 2) 노드 외부 입력   
   
![image](https://user-images.githubusercontent.com/98401825/206357117-7eb924de-b142-4ed9-bc88-26a4c80d2a27.png)

![image](https://user-images.githubusercontent.com/98401825/206357246-fe33ae6f-1253-4715-9291-c3562325f0cd.png)

노드 외부에서 입력할 때는 위와 같은 형식을 지켜주세요.   
__*주의사항*__   
외부에서 시간을 입력할 때는 노드 내부 시간 설정을 비워주세요.   

### *Node-red Flow*
***
Node-red 에서 실습해보실 수 있는 예제 코드입니다.  
__*1.노드 내부 설정*__

![image](https://user-images.githubusercontent.com/98401825/206357487-22905d80-58ea-4ba0-9b41-d8f14709a7ce.png)


~~~ 
[
    {
        "id": "c3d9fa102c60d438",
        "type": "tab",
        "label": "플로우 1",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "dc3d2153ec330a23",
        "type": "스케쥴노드",
        "z": "c3d9fa102c60d438",
        "name": "",
        "startTime": "2022-12-08T13:34",
        "endTime": "2022-12-08T13:35",
        "x": 270,
        "y": 60,
        "wires": [
            [
                "30206ffc0eeb0125"
            ]
        ]
    },
    {
        "id": "30206ffc0eeb0125",
        "type": "debug",
        "z": "c3d9fa102c60d438",
        "name": "debug 43",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 420,
        "y": 60,
        "wires": []
    }
]
~~~


__*2.노드 외부 입력*__  

![image](https://user-images.githubusercontent.com/98401825/206357606-9400f3de-2829-4755-bb04-c7a10d603bad.png)

~~~
[
    {
        "id": "c3d9fa102c60d438",
        "type": "tab",
        "label": "플로우 1",
        "disabled": false,
        "info": "",
        "env": []
    },
    {
        "id": "46aff630acdef7ef",
        "type": "debug",
        "z": "c3d9fa102c60d438",
        "name": "debug 43",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 440,
        "y": 140,
        "wires": []
    },
    {
        "id": "213f6c2dbd5c7956",
        "type": "function",
        "z": "c3d9fa102c60d438",
        "name": "function 20",
        "func": "msg.payload=\n{ \"start_time\" : \"2022-12-08 12:43\", \n    \"end_time\": \"2022-12-08 12:44\"};\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 310,
        "y": 60,
        "wires": [
            [
                "d9463ce49d31e9eb"
            ]
        ]
    },
    {
        "id": "538d9a0f678ce693",
        "type": "inject",
        "z": "c3d9fa102c60d438",
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
        "x": 140,
        "y": 60,
        "wires": [
            [
                "213f6c2dbd5c7956"
            ]
        ]
    },
    {
        "id": "d9463ce49d31e9eb",
        "type": "스케쥴노드",
        "z": "c3d9fa102c60d438",
        "name": "",
        "startTime": "",
        "endTime": "",
        "x": 250,
        "y": 140,
        "wires": [
            [
                "46aff630acdef7ef"
            ]
        ]
    }
]
~~~

**License**


김동일 http://i2r.link 


개발자 : 최윤섭