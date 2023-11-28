//Defino el modal de modificacion de usuarios
let modal = new bootstrap.Modal(document.getElementById("dataModal"));
document.addEventListener('DOMContentLoaded', function () {
  //Mostrar el usuario con id=x
  document.querySelector('#btnGet1').addEventListener('click', getDatos);
  //Agregar nuevo usuario
  document.querySelector('#btnPost').addEventListener('click', postDato);
  //Eliminar Usuario
  document.getElementById('btnDelete').addEventListener('click', deleteUser);
  //Abre el modal para modificar usuarios
  document.querySelector('#btnPut').addEventListener('click', editUser);
  //Envio modificaciones
  document.getElementById('btnSendChanges').addEventListener('click', putID);
  //Habilito botones PUT, SAVE y DELETE si tienen contenido
  let modHab = document.getElementById('inputPutId');
  let delHab = document.getElementById('inputDelete');
  let putName = document.getElementById("inputPutNombre");
  let putLName = document.getElementById("inputPutApellido");
  modHab.addEventListener('input', habilitarBtn);
  delHab.addEventListener('input', habilitarBtn);
  putName.addEventListener('input', habilitarBtn);
  putLName.addEventListener('input', habilitarBtn);
});

//Función GET by ID
function getDatos() {
  let id = document.querySelector('#inputGet1Id').value;
  if (id) {
    getID(id);
  } else {
    getAll();
  }
  document.querySelector('#inputGet1Id').value = '';
}
//Mostrar datos de usuario si ID=x
function mostrarDatos(data) {
  let container = document.querySelector('#results');
  container.innerHTML = '';
  container.innerHTML = `<div><span>&nbsp;&nbsp; id: ${data.id}</span> <br> <span>&nbsp;&nbsp; name: ${data.name}</span> <br> <span>&nbsp;&nbsp; lastname: ${data.lastname}</span></div> <hr>`;
}
//Mostrar datos de usuarios si ID=null
function showAll(data) {
  let container = document.getElementById('results');
  container.innerHTML = '';
  for (let one of data) {
    container.innerHTML += `
    <div>
      <p>id: ${one.id}</p>
      <p>name: ${one.name}</p>
      <p>lastname: ${one.lastname}</p>
    </div>
    `;
  }
}
//Funcion POST
function postDato() {
  let nombre = document.querySelector('#inputPostNombre').value;
  let apellido = document.querySelector('#inputPostApellido').value;
  let datos = {
    name: nombre,
    lastname: apellido,
  };
  fetch(`https://65427c36ad8044116ed3720a.mockapi.io/users/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  })
    .then(response => response.json())
    .then(data => {
      getAll(data);
    })
    .catch(error => {
      alert(error);
    });
  document.querySelector('#inputPostNombre').value = '';
  document.querySelector('#inputPostApellido').value = '';
}
//Funcion DELETE
function deleteUser() {
  let entrada = document.getElementById('inputDelete');
  let URL = `https://65427c36ad8044116ed3720a.mockapi.io/users/${entrada.value}`;
  fetch(URL, { method: 'DELETE' })
    .then(response => response.json())
    .then(data => {
      entrada.innerHTML = null;
      getAll();
    })
    .catch(error => {
      console.error('Error al enviar los datos', error);
    });
  document.querySelector('#inputDelete').value = '';
}
//Función PUT
function editUser() {
  let id = document.querySelector('#inputPutId').value;
  let nameInput = document.getElementById("inputPutNombre");
  let lastNameInput = document.getElementById("inputPutApellido");
  //Obtengo la informacion actual del usuario a modificar
  fetch(`https://65427c36ad8044116ed3720a.mockapi.io/users/${id}`)
  .then(res => res.json())
  .then(data => {
    //Muestro el modal para editar los datos
    modal.show();
    nameInput.value = data.name;
    lastNameInput.value = data.lastname;
  })
  .catch(err => {
    console.error('There was an error', err);
  });
}

//Get Todos
function getAll() {
  fetch(`https://65427c36ad8044116ed3720a.mockapi.io/users`)
    .then(response => response.json())
    .then(data => showAll(data))
    .catch(err => {
      console.error('There was an error', err);
    });
}
//Get ID
function getID(id){
  fetch(`https://65427c36ad8044116ed3720a.mockapi.io/users/${id}`)
  .then(res => res.json())
  .then(data => mostrarDatos(data))
  .catch(err => {
    console.error('There was an error', err);
  });
}
//PUT ID
function putID(){
  let id = document.querySelector('#inputPutId').value;
  let nameInput = document.getElementById("inputPutNombre");
  let lastNameInput = document.getElementById("inputPutApellido");
  let datos = {
    name: nameInput.value,
    lastname: lastNameInput.value
  }
  let URL = `https://65427c36ad8044116ed3720a.mockapi.io/users/${id}`;
  fetch(URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(datos),
  })
    .then(response => response.json())
    .then(data => {
      mostrarDatos(data);
      modal.hide();
    })
    .catch(error => {
      console.error('Error al enviar los datos', error);
    });
}
//Hbilitar botones PUT y DELETE
function habilitarBtn(){
  let btnDelete = document.getElementById('btnDelete');
  let btnPut = document.getElementById('btnPut');
  let btnSave = document.getElementById('btnSendChanges');
  let a = document.getElementById('inputPutId');
  let b = document.getElementById('inputDelete');
  let c = document.getElementById("inputPutNombre");
  let d = document.getElementById("inputPutApellido");
  //Compruebo que los campos PUT y DELETE tengan contenido
  if(a.value){
    btnPut.disabled = false;
    btnDelete.disabled = true;
  }
  if(b.value){
    btnPut.disabled = true;
    btnDelete.disabled = false;
  }
  if (c.value && d.value) {
    btnSave.disabled = false;
  }else{
    btnSave.disabled = true;
  }
}