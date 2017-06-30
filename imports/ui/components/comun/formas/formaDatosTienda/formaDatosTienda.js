/**
 * Created by Héctor on 30/06/2017.
 */
import template from "./formaDatosTienda.html";

class FormaDatosTienda {
    constructor($scope) {
        'ngInject';

        this.datos =  {
            telefonos: [{telefono: ''}]
        };

    }

    agregarTelefono() {
        this.nuevoTelefono = {
            telefono: this.telefono,
            extension: this.extension,
        };
        this.datos.telefonos.push(this.nuevoTelefono);
    }

}

const name = 'formaDatosTienda';

export default angular
    .module(name, [])
    .component(name, {
        template ,
        controllerAs: name,
        controller: FormaDatosTienda,
        bindings: {
            datos: '='
        }
    });
