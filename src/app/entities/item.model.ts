export interface IItem {
    _id?: string;
    name: string;
    price: string;
    imageLink: string;
  }
  
  export class Item implements IItem {
    constructor(
        public name: string,
        public price: string,
        public imageLink: string,
        public _id?: string
    ) {
        this._id = _id ? _id : null;
        this.name = name;
        this.price = price;
        this.imageLink = imageLink;
    }
  }