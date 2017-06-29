/**
 * Created by Héctor on 29/06/2017.
 */
import template from "./formaDatosProveedores.html";
import {name as CuentaContable} from "../../inputs/cuentaContable/cuentaContable";

class FormaDatosProveedores {
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

const name = 'formaDatosProveedores';

// create a module
export default angular
    .module(name, [
        CuentaContable
    ])
    .component(name, {
        template ,
        controllerAs: name,
        controller: FormaDatosProveedores,
        bindings: {
            datos: '='
        }
    });
