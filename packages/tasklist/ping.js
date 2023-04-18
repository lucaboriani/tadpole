async function main(args) {
    const db = require("redis").createClient({"url": args.redis})
    await db.connect()
    return db.ping().then(r => ({
        "body": r
    }))
}