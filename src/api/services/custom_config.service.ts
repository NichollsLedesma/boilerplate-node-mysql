import Custom_config, {IConfig} from "../../models/custom_config";
import ErrorResponse from "../../utils/ErrorResponse";

export const getUserConfig = async (userId: number): Promise<Custom_config | null> => {
    return await Custom_config.findOne({where: {user_id: userId}});
}

export const addNewConfig = async (userId: number): Promise<Custom_config> => {
    const config = await getUserConfig(userId);

    if (config) {
        throw ErrorResponse.unprocessableEntity("config already exists");
    }

    const newConfig = new Custom_config();
    newConfig.user_id = userId;
    await newConfig.save();

    return newConfig;
}

export const updateConfig = async (userId: number, data:IConfig): Promise<Custom_config> => {
    let config = await getUserConfig(userId);

    if (!config) {
        config = await addNewConfig(userId);
    }

    config.factor_authorization = data.factor_authorization;
    config.code = null;
    await config.save();

    return config;
}