/**
 * Created by jvltmtz on 29/03/17.
 */
import {obtenerMarcas} from "../../../../../api/catalogos/marcas/methods"
import {name as AgregarFactor} from "./agregarFactor/agregarFactor";
import {name as AplicarFactor} from "./aplicarFactor/aplicarFactor";
import "./tabFactores.html";

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

    crearFactor() {
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'AgregarFactor',
            backdrop: 'static',
            size: 'md',
            keyboard: true
        });
    }

    aplicarFactor() {
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'AplicarFactor',
            backdrop: 'static',
            size: 'lg',
            keyboard: true
        });
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
    .module(name, [
        AgregarFactor,
        AplicarFactor
    ])
    .component(name, {
        templateUrl: `imports/ui/components/tiendas/administrarTienda/${name}/${name}.html`,
        controllerAs: name,
        controller: TabFactores,
        bindings: {
            tiendaid: '<'
        }
    });