/**
 * Created by Héctor on 10/07/2017.
 */
import template from "./desactivarTienda.html";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as DesactivarTiendaProveedor} from "../../../comun/radio/desactivarTiendaProveedor/desactivarTiendaProveedor";
import {cambiosTiendaActivar} from "../../../../../api/catalogos/tiendas/methods";
import {Tiendas} from "../../../../../api/catalogos/tiendas/collection";

class DesactivarTienda {
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

    limpiarCampos(desactivarTiendaForm) {
        this.datos = {};
        desactivarTiendaForm.$setPristine();
    }

    desactivar(desactivarTiendaForm) {
        this.datos._id = this.tiendaId;

        cambiosTiendaActivar.callPromise(this.datos).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
            this.limpiarCampos(desactivarTiendaForm);
        })).catch(this.$bindToContext((err)=>{
            this.tipoMsj = 'danger';
        }));
    }

}

const name = 'desactivarTienda';

export default angular
    .module(name, [
        Alertas,
        DesactivarTiendaProveedor
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: DesactivarTienda
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.editar.desactivar', {
            url: '/desactivar',
            template: '<desactivar-tienda></desactivar-tienda>'
        });
}
