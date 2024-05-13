import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private isAdmin: boolean = false;
  private userExist: boolean = false;

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
}
