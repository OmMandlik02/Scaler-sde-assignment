const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect("mongodb+srv://classroomom3:Classroom@cluster0.dfqsnll.mongodb.net/?retryWrites=true&w=majority");
    console.log('Database connected successfully');
}
mongoose.connection.on("disconnected", function () {
    console.log('Database disconnected');
})
mongoose.connection.on("connected", function () {
    console.log('Database connected');
})