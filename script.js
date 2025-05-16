// this code is use to get data from FORM tag from sign in game wich will store new user data.
let signIn = document.querySelector(`.signIn`);

if (signIn) {
  signIn.addEventListener(`click`, () => {
    let data = {
      signInUserName: document.querySelector(`.singName`).value,
      signInMail: document.querySelector(`.signMail`).value,
      signInPassword: document.querySelector(`.signPass`).value,
      confermPassword: document.querySelector(`.signPassTow`).value,
    };
    let myobj = JSON.stringify(data);
    sessionStorage.setItem(`key`, myobj);
    let storeddata = sessionStorage.getItem(`key`);
    let myobj2 = JSON.parse(storeddata);
    if (
      myobj2.signInUserName !== `` &&
      myobj2.signInPassword !== `` &&
      myobj2.signInMail !== `` &&
      myobj2.confermPassword !== ``
    ) {
      if (
        myobj2.signInMail
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        if (
          myobj2.signInPassword.length >= 8 &&
          myobj2.signInPassword.length <= 16
        ) {
          if (myobj2.confermPassword.match(myobj2.signInPassword)) {
            window.location.replace(`./logIn.html`);
          } else {
            alert(`Please re-check the password you entered.`);
          }
        } else {
          alert(
            `Entered password length should minimum 8 charecters long and maximum 16 charecters.`
          );
        }
      } else {
        alert(`Please enter correct mail address eg: alex@gmail.com`);
      }
    } else {
      alert(`Don't miss filling the datails...`);
    }
  });
}

// this code is to compare data of sign in page to let user log in to the devise.
let logIn = document.querySelector(`.logIn`);

if (logIn) {
  logIn.addEventListener(`click`, () => {
    let storeddata = sessionStorage.getItem(`key`);
    let myobj = JSON.parse(storeddata);
    let logInUserName = document.querySelector(`.logInName`).value;
    let logInPassword = document.querySelector(`.logInPass`).value;
    if (
      myobj.signInUserName === logInUserName &&
      myobj.signInPassword === logInPassword
    ) {
      window.location.replace(`./logOut.html`);
    } else {
      alert(`Invalid Username / Password`);
    }
  });
}

// this code is to get the users reason of logging out.
let logOut = document.querySelector(`.logOut`);
let reason = document.querySelectorAll(`.reason`).length;

if (logOut) {
  //this is just to fetch user name to display on log out screen with some message.
  let abc = sessionStorage.getItem(`key`);
  let xyz = JSON.parse(abc);
  let text = document.querySelector(`.text`);
  text.innerHTML = `See you soon ${xyz.signInUserName}`;

  sessionStorage.clear();

  for (let i = 0; i < reason; i++) {
    document.querySelectorAll(`.reason`)[i].addEventListener(`click`, () => {
      let storereason = {
        reason: document.querySelectorAll(`.reason`)[i].value,
      };
      let myobj = JSON.stringify(storereason);
      sessionStorage.setItem(`key`, myobj);
    });
    document.querySelectorAll(`.rad`)[i].addEventListener(`click`, () => {
      let storerad = {
        reason: document.querySelectorAll(`.rad`)[i].innerHTML,
      };
      let myobj = JSON.stringify(storerad);
      sessionStorage.setItem(`key`, myobj);
    });
  }

  // sessionStorage.clear();
  logOut.addEventListener(`click`, () => {
    let storeddata = sessionStorage.getItem(`key`);
    let myobj = JSON.parse(storeddata);
    if (myobj === null) {
      alert(`Please select the reason for a log out...`);
    } else {
      window.open(`./farewell.html`);
    }
    for (let i = 0; i < reason; i++) {
      document.querySelectorAll(`.reason`)[i].checked = false;
    }
  });
}

let farewell = document.querySelector(`.farewell`);
let band = document.querySelector(`.close`);
let label = document.querySelector(`.label`);

if (farewell) {
  let handelclick = () => {
    let storeddata = sessionStorage.getItem(`key`);
    let myobj = JSON.parse(storeddata);
    let heading = document.createElement(`h4`);
    heading.innerHTML = `${myobj.reason}`;
    label.appendChild(heading);
    farewell.removeEventListener(`click`, handelclick);
  };
  farewell.addEventListener(`click`, handelclick);
  band.addEventListener(`click`, () => {
    window.close();
  });
}
