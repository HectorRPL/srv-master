/**
 * Created by jvltmtz on 29/03/17.
 */
import "./tabFactores.html";
import {obtenerMarcas} from "../../../../../api/catalogos/marcas/methods"

class TabFactores {
    constructor($scope, $reactive, $state, $uibModal) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.tabTitulo = 'Factores';
        this.$uibModal = $uibModal;
        this.marcaSelec = '';
        this.marcas = [];
        this.nombre = '';
    }

    buscarMarca(valor) {
        return obtenerMarcas.callPromise({
            marca: valor
        }).then(function (result) {
            console.log(result);
            return result;
        });
    }

}

const name = 'tabFactores';

// create a module
export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/tiendas/administrarTienda/${name}/${name}.html`,
        controllerAs: name,
        controller: TabFactores,
        bindings: {
            tiendaid: '<'
        }
    });