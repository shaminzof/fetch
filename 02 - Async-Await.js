/ **
 * Async / Await es la nueva forma de Javascript
 * de ejecutar promesas de forma estructurada.
 * Esto significa que en lugar de ejecutar .then y .catch
 * por cada promesa, con callbacks, y esperar que se resuelvan 
 * mas adelante, puedo llamar a la función y esperar en esa misma
 * línea hasta que haya una devolución.
 * * 
 * /

 // promesas / ejecutado el codigo y sigue
const  promiseFetch  = () => {
    buscar ( " https://google.com " )
        . entonces ( res  =>  consola . log (res))
        . catch ( err  =>  console . log (err));
    consola . log ( " promesa de búsqueda de Termino " );
}

const  asyncAwaitFetch  =  async (parametro1, parametro2) => {        // se puede poner parametros
    prueba {
        const  data  =  await  axios.get ( " https://google.com " ); //obtengo una promesa
        consola . log (datos); //respuesta del servidor
    } catch (err) {
        consola . log (err);
    }
    consola . log ( " Termino buscar asíncrono / esperar " )
}

/ **
 * Como podemos observar, en el primer caso, ejecutar el fetch, y lo primero que muestra
 * la consola es "Termino fetch promise", porque ya lo ejecute, lo que ejecutara
 * el callback lo realizara mas adelante cuando se resuelva esa promesa.
 * * 
 * Por otro lado, en el otro caso, se imprime primero la respuesta del fetch, 
* y luego se imprime Termino buscar asíncrono / esperar. Esto es porque al decirle
 * "await fetch ()" le estamos diciendo "Espera a que vuelva esta información
 * para seguir ejecutando el programa ".
 * * 
 * También podemos observar que en lugar de .catch estamos usando try / catch
* para agarrar esos errores que pueden ser quirúrgicos de este codigo. Como se puede
 * ver hasta incluso es codigo mas legible y practico a la hora de entenderlo.  
 * /
 * 
 * 
 * se puede usar promesas cuando tengo una pagina.
 * pero en una app de node no hace Falta.