/**
 * Created by Héctor on 29/06/2017.
 */
import template from "./editarProveedorCuentaContable.html";
import {name as Alertas} from "../../../../comun/alertas/alertas";
import {name as CuentaContable} from "../../../../comun/inputs/cuentaContable/cuentaContable";
import {cambiosCuentaContable} from "../../../../../../api/catalogos/proveedores/methods";
import {Proveedores} from "../../../../../../api/catalogos/proveedores/collection";

class EditarProveedorCuentaContable {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        this.$state = $state;
        $reactive(this).attach($scope);

        this.propietarioId = $stateParams.proveedorId;

        this.tipoMsj = '';

        this.proveedor = {};

        this.subscribe('proveedores.todos', () => [{_id: $stateParams.proveedorId}]);

        this.helpers({
            proveedor(){
                return Proveedores.findOne();
            }
        });
    }

    editar() {
        this.ocultarBoton = true;
    }

    limpiarCampos(editarProveedorCuentaContableForm) {
        this.datos = {};
        editarProveedorCuentaContableForm.$setPristine();
    }

    actualizarDatosGenerales(editarProveedorCuentaContableForm) {
        this.datos._id = this.propietarioId;

        cambiosCuentaContable.callPromise(this.datos).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
            this.limpiarCampos(editarProveedorCuentaContableForm);
        })).catch(this.$bindToContext((err)=>{
            this.tipoMsj = 'danger';
        }));
    }
}

const name = 'editarProveedorCuentaContable';

export default angular
    .module(name, [
        Alertas,
        CuentaContable
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: EditarProveedorCuentaContable
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.proveedores.admon.editar.cuentaContable', {
            url: '/cuentaContable',
            template: '<editar-proveedor-cuenta-contable></editar-proveedor-cuenta-contable>'
        });
}
