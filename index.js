//hacer una funcion para crear, modificar y eliminar
//dos get para la lista entera y oto para una en particular
//un put
//un get

const baseUrl = "https://jsonplaceholder.typicode.com/todos";
let lista = [];
let todo = {
  title: "",
  userId: null,
  completed: false
};
const handleError = err => {
  alert(`Hubo un error. ${err}`);
};

/*const getTodos = () => {
  return axios
    .get(baseUrl) //me va a volver la promesa y yo le puedo encadenar un then
    .then(res => {
      lista = res.data;
    })
    .catch(handleError);
};*/
const getTodosDos = async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
    lista = res.data;
    armarHtml();
  } catch (err) {
    handleError(err);
  }
};
/*const getTodo = id => {
  axios
    .get(`${baseUrl}/${id}`)
    .then(res => {
      todo = res.data;
    })
    .catch(handleError);
};*/
const getTodoDos = async id => {
  try {
    const res = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/id"
    );
    todo = res.data;
    armarHtml();
  } catch (err) {
    handleError(err);
  }
};
const createTodos = async (title, userId) => {
  let data = {
    title,
    userId,
    completed: false
  };
  try {
    const res = await axios.post(baseUrl, data);
    lista.push(res.data);
  } catch (err) {
    handleError(err);
  }
};
/*const deleteTodo = id => {
  return axios
    .delete(`${baseUrl}/${id}`) //devuelve la promesa, y la promesa encadenale un then mas.
    .then(res => {
      const index = lista.findIndex(todo => {
        return todo.id == id;
      });
      lista.splice(index, 1);
      //armarHtml, lo puedo poner aca tambien sin el return porque despues se ejecuta lo primero se va a ejectar la funcion
    })
    .catch(handleError);
};*/
const deleteTodo = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}/${id}`); //devuelve la promesa, y la promesa encadenale un then mas.
    const index = lista.findIndex(todo => {
      return todo.id == id;
    });
    lista.splice(index, 1);
    //armarHtml, lo puedo poner aca tambien sin el return porque despues se ejecuta lo primero se va a ejectar la funcion
  } catch (err) {
    handleError(err);
  }
};
/*const modifyTodo = (id, title, userId, completed) => {
  let data = {
    id,
    title,
    userId,
    completed
  };
  return axios
    .put(`${baseUrl}/${id}`, data)
    .then(res => {
      for (let i = 0; i < lista.length; i++) {
        if (lista[i].id == id) {
          lista[i] = res.data;
        }
      }
    })
    .catch(handleError);
};*/
const modifyTodo = async (id, title, userId, completed) => {
  let data = {
    id,
    title,
    userId,
    completed
  };
  try {
    const res = await axios.put(`${baseUrl}/${id}`, data)
      for (let i = 0; i < lista.length; i++) {
        if (lista[i].id == id) {
          lista[i] = res.data;
        }
      }
    }catch (err){
      handleError(err);
  }
};


const armarHtml = () => {
  const ul = document.querySelector("#todo-list"); // seleccionas el padre, el elemento de la lista
  ul.innerHTML = "";
  lista.map(item => {
    //mientras loopea va creando ul, li, span

    let li = document.createElement("li"); // creamos li
    let titulo = document.createElement("span");
    let userId = document.createElement("span");
    let completado = document.createElement("span");

    titulo.innerHTML = item.title; //titulo va tener la info del item de la lista que se llama title
    li.appendChild(titulo);

    li.className = "todo-item";
    titulo.className = "todo-title";
    userId.className = "todo-user";
    completado.className = "todo-completed";
    userId.innerHTML = item.id;
    li.appendChild(userId);
    completado.innerHTML = item.completed ? "completado" : "incompleto"; // ? = es igual al if() : = es igual al else if()
    li.appendChild(completado);

    let borrar = document.createElement("button");
    borrar.innerHTML = "Eliminar";

    borrar.addEventListener("click", () => {
      deleteTodo(item.id).then(armarHtml); // elimino el item y ejecuto la funcion
    });

    li.appendChild(titulo);
    li.appendChild(userId);
    li.appendChild(completado);
    li.appendChild(borrar);
    ul.appendChild(li);

    document.querySelector("#todo-list").appendChild(li);
  });
};

/*getTodos().then(() => {
  armarHtml();
});*/
getTodosDos();


//el boton se agrega afuera porque ya existe en html y el de borrar no
let addButton = document.querySelector("#todo-create");
addButton.addEventListener("click", event => {
  let agregarTitle = document.querySelector("#todo-title-create").value; //queres obtemer los elementos

  let agregarUserid = document.querySelector("#todo-user-create").value;

  createTodo(agregarTitle, agregarUserid).then(armarHtml);
});

let modificarButton = document.querySelector("#todo-update");
modificarButton.addEventListener("click", event => {
  let modificarId = document.querySelector("#todo-id-update").value;

  let modificarText = document.querySelector("#todo-title-update").value;

  let modificarNumber = document.querySelector("#todo-user-update").value;

  let modificarCheckbox = document.querySelector("#todo-completed-update")
    .checked;

  modifyTodo(
    modificarId,
    modificarText,
    modificarNumber,
    modificarCheckbox
  ).then(armarHtml); //sino lo ponemos no se va actualizar el html
});

//el html es estatico y el javaScript es dinamico
//axios es una libreria que te resuelve una parte, me soluciona un probelma especifico
