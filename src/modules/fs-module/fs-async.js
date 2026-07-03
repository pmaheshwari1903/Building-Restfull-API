import fs from 'node:fs'


// Write File

fs.writeFile('test.txt', 'Kese ho aap', (err) => {
    if(err){
        console.log("Error Occured");
    }
    console.log("File Written Successfully");
})


// Read File

fs.readFile('test.txt', 'utf-8' ,(err,data) => {
    if(err){
        console.log("Error Occured");
    }
    console.log("File Reading Successfull and data is:",data);
})