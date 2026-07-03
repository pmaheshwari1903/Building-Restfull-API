import fs from "node:fs/promises"

// await fs.writeFile("promise.txt","Maine tumse Wada kiya hai")

const data = await fs.readFile("promise.txt",'utf-8')
console.log(data);