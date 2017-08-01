/**
 * Created by Héctor on 31/07/2017.
 */
import {Factores} from "../../../../../../../api/factores/collection";
import template from "./inventarioProductoFactor.html";

class InventarioProductoFactor {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.subscribe('factores.todos', () =>[{_id: this.getReactively('factorId')}]);

        this.helpers({
            factor() {
                console.log('17', this.factor);
                return Factores.findOne({_id: this.getReactively('factorId')});
            }
        });
    }
}

const name = 'inventarioProductoFactor';

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: InventarioProductoFactor,
        bindings: {
            factorId: '<',
            costo: '<'
        },
    });