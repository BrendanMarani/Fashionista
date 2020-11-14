export interface IUser {
    _id?: string;
    username: string;
    password: string;
  }
  
  export class User implements IUser {
    constructor(
        public username: string,
        public password: string,
        public _id?: string
    ) {
        this._id = _id ? _id : null;
        this.username = username;
        this.password = password;
    }
  }