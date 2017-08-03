/**
 * Created by Héctor on 02/08/2017.
 */
import {Promociones} from "../../../../../../../api/promociones/collection";
import template from "./inventarioProductoPromocion.html";

class InventarioProductoPromocion {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        // /*

        this.subscribe('promociones.todos', () => [{_id: this.getReactively('promocionId')}]);
        this.helpers({
            promocion() {
                return Promociones.findOne({_id: this.getReactively('promocionId')});
            }
        });

         // */
    }
}

const name = 'inventarioProductoPromocion';

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: InventarioProductoPromocion,
        bindings: {
            promocionId: '<',
            costo: '<'
        },
    });