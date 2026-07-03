import fs from "node:fs"

// Write
fs.writeFileSync("Test.txt"," Hello Everyone  ")

// Read
// const data = fs.readFileSync("Test.txt",'utf-8')
// console.log(data)

// Append
// fs.appendFileSync("Test.txt", "How are u all ?")

// make folder
// fs.mkdirSync('New Folder/ Folder Index 1', {recursive: true})

// delete/Unlink file
// fs.unlinkSync('Test.txt') //For File Deletion
// fs.rmSync('New Folder',{force:true,recursive:true}) //For Folder Deletion if folder is empty

// rename file
fs.renameSync('Test.txt', 'test.txt')

//copy file
fs.cpSync('test.txt','Copy_test.txt')