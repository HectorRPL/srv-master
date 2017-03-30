/**
 * Created by jvltmtz on 30/03/17.
 */
import "./tabInventarios.html";

class TabInventarios {
    constructor($scope, $reactive, $state, $uibModal) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Tiendas';
        this.$uibModal = $uibModal;

    }

}

const name = 'tabInventarios';

// create a module
export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/tiendas/administrarTienda/${name}/${name}.html`,
        controllerAs: name,
        controller: TabInventarios,
        bindings: {
            tiendaid: '<'
        }
    });