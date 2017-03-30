/**
 * Created by jvltmtz on 29/03/17.
 */
import "./tabFactores.html";
import {Marcas} from "../../../../../api/catalogos/marcas/collection"

class TabFactores {
    constructor($scope, $reactive, $state, $uibModal) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.tabTitulo = 'Factores';
        this.$uibModal = $uibModal;
        this.marca = '';
        this.nombre = '';
        this.subscribe('marcas.nombre', ()=> [{nombre: this.getReactively('nombre')}]);

        this.helpers({
            marcas(){
                return Marcas.find();
            }
        })
    }

    buscarMarca() {
        this.nombre = this.marca;
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