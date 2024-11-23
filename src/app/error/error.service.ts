import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ErrorService{
    private errorMessageSignal=signal<string>('');
    private isErrorSignal=signal<boolean>(false);
    private showTryAgainSignal=signal<boolean>(true);
    errorMessage=this.errorMessageSignal.asReadonly();
    isError=this.isErrorSignal.asReadonly();
    showTryAgain=this.showTryAgainSignal.asReadonly();


    emitError(message:string,showTryAgain: boolean = true){
        this.showTryAgainSignal.set(showTryAgain);
        this.errorMessageSignal.set(message);
        this.isErrorSignal.set(true);
    }
    closeError(){
        this.errorMessageSignal.set('');
        this.isErrorSignal.set(false);
    }
}