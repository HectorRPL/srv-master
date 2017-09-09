/**
 * Created by Héctor on 24/07/2017.
 */
import {buscarComisiones} from "../../../../../api/comisiones/busquedas"
import template from "./buscarComision.html";

class BuscarComision {

    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

    }

    buscarComision(valor) {
        return buscarComisiones.callPromise({comision: valor}).then(function (result) {
            return result;
        });
    }

}

const name = 'buscarComision';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: BuscarComision,
        bindings: {
            comision: '='
        },
    });


