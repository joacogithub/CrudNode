document.addEventListener('DOMContentLoaded', function () {
  //Mostrar el usuario con id=x
  document.querySelector('#btnGet1').addEventListener('click', getDatos);
  //Agregar nuevo usuario
  document.querySelector('#btnPost').addEventListener('click', postDato);
  //Eliminar Usuario
  document.getElementById('btnDelete').addEventListener('click', deleteUser);
});

//Función GET by ID
function getDatos() {
  let id = document.getElementById('inputGet1Id').value;
  if (id !== "") {
    fetch(`https://65427c36ad8044116ed3720a.mockapi.io/users/${id}`)
      .then(res => res.json())
      .then(data => {
        mostrarDatos(data);
      })
      .catch(err => {
        console.error('There was an error', err);
      });
  } else {
    getAll();
  }
}
//Mostrar datos de usuario si ID=x
function mostrarDatos(data) {
  let container = document.querySelector('#results');
  container.innerHTML = "";
  container.innerHTML = `<div><p>id: ${data.id}</p><p>name: ${data.name}</p><p>lastname: ${data.lastname}</p></div>`;
}
//Mostrar datos de usuarios si ID=null
function showAll(data) {
  let container = document.getElementById('results');
  container.innerHTML = "";
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
  .then(response=> response.json())
  .then(data=>{
    getAll(data);
  })
  .catch(error=> {
    alert(error);
  })
}
//Funcion DELETE
function deleteUser() {
  let entrada = document.getElementById('inputDelete');
  let URL = `https://65427c36ad8044116ed3720a.mockapi.io/users/${entrada.value}`;
  fetch(URL, { method: 'DELETE' })
    .then(response => response.json())
    .then(data=> {
      entrada.innerHTML = null;
      getAll();
    })
    .catch(error => {
      console.error('Error al enviar los datos', error);
    });
}
//Función PUT
function editUser() {};
//Get Todos
function getAll(){
  fetch(`https://65427c36ad8044116ed3720a.mockapi.io/users`)
  .then(response => response.json())
  .then(data => {
    showAll(data);
  })
  .catch(err => {
    console.error('There was an error', err);
  });
}