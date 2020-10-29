// Declarations
const queryTable = document.getElementById('blog')
const contactForm = document.getElementById('submitForm');

// Fetch data from firebase and display them
const displayQueries = async () => {
let tab='';
tab +=`<th>Name</th>
  <th>message</th>
  <th>Email</th>
  `;
const token = localStorage.getItem('token')
const data = await fetch('http://localhost:3000/api/v1/queries',{
  headers:{
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${token}`
  }
})
  const result = await data.json();
  result.data.map( d=>{
    tab +=`
    <tr>
    <td>${d.name}</td>
    <td>${d.message}</td>
    <td>${d.email}</td>
    </tr>
    `
})
  queryTable.innerHTML = tab;
}

// function for saving data in the firebase databse
const saveQuery = async(name,email,message) => {
  const formData = await fetch('http://localhost:3000/api/v1/queries',{
    method:"post",
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name,message,email})
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

if(contactForm){
  contactForm.addEventListener('submit',submitForm)
}
else{
  displayQueries()
}
