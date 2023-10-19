import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,        
    },
}, {timestamps: true});

/**La variable user es el nombre del modelo, mongoose crea Users cuando es mas de 1  */
const User = mongoose.model('User', userSchema);

export default User;