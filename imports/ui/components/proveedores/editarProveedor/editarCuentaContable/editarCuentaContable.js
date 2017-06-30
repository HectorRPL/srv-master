/**
 * Created by Héctor on 29/06/2017.
 */
import template from "./editarCuentaContable.html";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as CuentaContable} from "../../../comun/inputs/cuentaContable/cuentaContable";
import {cambiosCuentaContable} from "../../../../../api/catalogos/proveedores/methods";
import {Proveedores} from "../../../../../api/catalogos/proveedores/collection";

class EditarCuentaContable {
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

    actualizarDatosGenerales() {
        this.datos._id = this.propietarioId;

        cambiosCuentaContable.call(this.datos, this.$bindToContext((err, result) => {
            if (err) {
                this.msj = err + 'Error, llamar a soporte técnico: 55-6102-4884 | 55-2628-5121';
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'Los datos de contacto se guardaron con éxito.';
                this.tipoMsj = 'success';
            }
        }));
    }

}

const name = 'editarCuentaContable';

export default angular
    .module(name, [
        Alertas,
        CuentaContable
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: EditarCuentaContable
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.proveedores.editar.cuentaContable', {
            url: '/cuentaContable',
            template: '<editar-cuenta-contable></editar-cuenta-contable>'
        });
}
