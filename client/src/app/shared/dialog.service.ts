import { Injectable } from '@angular/core';

@Injectable()
export class DialogService {

    confirm(message?: string): Promise<any> {
        return new Promise<boolean>((resolve: (arg: any) => void) => {
            resolve(window.confirm(message || 'Is it OK?'));
        });
    }
}
