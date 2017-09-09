/**
 * Created by Héctor on 12/07/2017.
 */
import {name as ElegirDepartamento} from "../../selects/elegirDepartamento/elegirDepartamento";
import {name as ElegirAnio} from "../../selects/elegirFechaNacimiento/elegirAnio/elegirAnio";
import {name as ElegitMes} from "../../selects/elegirFechaNacimiento/elegirMes/elegirMes";
import {name as ElegitDia} from "../../selects/elegirFechaNacimiento/elegirDia/elegirDia";

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
        ElegirAnio,
        ElegitMes,
        ElegitDia,
        ElegirDepartamento
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: FormaDatosPersonales,
        bindings: {
            datos: '='
        }
    });

