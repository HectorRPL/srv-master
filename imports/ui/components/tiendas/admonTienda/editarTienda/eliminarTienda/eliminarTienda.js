/**
 * Created by Héctor on 10/07/2017.
 */
import template from "./eliminarTienda.html";
import {name as Alertas} from "../../../../comun/alertas/alertas";
import {name as RadioDesactivar} from "../../../../comun/radio/radioDesactivar/radioDesactivar";
import {cambiosTiendaActivar} from "../../../../../../api/catalogos/tiendas/methods";
import {Tiendas} from "../../../../../../api/catalogos/tiendas/collection";

class EliminarTienda {
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

    limpiarCampos(eliminarTiendaForm) {
        this.datos = {};
        eliminarTiendaForm.$setPristine();
    }

    eliminar(eliminarTiendaForm) {
        this.datos._id = this.tiendaId;

        cambiosTiendaActivar.callPromise(this.datos).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
            this.limpiarCampos(eliminarTiendaForm);
        })).catch(this.$bindToContext((err)=>{
            this.tipoMsj = 'danger';
        }));
    }

}

const name = 'eliminarTienda';

export default angular
    .module(name, [
        Alertas,
        RadioDesactivar
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: EliminarTienda
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.editar.eliminar', {
            url: '/eliminar',
            template: '<eliminar-tienda></eliminar-tienda>'
        });
}
