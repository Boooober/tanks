import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {
    confirm(message?: string) {
        return new Promise<boolean>(resolve => {
            resolve(window.confirm(message || 'Is it OK?'));
        });
    }
}
