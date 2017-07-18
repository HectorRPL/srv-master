/**
 * Created by Héctor on 30/06/2017.
 */
import template from "./editarTiendaCuentaContable.html";
import {name as Alertas} from "../../../../comun/alertas/alertas";
import {name as CuentaContable} from "../../../../comun/inputs/cuentaContable/cuentaContable";
import {cambiosTiendaCuentaContable} from "../../../../../../api/catalogos/tiendas/methods";
import {Tiendas} from "../../../../../../api/catalogos/tiendas/collection";

class EditarTiendaCuentaContable {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        this.$state = $state;
        $reactive(this).attach($scope);

        this.tiendaId = $stateParams.tiendaId;

        this.tipoMsj = '';

        this.tienda = {};

        this.subscribe('tiendas.todas', () => [{_id: this.tiendaId}]);

        this.helpers({
            tienda(){
                return Tiendas.findOne({_id: this.tiendaId});
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
        this.datos._id = this.tiendaId;

        cambiosTiendaCuentaContable.callPromise(this.datos).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
            this.limpiarCampos(editarTiendaCuentaContableForm);
        })).catch(this.$bindToContext((err)=>{
            this.tipoMsj = 'danger';
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
        .state('app.tienda.admon.editar.cuentaContable', {
            url: '/cuentaContable',
            template: '<editar-tienda-cuenta-contable></editar-tienda-cuenta-contable>'
        });
}
