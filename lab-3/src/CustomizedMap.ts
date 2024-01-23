import Internship from './Internship';
import Student, { Location } from './Student';
import { faker } from '@faker-js/faker';

export default class CustomizedMap {
  private _googleMap: google.maps.Map;

  constructor(googleMap: google.maps.Map) {
    this._googleMap = googleMap;
  }

  public addStudentMarker(student: Student) {
    this.addMarker(student.location, student.fullName);
  }

  public addInternshipMarker(internship: Internship) {
    const markerTitle = `Welcome to ${internship.businessName}'s Internship!`;
    this.addMarker(internship.location, markerTitle);
  }

  private async addMarker(location: Location, title: string) {
    const { AdvancedMarkerElement, PinElement } =
      (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary;

    const pinBackground = new PinElement({
      background: faker.color.rgb(),
      borderColor: faker.color.rgb(),
      glyphColor: faker.color.rgb(),
    });

    new AdvancedMarkerElement({
      map: this._googleMap,
      position: { lat: location.lattitude, lng: location.longitude },
      title,
      content: pinBackground.element,
    });
  }
}
