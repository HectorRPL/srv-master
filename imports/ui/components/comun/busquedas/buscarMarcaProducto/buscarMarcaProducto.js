/**
 * Created by Héctor on 13/06/2017.
 */
import {buscarMarcas} from "../../../../../api/catalogos/marcas/busquedas"
import {buscarProducto} from "../../../../../api/catalogos/productos/busquedas"
import "./buscarMarcaProducto.html";

class BuscarMarcaProducto {

    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

    }

    buscarMarca(valor) {
        return buscarMarcas.callPromise({
            marca: valor
        }).then(function (result) {
            return result;
        });
    }

    buscarProducto(valor) {
        return buscarProducto.callPromise({
            marcaId: this.marca._id,
            codigo: valor
        }).then(function (result) {
            return result;
        });
    }

}

const name = 'buscarMarcaProducto';

export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/comun/busquedas/${name}/${name}.html`,
        controllerAs: name,
        controller: BuscarMarcaProducto,
        bindings: {
            marca: '=',
            prod: '='
        },
    });
