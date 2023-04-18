async function main(args) {
    const db = require("redis").createClient({"url": args.redis})
    await db.connect()
    const searchRegExp = /\s/g;
    const replaceWith = '-';
    let key = "task:"+ args.task.replace(searchRegExp, replaceWith)
    let value = JSON.stringify({
        "task": args.task || "",
        "complete": args.complete || false
    })
    return db.set(key, value)
    .then(reply => ({"set": reply}))
    .catch(err => ({"error":err}))
}