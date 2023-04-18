async function main(args) {
    const db = require("redis").createClient({"url": args.redis})
    await db.connect()
    let key = "address:"+ args.name
    let value = JSON.stringify({
        "name": args.name || "",
        "company": args.company || "",
        "phone": args.phone || "",
    })
    return db.set(key, value)
    .then(reply => ({"set": reply}))
    .catch(err => ({"error":err}))
}