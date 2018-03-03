if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(function() {
      console.log("service worker registered");
    });
}

var facebook = new firebase.auth.FacebookAuthProvider();
// To apply the default browser preference instead of explicitly setting it.
firebase.auth().useDeviceLanguage();
// firebase.auth().languageCode = 'id';
function logIn() {
  // firebase.auth().signInWithRedirect(facebook);
  firebase.auth().signInWithPopup(facebook).then(function(result) {
    if (result.credential) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      window.location.reload();
    }
    // The signed-in user info.
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified, userToken;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;

    }
    if (document.cookie != "") {
      logged();
      window.location.reload();
    }
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log(errorCode);
    console.log(errorMessage);
  });
}


function logOut() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
    console.log("berhasil logOut");
    deleteAllCookies();
    location.href = "";
  }).catch(function(error) {
    // An error happened.
  });
}

function deleteAllCookies() {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

function readCookie() {
  var profile = new Array();
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    profile[i] = cookies[i].substr(cookies[i].indexOf("=") + 1);
  }
  return profile;
}
// console.log(readCookie());
if (document.cookie != "") {
  logged();
}
var iter = 1;
firebase.auth().onAuthStateChanged(function(User) {
  if (User) {
    var user = firebase.auth().currentUser;
    if (document.cookie == "") {
      document.cookie = "uid=" + user.uid;
      document.cookie = "name=" + user.displayName;
      document.cookie = "email=" + user.email;
      document.cookie = "photo=" + user.photoURL;
      logged();
    }
    pemReload(iter, user.uid);
    pengReload(iter);
    hutReload(iter);
    tampPem();
    tampPeng();
    tampHut();
  } else {
    deleteAllCookies();
  }
});