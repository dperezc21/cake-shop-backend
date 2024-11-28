import bcrypt = require('bcrypt');

export class EncryptPasswordHelper {
    encryptPassword(data: string): string {
        const salt: string = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(data, salt);
    };

    verifyPasswordEncrypted(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
    }


}