import User, {IUser} from "../../models/user";
import ErrorResponse from "../../utils/ErrorResponse";

export const getByEmail = async (email: string): Promise<User | null> => {
    return await User.findOne({where: {email}});
}
export const getById = async (id: number): Promise<User | null> => {
    return await User.findOne({where: {id}});
}

export const updateUserData = async (userId: number, data: IUser): Promise<User> => {
    const user = await getById(userId);

    if (!user) {
        throw ErrorResponse.notFound("user not found.");
    }

    user.phone_number = (data.phone_number) ? data.phone_number : user.phone_number;
    user.first_name = (data.first_name) ? data.first_name : user.first_name;
    user.last_name = (data.last_name) ? data.last_name : user.last_name;
    await user.save();

    return user;
}
