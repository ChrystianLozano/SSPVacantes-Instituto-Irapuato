window.onload=function(){
    isSigInDash();
    firebase.firestore().collection("vacantes").where("bhabilitado","==","1")
    .onSnapshot(res=>{
      vacanciesList(res);
    });
  };
function isSigInDash(){
    firebase.auth().onAuthStateChanged(res => {
      if(res==null){
      }else{
      }
    });
  };
function getOut(){
    firebase.auth().signOut().then(res=>{
      document.location.href="../index.html"
    }).catch(err => {
      alert(err)
    })
  }
function vacanciesList(res){
  var container = ''
  // res.forEach(rpta => {
  //   var rowdata = rpta.data();
  //  container+=`<tr>
  //   <td>${rowdata.empresa}</td>
  //   <td>${rowdata.titulo}</td>
  //   <td>${rowdata.vistas}</td>
  //   <td>${rowdata.fecha}</td>
  //   <td>61</td>
  //  </tr>`
  // });

  //document.getElementById("vacancies").innerHTML=container;
  var dataSet = new Array();
  var dataSetExport = new Array();
res.forEach(rpta => {
  var rowdata = rpta.data();
  var optionButton = "<a  class='btn btn-info btn-icon-split' onclick='openModalView((\"" + rpta.id + "\"))' data-toggle='modal' data-target='#modalView' style='color: white;'><span class='icon text-white-50'><i class='fas fa-eye'></i></span><span class='text'>Ver Vacante</span></a>"

  dataSet.push([rowdata.empresa, rowdata.titulo,rowdata.fecha, optionButton]);
});


  $(document).ready(function() {
    $('#tableMain').DataTable( {
      "language": {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        },
        data: dataSet,
        columns: [
          { title: "Empresa" },
          { title: "Descripción de la Vacante" },
          { title: "Fecha de publicación" },
          { title: "Información" }
        ],
        retrieve: true
    } );
} );

};


function openModalView(id){
  backImg = Math.floor(Math.random() * (9 - 1)) + 1;
  document.getElementById('layerID').style.backgroundImage="url(../login/assets/img/0" + backImg + ".png)";
    clean();
    firebase.firestore().collection("vacantes").doc(id).get()
    .then(res => {
      document.getElementById("viewEmpresaVacante").innerHTML=res.data().empresa;
      document.getElementById("viewTituloVacante2").innerHTML=res.data().titulo;
      document.getElementById("viewDescripcionVacante").innerHTML=res.data().descripcion;
      document.getElementById("viewContactoVacante").innerHTML=res.data().contacto;
      document.getElementById("viewTelefonoVacante").innerHTML="Teléfono: " + res.data().telefono;
      document.getElementById("viewCorreoVacante").innerHTML="Correo: " + res.data().correo;
      document.getElementById("viewDireccionVacante").innerHTML="Dirección: " + res.data().direccion;
    }).catch(err => {
      alert(err);
    });
};
function clean(){

};
