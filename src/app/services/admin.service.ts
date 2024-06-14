import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private isAdmin!: boolean;
  private userExist!: boolean;
  private userId: number = 500;

  constructor() { }

  setIsAdmin( isAdmin: boolean ) {
    this.isAdmin = isAdmin;
  }

  setUserExist( userExist: boolean ) {
    this.userExist = userExist;
  }

  getIsAdmin(): boolean {
    return this.isAdmin;
  }

  getUserExist(): boolean {
    return this.userExist;
  }

  getUserID(): number {
    return this.userId;
  }
}
