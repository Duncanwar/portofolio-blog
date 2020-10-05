// Contact Form 
var firebaseConfig = {
    apiKey: "AIzaSyAxn4WuYdT_jXBxT893SgdXuv6m56t_jL0",
    authDomain: "fir-test-83ee9.firebaseapp.com",
    databaseURL: "https://fir-test-83ee9.firebaseio.com",
    projectId: "fir-test-83ee9",
    storageBucket: "fir-test-83ee9.appspot.com",
    messagingSenderId: "424866087548",
    appId: "1:424866087548:web:486d79c81bbb500b1c7ff9",
    measurementId: "G-7C7L4VCDNS"
  };
  firebase.initializeApp(firebaseConfig);

  
  //Reference queries collection
const queryRef = firebase.database().ref('queries')
const queryTable = document.getElementsByClassName('tableQueries')
// Fetch data from firebase
const displayQueries = (data,keys) => {
  let tab;
for (let t of keys){
  console.log(t)
  tab += `<tr>
  <td>${t}</td>
  </tr>
  `;
}


//queryTable.innerHTML= tab
document.getElementById('Blog').innerHTML = tab;
console.log(tab)
}

document.addEventListener("DOMContentLoaded", async event => {

  const db = await firebase.database().ref();
  const myquery = await db.child('queries');
 await myquery.on("child_added", async snap => {
   let user = await snap.val();
   const keys =  Object.keys(user);
  displayQueries(user,keys) 
  })
})

const saveQuery = async(name,email,message) => {
    const newQuery = await queryRef.push();
   await newQuery.set({
      name: name,
      email: email,
      message: message  
    });
}

const contactForm = document.getElementById('Contact-Form');

const getInputValue =  name => document.getElementById(name).value; 

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

 contactForm.addEventListener('submit',submitForm);

