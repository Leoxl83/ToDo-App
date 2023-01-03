const fecha = document.querySelector('#fecha');
const input = document.querySelector('#input');
const botonEnter = document.querySelector('#botonEnter');
const lista = document.querySelector('#lista');
const check = 'fa-check-circle';
const uncheck = 'fa-circle';
const tachado = 'line-through';
let id = '0'
let LIST

//fecha
const FECHA = new Date();
const opciones = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
fecha.innerHTML = FECHA.toLocaleString('es-UY', opciones);


//funcion agregar tareas
function agregarTarea(tarea, id, realizado, eliminado) {

    if (eliminado) {
        return
    }

    const REALIZADO = realizado ? check : uncheck
    const LINE = realizado ? tachado : ''


    const elemento = `
                        <li id="elemento">
                         <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                         <p class="text ${LINE}">${tarea}</p>
                         <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                         </li>
                    `

    const posicion = "beforeend";
    lista.insertAdjacentHTML(posicion, elemento);
}

//funcion tarea finalizada

function tareaRealizada(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(tachado)
    LIST[element.id].realizado = LIST[element.id].realizado ? false : true
}

//funcion tarea eliminada

function tareaEliminada(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
}

botonEnter.addEventListener('click', () => {
    const tarea = input.value
    if (tarea) {
        agregarTarea(tarea, id, false, false)
        LIST.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false,
        })
    }
    localStorage.setItem('TODO', JSON.stringify(LIST))
    input.value = ''
    id++
})

//Agregar tarea con tecla ENTER
document.addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        const tarea = input.value
        if (tarea) {
            agregarTarea(tarea, false, false)
            LIST.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false,
            })
        }
        localStorage.setItem('TODO', JSON.stringify(LIST))
        input.value = ''
        id++
    }
})

lista.addEventListener('click', function (event) {
    const element = event.target
    const elementData = element.attributes.data.value

    if (elementData === 'realizado') {
        tareaRealizada(element)
    }
    else if (elementData === 'eliminado') {
        tareaEliminada(element)
    }
    localStorage.setItem('TODO', JSON.stringify(LIST))

})


//localStorage 
let data = localStorage.getItem('TODO')
if (data) {
    LIST = JSON.parse(data)
    id = LIST.length
    cargarLista(LIST)
} else {
    LIST = []
    id = 0
}

function cargarLista(array) {
    array.forEach(function (item) {
        agregarTarea(item.nombre, item.id, item.realizado, item.eliminado)
    })
}