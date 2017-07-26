/**
 * Created by Héctor on 30/06/2017.
 */
import template from "./formaDatosGenerales.html";

class FormaDatosGenerales {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.datos =  {
            telefonos: [{telefono: ''}]
        };

    }

    agregarTelefono() {
        if (!this.datos.telefonos) {
            this.datos.telefonos = [{telefono: ''}];
        } else {
            this.telefono = {
                telefono: '',
                extension: ''
            };
            this.datos.telefonos.push(this.telefono);
        }
    }
}

const name = 'formaDatosGenerales';

export default angular
    .module(name, [])
    .component(name, {
        template ,
        controllerAs: name,
        controller: FormaDatosGenerales,
        bindings: {
            datos: '='
        }
    });
