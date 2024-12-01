import bcrypt = require('bcrypt');
import {EncryptError} from "../utils/exceptions/encrypt-error";

export class EncryptPasswordHelper {
    encryptPassword(data: string): string {
        try {
            const salt: string = bcrypt.genSaltSync(10);
            return bcrypt.hashSync(data, salt);
        } catch(err) {
            throw new EncryptError("Error while encrypt the password");
        }
    };

    verifyPasswordEncrypted(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
    }


}