/**
 * Created by Héctor on 02/08/2017.
 */
import {Comisiones} from "../../../../../../../api/comisiones/collection";
import template from "./inventarioProductoComision.html";

class InventarioProductoComision {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.subscribe('comisiones.todos', () =>[{_id: this.getReactively('comisionId')}]);

        this.helpers({
            comision() {
                return Comisiones.findOne({_id: this.getReactively('comisionId')});
            }
        });
    }
}

const name = 'inventarioProductoComision';

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: InventarioProductoComision,
        bindings: {
            comisionId: '<',
            costo: '<'
        },
    });