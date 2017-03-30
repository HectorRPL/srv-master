/**
 * Created by jvltmtz on 30/03/17.
 */
import "./tabComisiones.html";

class TabComisiones {
    constructor($scope, $reactive, $state, $uibModal) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Tiendas';
        this.$uibModal = $uibModal;

    }

}

const name = 'tabComisiones';

// create a module
export default angular
    .module(name, [

    ])
    .component(name, {
        templateUrl: `imports/ui/components/tiendas/administrarTienda/${name}/${name}.html`,
        controllerAs: name,
        controller: TabComisiones,
        bindings :{
            tiendaid: '<'
        }
    });