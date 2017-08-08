/**
 * Created by Héctor on 30/06/2017.
 */
import template from "./editarTiendaCuentaContable.html";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as CuentaContableTiendas} from "../../../comun/inputs/cuentaContableTiendas/cuentaContableTiendas";
import {cambiosCuentaContableTiendas} from "../../../../../api/catalogos/tiendas/methods";
import {Tiendas} from "../../../../../api/catalogos/tiendas/collection";

class EditarTiendaCuentaContable {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this.tiendaId = $stateParams.tiendaId;

        this.tipoMsj = '';

        this.subscribe('tiendas.todas', () => [{_id: this.tiendaId}]);
        this.helpers({
            tienda(){
                return Tiendas.findOne({_id: this.tiendaId});
            }
        });
    }

    actualizarCuentaContable() {
        this.datos = {
            _id: this.tiendaId,
            cuentaContable: this.tienda.cuentaContable
        };
        cambiosCuentaContableTiendas.callPromise(this.datos).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err)=>{
            this.tipoMsj = 'danger';
        }));
    }



}

const name = 'editarTiendaCuentaContable';

export default angular
    .module(name, [
        Alertas,
        CuentaContableTiendas
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
