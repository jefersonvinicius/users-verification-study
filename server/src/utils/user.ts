import { v4 as uuidv4 } from 'uuid';

export default class UserUtils {
    static createConfirmationCode(type: ConfirmationTypes) {
        if (type === ConfirmationTypes.Phone) {
            const code = Math.floor(Math.random() * 10000);
            return code.toString();
        }
        return uuidv4();
    }
}

export enum ConfirmationTypes {
    Email = 'email',
    Phone = 'phone',
}
