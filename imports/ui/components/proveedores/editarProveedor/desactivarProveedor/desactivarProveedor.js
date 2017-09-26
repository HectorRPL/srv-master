/**
 * Created by Héctor on 11/07/2017.
 */
import {Proveedores} from "../../../../../api/catalogos/proveedores/collection";
import {actlizrProvdrActvr} from "../../../../../api/catalogos/proveedores/methods";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as RadioDesactivar} from "../../../comun/radio/radioDesactivar/radioDesactivar";
import template from "./desactivarProveedor.html";

class DesactivarProveedor {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this.propietarioId = $stateParams.proveedorId;

        this.datos = {};
        this.tipoMsj = '';

        this.subscribe('proveedores.todos', () => [{_id: this.propietarioId}]);
        this.helpers({
            proveedor(){
                return Proveedores.findOne({_id: this.propietarioId});
            }
        });
    }
    desactivarProveedor() {

        this.datos = {
            _id: this.propietarioId,
            activo: this.proveedor.activo
        };

        console.log('[28] Esto vamos a enviar' , this.datos);

        actlizrProvdrActvr.callPromise(this.datos).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
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
        template: template.default,
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
