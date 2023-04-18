async function main(args) {
    const db = require("redis").createClient({"url": args.redis})
    await db.connect()
    const searchRegExp = /\s/g;
    const replaceWith = '-';
    
    let key = "task:"+ args.task.replace(searchRegExp, replaceWith)
    return db.del(key)
    .then(reply => ({"del":reply}))
    .catch(err => ({"error":err}))
}