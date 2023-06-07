
const student = {

  id: 1,
  firstName: "Jane",
  lastName: "Smith",
  age: 22,
  gender: "Female",
  email: "janesmith@example.com",
  phoneNumber: "987-654-3210",
  address: "456 Elm Street",
  major: "Psychology",
  yearOfStudy: "4",
  status: "Pending",
  isDelete: false,

};

const student2 = {

  id: 2,
  firstName: "John",
  lastName: "Doe",
  age: 20,
  gender: "Male",
  email: "johndoe@example.com",
  phoneNumber: "123-456-7890",
  address: "123 Main Street",
  major: "Computer Science",
  yearOfStudy: "2",
  status: "Active",
  isDelete: false,

};

const student3 = {

  id: 3,
  firstName: "Judy",
  lastName: "Beck",
  age: 20,
  gender: "Female",
  email: "judy@example.com",
  phoneNumber: "234-456-7890",
  address: "Canada",
  major: "Child care",
  yearOfStudy: "4",
  status: "Pending",
  isDelete: false,

};

const studentList = [student,student2]
studentList.push(student3)

let addStd = ()=>{

  let id = Number(document.getElementById('id').value);
  let firstName = document.getElementById('firstName').value;
  let lastName = document.getElementById('lastName').value;
  let age = document.getElementById('age').value;
  let gender = document.getElementById("gender").value;
  let email = document.getElementById("email").value;
  let phoneNumber = document.getElementById("phoneNumber").value;
  let address = document.getElementById("address").value;
  let major = document.getElementById("major").value;
  let yearOfStudy = document.getElementById("yearOfStudy").value;

  let newStd = {
    id: id,
    firstName: firstName,
    lastName: lastName,
    age: age,
    gender: gender,
    email: email,
    phoneNumber: phoneNumber,
    address: address,
    major: major,
    yearOfStudy: yearOfStudy,
    status: "Pending",
    isDelete: false,
  };
  studentList.push(newStd);
  renderStudents(studentList)

}

let makeActive = (stdId) =>{
  studentList.forEach((std)=>{
    if(std.id == stdId){
      let btn = document.getElementById(("activateBtn" + stdId))
      if(std.status == "Pending"){
          std.status = "Active"
          btn.innerHTML = "de-activate"
      }
      else{
          std.status = "Pending"
          btn.innerHTML = "Activate"
      }
    }
  })
};

let delStd = (stdId) =>{
  studentList.forEach((std)=>{
    if(std.id == stdId){
      if( std.status != "Active" ){
        alert("student not active");
      }
      else{
        std.isDelete = true;
        renderStudents(studentList)
      }
    }
  })
};

let renderStudents = (list) => {
  

    let newMap = list.filter((std)=>{return std.isDelete == false})

    newMap = newMap.map((std)=>{
                let state = std.status == "Active" ? "De-activate" : "Activate";
                return `
                <tr>
                    <td>${std.id}</td>
                    <td>${std.firstName} ${std.lastName}</td>
                    <td>
                        <button id="activateBtn${std.id}" onclick="makeActive(${std.id})">${state}</button>
                        <button onclick="showStudent(${std.id})">Show Data</button>
                        <button onclick="delStd(${std.id})">Delete</button>
                    </td>
                </tr>
                `
    }).join(' ')

    document.getElementById('myTable').getElementsByTagName('tbody')[0].innerHTML = newMap
    

    
}

const showStudent = (stdId) => {

  console.log("stdId", stdId);
  const studentData = document.getElementById("std-data");
  let std = studentList.findIndex((element)=>element.id == stdId);
  std = studentList[std];
  let text = `
                    <h2>Student Information</h2>
                    <p><strong>ID:</strong> <span id="id">${std.id}</span></p>
                    <p><strong>First Name:</strong> <span id="firstName">${std.firstName}</span></p>
                    <p><strong>Last Name:</strong> <span id="lastName">${std.lastName}</span></p>
                    <p><strong>Age:</strong> <span id="age">${std.age}</span></p>
                    <p><strong>Gender:</strong> <span id="gender">${std.gender}</span></p>
                    <p><strong>Email:</strong> <span id="email">${std.email}</span></p>
                    <p><strong>Phone Number:</strong> <span id="phoneNumber">${std.phoneNumber}</span></p>
                    <p><strong>Address:</strong> <span id="address">${std.address}</span></p>
                    <p><strong>Major:</strong> <span id="major">${std.major}</span></p>
                    <p><strong>Year of Study:</strong> <span id="yearOfStudy">${std.yearOfStudy}</span></p>
                    <p><strong>Status:</strong> <span id="status">${std.status}</span></p>
                    <p><strong>Is Deleted:</strong> <span id="isDelete">${std.isDelete}</span></p>
              `
  if( std.status != "Active" ){
    studentData.classList.remove("display-block");
    studentData.classList.add("display-none");
    alert("The Student is Pending");
  }else{
    studentData.classList.remove("display-none");
    studentData.classList.add("display-block");
  }

  studentData.innerHTML = text;

};

let filtering = () => {
  let filteredList = studentList;
  let a = document.getElementById("filter-age").value
  let b = document.getElementById("filter-major").value
  if( a == "" || a == null ) a = false;
  if( b == "" || b == null ) b = false;
  if( !a && !b ){
    alert("ENTER A FILTER!")
    renderStudents(studentList)
    return;
  }
  if( !b ){
    a = Number(a)
    filteredList = studentList.filter((element)=>{
      return element.age == a
    })
  }
  if( !a ){
    filteredList = studentList.filter((element)=>{
      return element.major == b
    })
  }

  renderStudents(filteredList)
}
renderStudents(studentList)