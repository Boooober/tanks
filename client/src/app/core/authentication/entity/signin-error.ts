import { SigninErrorType } from './signin-error-type.enum';

export class SigninError {

    constructor(
        public type: SigninErrorType
    ) {}

    isAlreadyExists(): boolean {
        return this.type === SigninErrorType.ACCOUNT_ALREADY_EXISTS_EXCEPTION;
    }
}
