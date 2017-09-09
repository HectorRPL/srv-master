/**
 * Created by Héctor on 02/08/2017.
 */
import {buscarPromociones} from "../../../../../api/promociones/busquedas"
import template from "./buscarPromocion.html";

class BuscarPromocion {

    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
    }

    buscarPromocion(valor) {
        return buscarPromociones.callPromise({promocion: valor}).then(function (result) {
            return result;
        });
    }

}

const name = 'buscarPromocion';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: BuscarPromocion,
        bindings: {
            promocion: '='
        },
    });


