import Student from './Student';
import { faker } from '@faker-js/faker';
import { Location } from './Student';
import Internship from './Internship';
import CustomizedMap from './CustomizedMap';

declare global {
  interface Window {
    initMap: () => void;
  }
}

const center: google.maps.LatLngLiteral = { lat: 49.2827, lng: -123.1207 };

function generateRandomLocation(): Location {
  const nearbyCoordinate = faker.location.nearbyGPSCoordinate({
    origin: [center.lat, center.lng],
    radius: 10,
  });
  return {
    lattitude: nearbyCoordinate[0],
    longitude: nearbyCoordinate[1],
  };
}

const randomStudent: Student = new Student(
  faker.person.firstName(),
  faker.person.lastName(),
  generateRandomLocation()
);

const randomIntership: Internship = new Internship(
  faker.company.name(),
  generateRandomLocation()
);

function initMap(): void {
  const map = new google.maps.Map(
    document.getElementById('map') as HTMLElement,
    {
      center,
      zoom: 8,
      mapId: 'DEMO_MAP_ID',
    }
  );

  const customMap = new CustomizedMap(map);
  customMap.addStudentMarker(randomStudent);
  customMap.addInternshipMarker(randomIntership);
}

window.initMap = initMap;
export { };
