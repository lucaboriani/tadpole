async function main(args) {
    const db = require("redis").createClient({"url": args.redis})
    await db.connect()
    let keys = await db.keys("task:*")
    return keys.length === 0
        ? {"data":[]}
        : db.mGet(keys)
        .then(reply =>({
            "data": reply.map(JSON.parse)
        }))
        .catch(err => ({"error":err}))
}