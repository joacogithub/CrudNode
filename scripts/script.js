document.addEventListener('DOMContentLoaded', function () {
  //Mostrar el usuario con id=x
  document.querySelector('#btnGet1').addEventListener('click', obtenerDatos);
  //Agregar nuevo usuario
  document.querySelector('#btnPost').addEventListener('click', ingresarDato);
  //Eliminar Usuario
  document.getElementById('btnDelete').addEventListener('click', deleteUser);
});
//Función GET by ID
function obtenerDatos() {
  let id = document.getElementById('inputGet1Id').value;
  //console.log(id);
  if (id != null) {
    fetch(`https://65427c36ad8044116ed3720a.mockapi.io/users/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        mostrarDatos(data);
      })
      .catch(err => {
        console.error('There was an error', err);
      });
  } else {
    fetch(`https://65427c36ad8044116ed3720a.mockapi.io/users`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        //mostrarDatos(data);
      })
      .catch(err => {
        console.error('There was an error', err);
      });
  }
}
//Mostrar datos de usuario si ID=x
function mostrarDatos(data) {
  let container = document.querySelector('#results');

  container.innerHTML = `<div><p>ID: ${data.id}</p> <p>NAME: ${data.name}</p> <p>LAST NAME: ${data.lastname}</p></div>`;
}
//Mostrar datos de usuarios si ID=null
function showAll(data) {
  let container = document.getElementById('results');
  for (let one of data) {
    container.innerHTML += `
    <div>
      <p>ID: ${one.id}</p>
      <p>NAME: ${one.name}</p>
      <p>LAST NAME: ${one.lastname}</p>
    </div>
    `;
  }
}
//Funcion POST
function ingresarDato() {
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
  });
}
//Funcion DELETE
function deleteUser() {
  let entrada = document.getElementById('inputDelete').value;
  let URL = `https://65427c36ad8044116ed3720a.mockapi.io/users/${entrada}`;

  fetch(URL, { method: 'DELETE' })
    .then(response => {
      console.log('Se han cargado los datos', response);
    })
    .catch(error => {
      console.error('Error al enviar los datos', error);
    });
}
//Función PUT
function editUser() {}
