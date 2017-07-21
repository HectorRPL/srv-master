/**
 * Created by Héctor on 11/07/2017.
 */
import template from "./desactivarProveedor.html";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as RadioDesactivar} from "../../../comun/radio/radioDesactivar/radioDesactivar";
import {cambiosProveedorActivar} from "../../../../../api/catalogos/proveedores/methods";
import {Proveedores} from "../../../../../api/catalogos/proveedores/collection";

class DesactivarProveedor {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        this.$state = $state;
        $reactive(this).attach($scope);

        this.propietarioId = $stateParams.proveedorId;

        this.tipoMsj = '';

        this.subscribe('proveedores.todos', () => [{_id: this.propietarioId}]);

        this.helpers({
            proveedor(){
                return Proveedores.findOne({_id: this.propietarioId});
            }
        });
    }

    editar() {
        this.ocultarBoton = true;
    }

    limpiarCampos(desactivarProveedorForm) {
        this.datos = {};
        desactivarProveedorForm.$setPristine();
    }

    desactivar(desactivarProveedorForm) {
        this.datos._id = this.propietarioId;

        cambiosProveedorActivar.callPromise(this.datos).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
            this.limpiarCampos(desactivarProveedorForm);
        })).catch(this.$bindToContext((err)=>{
            this.tipoMsj = 'danger';
        }));
    }

}

const name = 'desactivarProveedor';

export default angular
    .module(name, [
        Alertas,
        RadioDesactivar
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: DesactivarProveedor
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.proveedores.editar.desactivar', {
            url: '/desactivar',
            template: '<desactivar-proveedor></desactivar-proveedor>'
        });
}
