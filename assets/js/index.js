window.onload=function(){
  isSigInIndex();
};
function loginIndex(){
  var email = document.getElementById('loginEmail').value;
  var password= document.getElementById('loginPassword').value;

  firebase.auth().signInWithEmailAndPassword(email, password).then(
      res => {
          document.location.href='./dashboard/index.html';
      }
  ).catch(err=>{
      document.getElementById('errorMassage').style.display="block";
      document.getElementById('bodyError').innerHTML=err;
  });
};
function isSigInIndex(){
  firebase.auth().onAuthStateChanged(res => {
    if(res==null){
    }else{
      document.location.href='./dashboard/index.html';
    }
  });
};

