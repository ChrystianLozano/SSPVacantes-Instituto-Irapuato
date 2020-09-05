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
          document.getElementById('detailsUser').innerHTML="MODO DEMOSTRACIÓN";
          document.getElementById('detalsImgOff').style.display="none";
          document.getElementById('detalsImgOn').style.display="block";
          document.getElementById('buttonIn').style.display="none";
          document.getElementById('buttonOut').style.display="block";
          document.getElementById('publishVacant').style.display="inline-block";
          document.getElementById('alltheshit').style.display="block";


      }else{
        document.getElementById('detailsUser').innerHTML="Ingresaste como: <br> " + res.email
        document.getElementById('detalsImgOff').style.display="none";
        document.getElementById('detalsImgOn').style.display="block";
        document.getElementById('buttonIn').style.display="none";
        document.getElementById('buttonOut').style.display="block";
        document.getElementById('publishVacant').style.display="inline-block";
        document.getElementById('alltheshit').style.display="block";
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
  var optionButton = "<a href='#' onclick='openModalView((\"" + rpta.id + "\"))'  class='btn btn-info btn-circle btn-sm mx-2'><i class='fas fa-eye'></i></a>";
  optionButton+="<a href='#' class='btn btn-warning btn-circle btn-sm mx-2 my-1' onclick='openModal(\"" + rpta.id + "\")' data-toggle='modal' data-target='#exampleModal'>  <i class='fas fa-edit'></i></a>";
  optionButton+="<a href='#' class='btn btn-danger btn-circle btn-sm mx-2' onclick='Delete(\"" + rpta.id + "\")'>  <i class='fas fa-trash'></i></a>";

  dataSet.push([rowdata.empresa, rowdata.titulo,rowdata.fecha, optionButton]);
  dataSetExport.push([rowdata.fecha, rowdata.empresa,rowdata.contacto,rowdata.telefono,rowdata.correo,rowdata.direccion,rowdata.titulo,rowdata.descripcion]);

});


  $(document).ready(function() {
    $('#tableMain').DataTable( {
      "language": {
        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
        },
        data: dataSet,
        columns: [
          { title: "Empresa" },
          { title: "Titulo" },
          { title: "Fecha" },
          { title: "Opciones" }
        ],
        retrieve: true
    } );
} );

$(document).ready(function() {
  $('#exportDataTable').DataTable( {
      data: dataSetExport,
      columns: [
        { title: "Fecha" },
        { title: "Empresa" },
        { title: "Contacto" },
        { title: "Telefono" },
        { title: "Correo" },
        { title: "Direccion" },
        { title: "Titulo" },
        { title: "Descripcion" },
      ],
      paging: false,
      searching: false,
      retrieve: true,
      "info": false
  } );
} );


};

function openModal(id){
  if(id==0){
    document.getElementById("txtTituloVacante").innerHTML="Nueva Vacante"
    clean();
  }else{
    document.getElementById("txtTituloVacante").innerHTML="Editar Vacante"
    firebase.firestore().collection("vacantes").doc(id).get()
    .then(res => {
      document.getElementById("txtIdVacante").value=id;
      document.getElementById("txtFechaVacante").value=res.data().fecha;
      document.getElementById("txtEmpresaVacante").value=res.data().empresa;
      document.getElementById("txtTituloVacante2").value=res.data().titulo;
      document.getElementById("txtDescripcionVacante").value=res.data().descripcion;
      document.getElementById("txtContactoVacante").value=res.data().contacto;
      document.getElementById("txtTelefonoVacante").value=res.data().telefono;
      document.getElementById("txtCorreoVacante").value=res.data().correo;
      document.getElementById("txtDireccionVacante").value=res.data().direccion;
    }).catch(err => {
      alert(err);
    });
  };
};
function closeDaView(){
  document.getElementById("btnDownload").style.display="none";
  document.getElementById("btnCloseView").style.display="none";
  document.getElementById("viewVacante").style.display="none";
}
function openModalView(id){
    backImg = Math.floor(Math.random() * (9 - 1)) + 1;
    document.getElementById('layerID').style.backgroundImage="url(https://chrystianlozano.github.io/SSPVacantes-Instituto-Irapuato/assets/img/0" + backImg + ".png)";
    clean();
    document.getElementById("btnDownload").style.display="inline-block";
    document.getElementById("btnCloseView").style.display="inline-block";
    document.getElementById("viewVacante").style.display="block";
    document.body.scrollTop = 0;
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

    function download(url){
      var a = $("<a style='display:none' id='js-downloder'>")
      .attr("href", url)
      .attr("download", "vacante.png")
      .appendTo("body");
    
      a[0].click();
    
      a.remove();
    }
    
    function saveCapture(element) {
      html2canvas(element).then(function(canvas) {
        download(canvas.toDataURL("image/png"));
      })
    }
    
    $('#btnDownload').click(function(){
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      var element = document.querySelector("#viewVacante");
      saveCapture(element)
    })
};
function Delete(id){
  if(confirm("🟡 ¿Deseas eliminar realmente? 🟡")==1){
    firebase.firestore().collection("vacantes").doc(id).update({
      bhabilitado:"0"
    }).then(res=>{
      alert("✅ Se elimino correctamente ✅ ");
      location.reload();
    }).catch(err=>{
      alert(err)
    });
  };
};
function clean(){
  document.getElementById("txtIdVacante").value="";
  document.getElementById("txtFechaVacante").value="";
  document.getElementById("txtEmpresaVacante").value="";
  document.getElementById("txtTituloVacante2").value="";
  document.getElementById("txtDescripcionVacante").value="";
  document.getElementById("txtContactoVacante").value="";
  document.getElementById("txtTelefonoVacante").value="";
  document.getElementById("txtCorreoVacante").value="";
  document.getElementById("txtDireccionVacante").value="";
};
function makeVacante(){
  var idVacante = document.getElementById("txtIdVacante").value;
  var fecha = document.getElementById("txtFechaVacante").value;
  var empresa = document.getElementById("txtEmpresaVacante").value;
  var titulo = document.getElementById("txtTituloVacante2").value;
  var descripcion = document.getElementById("txtDescripcionVacante").value;
  var contacto = document.getElementById("txtContactoVacante").value;
  var telefono = document.getElementById("txtTelefonoVacante").value;
  var correo = document.getElementById("txtCorreoVacante").value;
  var direccion = document.getElementById("txtDireccionVacante").value;

  if(idVacante==""){
    var datenow = new Date()
    firebase.firestore().collection("vacantes").add({
      fecha:datenow.toDateString().substr(-11),
      empresa:empresa,
      titulo:titulo,
      descripcion:descripcion,
      contacto:contacto,
      telefono:telefono,
      correo:correo,
      direccion:direccion,
      bhabilitado:"1",
      vistas:"0"
    }).then(res=>{
      alert("✅ Se ha publicado correctamente ✅ ");
      location.reload();
    }).catch(err=>{
      alert(err)
    })
  }else{
    firebase.firestore().collection("vacantes").doc(idVacante).update({
      empresa:empresa,
      titulo:titulo,
      descripcion:descripcion,
      contacto:contacto,
      telefono:telefono,
      correo:correo,
      direccion:direccion,
    }).then(res=>{
      alert("✅ Se ha actualizado correctamente ✅ ");
      location.reload();
    }).catch(err=>{
      alert(err)
    })
  }
}