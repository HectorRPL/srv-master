/**
 * Created by Héctor on 29/06/2017.
 */
import {Proveedores} from "../../../../../api/catalogos/proveedores/collection";
import {actualizarProvdrCuntCont} from "../../../../../api/catalogos/proveedores/methods";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as CuentaContableProveedores} from "../../../comun/inputs/cuentaContableProveedores/cuentaContableProveedores";
import template from "./editarProveedorCuentaContable.html";

class EditarProveedorCuentaContable {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this.propietarioId = $stateParams.proveedorId;

        this.tipoMsj = '';

        this.proveedor = {};
        this.datos = {};

        this.subscribe('proveedores.todos', () => [{_id: $stateParams.proveedorId}]);

        this.helpers({
            proveedor(){
                return Proveedores.findOne();
            }
        });
    }

    actualizarCuentaContable() {

        this.datos = {
            _id: this.propietarioId,
            cuentaContable: this.proveedor.cuentaContable
        };

        actualizarProvdrCuntCont.callPromise(this.datos).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err)=>{
            this.tipoMsj = 'danger';
        }));
    }


}

const name = 'editarProveedorCuentaContable';

export default angular
    .module(name, [
        Alertas,
        CuentaContableProveedores
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: EditarProveedorCuentaContable
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.proveedores.editar.cuentaContable', {
            url: '/cuentaContable',
            template: '<editar-proveedor-cuenta-contable></editar-proveedor-cuenta-contable>'
        });
}
