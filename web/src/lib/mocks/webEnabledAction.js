export const webEnabledAction = {
    "annotations": [
        {
            "key": "web-export",
            "value": true
        },
        {
            "key": "raw-http",
            "value": false
        },
        {
            "key": "final",
            "value": true
        },
        {
            "key": "provide-api-key",
            "value": false
        },
        {
            "key": "exec",
            "value": "nodejs:14"
        }
    ],
    "exec": {
        "binary": false
    },
    "limits": {
        "concurrency": 1,
        "logs": 10,
        "memory": 256,
        "timeout": 60000
    },
    "name": "set",
    "namespace": "nuvolaris/tasklist",
    "publish": false,
    "updated": 1682092349204,
    "version": "0.0.4"
}