import app from './app';
import { truncDb } from './middleware/resetdb';



//\pset pager off

const address: string = "0.0.0.0:3000"

//const rest= truncDb();


app.listen(3000, function () {
    console.log(`starting app on port : ${address}`)
})
