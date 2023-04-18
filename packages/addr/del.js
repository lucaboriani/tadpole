async function main(args) {
    const db = require("redis").createClient({"url": args.redis})
    await db.connect()
    let key = "address:"+ args.name
    return db.del(key)
    .then(reply => ({"del":reply}))
    .catch(err => ({"error":err}))
}