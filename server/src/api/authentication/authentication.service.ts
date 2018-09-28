import { UserModel } from '../../database/database';

interface Credential {
    username: string;
    password: string;
}

export const authenticateByCredentials = async (credentials: Credential): Promise<any> => {
    const user = await UserModel.findOne({ name: credentials.username });

    if (!user) {
        throw {
            statusCode: 404,
            type: 'AccountDoesNotExistsException'
        };
    } else if (user && !user.validatePassword(credentials.password)) {
        throw {
            statusCode: 404,
            type: 'AccountDoesNotExistsException'
        };
    }

    const { id, name, email } = user;
    return { id, name, email };
};

export const registerUser = async (credentials: Credential): Promise<any> => {
    const user = new UserModel({ name: credentials.username });
    user.password = user.hashPassword(credentials.password);

    try {
        await user.save();

        return user.toJson();
    } catch (error) {
        if (error.code === 11000) {
            throw {
                statusCode: 409,
                type: 'AccountAlreadyExistsException'
            };
        }

        throw error;
    }
};

export const changePassword = async (credentials: Credential): Promise<any> => {
    const user = await UserModel.findOne({ name: credentials.username });

    if (!user) {
        throw { type: 'AccountDoesNotExistsException' };
    }

    user.password = user.hashPassword(credentials.password);

    await user.save();

    return user.toJson();
};
