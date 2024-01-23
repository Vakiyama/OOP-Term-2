import { Location } from './Student';
/* `Internship` should have the following data:

- businessName
- A location ( a location has a latitude and longitude ) (lat and lon should be numbers)

You need to show a Google map on the page. In order to do this:

1. Visit: https://console.developers.google.com
2. Login and Enable Google Maps support inside a project */

export default class Internship {
  private _businessName: string;
  private _location: Location;

  constructor(businessName: string, location: Location) {
    this._businessName = businessName;
    this._location = location;
  }

  public get businessName() {
    return this._businessName;
  }
  public get location() {
    return this._location;
  }
}
