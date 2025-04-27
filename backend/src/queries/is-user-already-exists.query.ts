import User from "../models/users.model";

export const isUserAlreadyExists = async (email: string): Promise<boolean> => {
    const existingUser = await User.findOne({ email });
    return existingUser !== null;
};
