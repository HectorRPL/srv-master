/**
 * Created by Héctor on 12/07/2017.
 */
import {name as ElegirDepartamento} from "../../selects/elegirDepartamento/elegirDepartamento";
import template from "./formaDatosPersonales.html";

class FormaDatosPersonales {
    constructor($scope) {
        'ngInject';

        this.datos = {};
    }
}

const name = 'formaDatosPersonales';

export default angular
    .module(name, [
        ElegirDepartamento
    ])
    .component(name, {
        template ,
        controllerAs: name,
        controller: FormaDatosPersonales,
        bindings: {
            datos: '='
        }
    });

