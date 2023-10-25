import mongoose from "mongoose";

const connectDB = async () => {

    if(typeof process.env.MONGO_URI === "string"){
        try {
            const conn = await mongoose.connect(process.env.MONGO_URI)
            console.log(`MongoDB Connected: ${conn.connection.host}`)

        } catch (error) {
            console.log(error)
            process.exit(1)
        }
    }
}

module.exports = connectDB                                                          