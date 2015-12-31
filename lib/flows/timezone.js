    {
        "id": "8d303d08.a1e838",
        "type": "http in",
        "name": "",
        "url": "/form/timezone",
        "method": "get",
        "swaggerDoc": "",
        "x": 138.5,
        "y": 4620,
        "z": "system",
        "wires": [
            [
                "94cfa6da.1bea48"
            ]
        ]
    },
    {
        "id": "6c8a592c.1f9058",
        "type": "http response",
        "name": "",
        "x": 850,
        "y": 4620,
        "z": "system",
        "wires": []
    },
    {
        "id": "b8b249c4.2523f",
        "type": "file ejs",
        "name": "Timezone",
        "filename": "/root/thethingbox/node_modules/node-red/flow/timezone.ejs",
        "reloadfile": true,
        "x": 654.5,
        "y": 4620,
        "z": "system",
        "wires": [
            [
                "6c8a592c.1f9058"
            ]
        ]
    },
    {
        "id": "bb7f17c7.ab8178",
        "type": "comment",
        "name": "Timezone",
        "info": "",
        "x": 95,
        "y": 4580,
        "z": "system",
        "wires": []
    },
    {
        "id": "5508fa5e.385414",
        "type": "http in",
        "name": "",
        "url": "/handle/timezone",
        "method": "get",
        "swaggerDoc": "",
        "x": 146,
        "y": 4660,
        "z": "system",
        "wires": [
            [
                "727824ba.a02954",
                "27c921f2.5a1a46"
            ]
        ]
    },
    {
        "id": "daa49a3.d681368",
        "type": "http response",
        "name": "",
        "x": 651,
        "y": 4660,
        "z": "system",
        "wires": []
    },
    {
        "id": "727824ba.a02954",
        "type": "ejs",
        "name": "",
        "ejs": "Request submitted.",
        "x": 411,
        "y": 4660,
        "z": "system",
        "wires": [
            [
                "daa49a3.d681368"
            ]
        ]
    },
    {
        "id": "27c921f2.5a1a46",
        "type": "function",
        "name": "parse query",
        "func": "context.global.settings.timezone =  msg.payload.timezone;\ncontext.global.settingslib.writeSettings(context.global.settings);",
        "outputs": 1,
        "noerr": 0,
        "x": 430.5,
        "y": 4701,
        "z": "system",
        "wires": [
            []
        ]
    },
    {
        "id": "94cfa6da.1bea48",
        "type": "function",
        "name": "check.timezone",
        "func": "if(typeof context.global.settings.timezone === \"undefined\"){\n    msg.payload =  0;\n}\nelse {\n    msg.payload =  context.global.settings.timezone;\n}\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "x": 437,
        "y": 4620,
        "z": "system",
        "wires": [
            [
                "b8b249c4.2523f"
            ]
        ]
    }