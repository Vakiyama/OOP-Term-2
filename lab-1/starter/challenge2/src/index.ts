// Create an interface that represents the data used in the function below it.
// Type the function parameter with your interface.

interface Fruit {
    name: string,
    color: string,
    sweetness: number,
    stars: number,
};

function fruitMessage(fruit: Fruit) {
  let review: string = `This ${fruit.name} has a nice ${fruit.color} color.`;
  if (fruit.sweetness < 50) {
    review += " It should be a little sweeter.";
  } else {
    review += " When I tasted it, it was just right.";
  }

  review += ` I would give it ${fruit.stars} stars.`;

  return review;
}

console.log(
  fruitMessage({ name: "Apple", color: "red", sweetness: 80, stars: 4.5 })
);

// Create an interface for an Apple by extending the Fruit interface you already made
// Add a string property to represent the 'kind' of apple. (Ex - Fuji Apple)

interface Apple extends Fruit {
    type: string,
}

// Final Problem:
/*

 Create an interface called Classroom that contains:
 - An interface representing a Teacher
 - An interface representing a list of Students

 Teacher and Student contain a fullName, age, and bloodType. 
 The only difference is: Teacher has facultyId and student has studentId.
 Use interface inheritance through "extends" to share the common properties
 through a Person interface. 
 
 Classroom should look like this:

 interface Classroom {
   instructor: Teacher;
   students: Student[]
 }

 Create a variable called oopClass which contains a fake object with data you create
 that correctly follows the Classroom interface. 

 let oopClass: Classroom = {
   // fill this out
 }
*/

interface Person {
    fullName: string,
    age: number,
    bloodType: string,
}

interface Teacher extends Person {
    facultyId: string,
}

interface Student extends Person {
    studentId: string,
}

interface Classroom {
    instructor: Teacher;
    students: Student[];
}

const instructor: Teacher = {
    fullName: "Sample Instructor",
    facultyId: "sample_id",
    age: 30,
    bloodType: "O+",
}

const studentA: Student = {
    studentId: "1",
    fullName: "sample name 1",
    age: 22,
    bloodType: "O-",
}

const studentB: Student = {
    studentId: "222",
    fullName: "sample name 2",
    age: 32,
    bloodType: "AB+",
}

const students: Student[] = [studentA, studentB]

const oopClass: Classroom = { instructor, students };
