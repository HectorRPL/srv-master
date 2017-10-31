/**
 * Created by Héctor on 11/03/2017.
 */
import {TiposProductos} from "../../../../../api/catalogos/tiposProductos/collection";
import template from "./elegirTipoProducto.html";

class ElegirTipoProducto {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('tiposProductos.todo');

        // tipoproducto = 'que onda we';

        this.helpers({
            estosTiposProductos() {
                return TiposProductos.find();
            }
        });

    }
}

const name = 'elegirTipoProducto';

// create a module
export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        bindings: {
            tipoProducto: '=',
        },
        controller: ElegirTipoProducto
    });
