import { LoginErrorType } from './login-error-type.enum';

export class LoginError {

    constructor(
        public type: LoginErrorType
    ) {}

    isWrongCredential(): boolean {
        return [
            LoginErrorType.WRONG_ACCOUNT_PASSWORD_EXCEPTION,
            LoginErrorType.ACCOUNT_DOES_NOT_EXISTS_EXCEPTION
        ].some((type: LoginErrorType) => type === this.type);
    }
}
