import mongoose, {Document, Model, Schema} from "mongoose";

export interface UsersSchema extends Document {
    name: string,
    surname: string,
    email: string,
    password: string
}

const usersSchema: Schema<UsersSchema> = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const User: Model<UsersSchema> = mongoose.model<UsersSchema>("User", usersSchema);

export default User;