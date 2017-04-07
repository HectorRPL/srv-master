/**
 * Created by Héctor on 06/04/2017.
 */
import "./formaDatosFiscales.html";

class FormaDatosFiscales {
    constructor($scope) {
        'ngInject';
        this.pasoDos = false;
        this.habilitarCampos = true;

    }

    esPersonaMoral() {
        this.pasoDos = true;
        this.habilitarCampos = false;
    }
    esPersonaFisica() {
        this.pasoDos = true;
        this.habilitarCampos = true;
    }

}

const name = 'formaDatosFiscales';

// create a module
export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/datosFiscales/${name}/${name}.html`,
        controllerAs: name,
        controller: FormaDatosFiscales,
        bindings: {
            datos: '='
        }
    });
