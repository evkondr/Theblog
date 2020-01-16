const mongoose = require('mongoose');
async function connectDB(){
    
    await mongoose.connect("mongodb+srv://kea:kea123s4@cluster0-acnb6.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true,useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
    // we're connected!
    });
}
module.exports=connectDB