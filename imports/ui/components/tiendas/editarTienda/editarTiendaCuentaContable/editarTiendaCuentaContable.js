/**
 * Created by Héctor on 30/06/2017.
 */
import template from "./editarTiendaCuentaContable.html";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as CuentaContable} from "../../../comun/inputs/cuentaContable/cuentaContable";
import {cambiosTiendaCuentaContable} from "../../../../../api/catalogos/tiendas/methods";
import {Tiendas} from "../../../../../api/catalogos/tiendas/collection";

class EditarTiendaCuentaContable {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        this.$state = $state;
        $reactive(this).attach($scope);

        this.propietarioId = $stateParams.tiendaId;

        this.tipoMsj = '';

        this.tienda = {};

        this.subscribe('tiendas.todas', () => [{_id: this.propietarioId}]);

        this.helpers({
            tienda(){
                return Tiendas.findOne({_id: this.propietarioId});
            }
        });
    }

    editar() {
        this.ocultarBoton = true;
    }

    limpiarCampos(editarTiendaCuentaContableForm) {
        this.datos = {};
        editarTiendaCuentaContableForm.$setPristine();
    }

    actualizarDatosGenerales(editarTiendaCuentaContableForm) {
        this.datos._id = this.propietarioId;

        cambiosTiendaCuentaContable.call(this.datos, this.$bindToContext((err, result) => {
            if (err) {
                this.msj = err + 'Error, llamar a soporte técnico: 55-6102-4884 | 55-2628-5121';
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'Los datos de contacto se guardaron con éxito.';
                this.tipoMsj = 'success';
                this.limpiarCampos(editarTiendaCuentaContableForm);
            }
        }));
    }

}

const name = 'editarTiendaCuentaContable';

export default angular
    .module(name, [
        Alertas,
        CuentaContable
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: EditarTiendaCuentaContable
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.editar.cuentaContable', {
            url: '/cuentaContable',
            template: '<editar-tienda-cuenta-contable></editar-tienda-cuenta-contable>'
        });
}
