/**
 * Created by jvltmtz on 10/03/17.
 */
import template from "./detalleTienda.html";
import {Tiendas} from "../../../../api/catalogos/tiendas/collection";

class DetalleTienda {
    constructor($scope, $reactive) {
        'ngInject';

        $reactive(this).attach($scope);
        this.subscribe('tiendas.seleccionada', ()=> [{_id: this.tiendaId}]);

        this.helpers({
            tiendas(){
                return Tiendas.find();
            }
        });
    }

    modalAgregar() {
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'AgregarTienda',
            backdrop: 'static',
            size: 'md',
            keyboard: true,
        });
    }

}

const name = 'detalleTienda';

// create a module
export default angular
    .module(name, [
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: DetalleTienda,
        bindings:{
            tiendaid: '<'
        }
    });