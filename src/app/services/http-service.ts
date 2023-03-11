import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AlertService } from "./alert-service";

@Injectable()
export class HttpService {

    private baseURL = 'https://reqres.in/aip';

    constructor (private httpClient:HttpClient, private alertService:AlertService){
    }
    
    get(url:string, paramData?:any){
        const data = {params:paramData};
        return this.httpClient.get(this.baseURL + url,data).pipe(catchError(this.errorHandler.bind(this)));
    }

    private errorHandler(response: any){
        const error= response.error;
        const keys= Object.keys(error);
        const key:any = keys[0];
        let message:any= error[key];
        const status:any = response.status;
    
    if (status === 401){
        //user ko logout krna hai and then again send him to login page  
    }
    if (error[key] instanceof Array){
        message = error[key][0];
    }

    if (key === 'isTrusted'){
        this.alertService.error('Please connect to internet');
    }
    else {
    this.alertService.error(message);
    }
    return throwError({message, error});
}
}