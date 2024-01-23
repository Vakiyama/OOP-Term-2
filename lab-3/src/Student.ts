export type Location = {
  lattitude: number;
  longitude: number;
};

export default class Student {
  private _firstName: string;
  private _lastName: string;
  private _location: Location;

  constructor(firstName: string, lastName: string, location: Location) {
    this._firstName = firstName;
    this._lastName = lastName;
    this._location = location;
  }

  public get fullName() {
    return `${this._firstName} ${this._lastName}`;
  }

  public get location() {
    return this._location;
  }
}
