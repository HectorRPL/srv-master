/**
 * Created by Héctor on 13/06/2017.
 */
import {obtenerMarcas} from "../../../../api/catalogos/marcas/methods"
import {obtenerProducto} from "../../../../api/catalogos/productos/methods"
import "./buscarMarcaProducto.html";

class BuscarMarcaProducto {

    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

    }

    buscarMarca(valor) {
        return obtenerMarcas.callPromise({
            marca: valor
        }).then(function (result) {
            return result;
        });
    }

    buscarProducto(valor) {
        return obtenerProducto.callPromise({
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
        templateUrl: `imports/ui/components/comun/${name}/${name}.html`,
        controllerAs: name,
        controller: BuscarMarcaProducto,
        bindings: {
            marca: '=',
            prod: '='
        },
    });
