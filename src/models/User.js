import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    bio: {
        type: String,
        required: false,
        default: ''
    },
    profilePicture: {
        type: String, // URL da imagem ou caminho do arquivo
        required: false,
        default: ''
    }
});

const User = mongoose.model('User', userSchema);

// Exportação do User
export default User;