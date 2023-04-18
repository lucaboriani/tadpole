async function main(args) {
    const db = require("redis").createClient({"url": args.redis})
    await db.connect()
    let key = "address:"+ args.name
    return db.get(key)
    .then(reply => JSON.parse(reply))
    .catch(err => ({"error":err}))
}