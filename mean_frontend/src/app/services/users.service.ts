import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { User } from '../model/user';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class UserService {
    
    constructor(private http: Http) { 
    }

    getUsers(searchCriteria:any) : Observable<User[]>{
        let params: URLSearchParams = new URLSearchParams();
        params.set('name', searchCriteria);

        return this.http.get("http://localhost:3000/getUsers", { search: params })
                .map((res:any) => {
                    return res.json();
                })
                .catch((error:any) => {
                    return Observable.throw(error.json ? error.json().error : error || 'Server error')
                }); 
    }

    insertNewUser(user:User): Observable<any>{
        return this.http.post("http://localhost:3000/insertUser", user)
            .map((res:any) => {
                return res.json();
            })
            .catch((error:any) => {
                return Observable.throw(error.json ? error.json().error : error || 'Server error')
            }); 
    }

    updateUser(user:User): Observable<any>{
        return this.http.post("http://localhost:3000/updateUser", user)
            .map((res:any) => {
                return res.json();
            })
            .catch((error:any) => {
                return Observable.throw(error.json ? error.json().error : error || 'Server error')
            }); 
    }

    deleteUser(user:User): Observable<any>{
        return this.http.post("http://localhost:3000/deleteUser", { id: user._id })
        .map((res:any) => {
            return res.json();
        })
        .catch((error:any) => {
            return Observable.throw(error.json ? error.json().error : error || 'Server error')
        });
    }
}