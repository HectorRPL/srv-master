/**
 * Created by jvltmtz on 10/08/17.
 */
import {name as FormaDireccion} from "../../../comun/formas/formaDireccion/formaDireccion";
import template from "./formaEditarDatosFiscales.html";

class FormaEditarDatosFiscales {
    constructor($scope, $reactive) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);
    }
}

const name = 'formaEditarDatosFiscales';

export default angular
    .module(name, [
        FormaDireccion
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: FormaEditarDatosFiscales,
        bindings: {
            datos: '='
        }
    });