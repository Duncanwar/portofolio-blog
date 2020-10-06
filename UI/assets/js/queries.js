// Declarations
const queryRef = firebase.database().ref('queries')
const queryTable = document.getElementById('blog')
const contactForm = document.getElementById('submitForm');

// Fetch data from firebase and display them
const displayQueries = async () => {
let tab='';
tab +=`<th>Name</th>
  <th>message</th>
  <th>Email</th>
  `;

const data = await fetch('https://fir-test-83ee9.firebaseio.com/queries.json')
  const result = await data.json();
  const key = Object.keys(result) 
  for (let d of key){
    tab +=`
    <tr>
    <td>${result[d].name}</td>
    <td>${result[d].message}</td>
    <td>${result[d].email}</td>
    </tr>
    `
}
  queryTable.innerHTML = tab;
}

// function for saving data in the firebase databse
const saveQuery = async(name,email,message) => {
  const newQuery = await queryRef.push();
  await newQuery.set({
      name: name,
      email: email,
      message: message  
    });
}

// function to get id of the input fields
const getInputValue =  id => document.getElementById(id).value; 

// function to help submit data of the contact form
const submitForm = async (e) => {
  let alerts = document.querySelector('.alert');
  e.preventDefault();
  // Get values from the form
  const name = getInputValue('name');
  const email = getInputValue('email');
  const message = getInputValue('message');
  // save query in Firebase
  await saveQuery(name,email,message);
  // show alert
  alerts.style.display = 'block';
  alerts.textContent = 'SUCCESS';
  setTimeout(()=> 
  alerts.style.display='none'
  ,3000)
  // clear form
  contactForm.reset();
}
displayQueries()
contactForm.addEventListener('submit',submitForm);
