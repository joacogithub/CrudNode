document.addEventListener('DOMContentLoaded', function () {
  //Mostrar el usuario con id=x
  document.querySelector('#btnGet1').addEventListener('click', getDatos);
  //Agregar nuevo usuario
  document.querySelector('#btnPost').addEventListener('click', postDato);
  //Eliminar Usuario
  document.getElementById('btnDelete').addEventListener('click', deleteUser);
  //
  document.querySelector('#btnPut').addEventListener('click', mostrarFormulario);
  //
  document.querySelector('#btnModificarUsuario').addEventListener('click', editUser);
});

//Función GET by ID
function getDatos() {
  let id = document.querySelector('#inputGet1Id').value;
  if (id !== '') {
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
  let formulario = document.querySelector('#miFormulario');
  let boton = document.querySelector('#btnPut');
  let nombre = document.querySelector('#txtNombre').value;
  let apellido = document.querySelector('#txtApellido').value;
  let id = document.querySelector('#inputPutId').value;
  let datos = {
    name: nombre,
    lastname: apellido,
  };

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
    })
    .catch(error => {
      console.error('Error al enviar los datos', error);
    });

  document.querySelector('#txtNombre').value = '';
  document.querySelector('#txtApellido').value = '';
  document.querySelector('#inputPutId').value = '';
  boton.style.display = 'block';
  formulario.style.display = 'none';
}

//Get Todos
function getAll() {
  fetch(`https://65427c36ad8044116ed3720a.mockapi.io/users`)
    .then(response => response.json())
    .then(data => {
      showAll(data);
    })
    .catch(err => {
      console.error('There was an error', err);
    });
}

function mostrarFormulario() {
  let formulario = document.querySelector('#miFormulario');
  let boton = document.querySelector('#btnPut');
  formulario.style.display = 'block';
  boton.style.display = 'none';
}
