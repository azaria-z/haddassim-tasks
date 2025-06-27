const express = require("express");
const {routeInit}=require("./routes/config_route");
const dotenv = require('dotenv');
const cors = require("cors");


dotenv.config();

const app = express();

const port =  process.env.PORT;


// app.use(cors());

app.use(express.json())
routeInit(app);
 
app.listen(port, () => console.log(`our school app is listening at ${port}`))


//חיבור למוסד הנתונים
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect(
    process.env.MONGO_CONNECT);
    console.log('connect!!')
    
}




// צריך להריץ את השרתPOSTMAN לפני ששולחים פקודות דרך 
//כותבים
//LOCALHOST:port(3000)
