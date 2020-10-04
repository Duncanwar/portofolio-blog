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

const saveQuery = (name,email,message) => {
    const newQuery = queryRef.push();
   newQuery.set({
      name: name,
      email: email,
      message: message  
    });
}

const contactForm = document.getElementById('Contact-Form');

const getInputValue =  name =>  document.getElementById(name).value; 

const submitForm = (e) => {
   // let alerts = document.querySelector('.alert');
    e.preventDefault();
    // Get values
const name = getInputValue('name');
const email = getInputValue('email');
const message = getInputValue('message');

// save query
 saveQuery(name,email,message);

// show alert


// clear form
contactForm.reset();
}

contactForm.addEventListener('submit',submitForm);

