import { IUser } from "../users/user.interface";
import User from "../users/user.model";


const register = async (payload: IUser) => {
    const result = await User.create(payload);
    return result;
}

export const authService = {
    register
}