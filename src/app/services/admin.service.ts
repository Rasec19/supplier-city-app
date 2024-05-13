import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private userExist$: BehaviorSubject<boolean> = new BehaviorSubject(false);;

  constructor() { }

  setIsAdmin( isAdmin: boolean ) {
    this.isAdmin$.next( isAdmin )
  }

  setUserExist( userExist: boolean ) {
    this.userExist$.next( userExist )
  }

  getIsAdmin(): Observable<boolean> {
    return this.isAdmin$.asObservable();
  }

  getUserExist(): Observable<boolean> {
    return this.userExist$.asObservable();
  }
}
