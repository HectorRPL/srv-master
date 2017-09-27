/**
 * Created by Héctor on 10/07/2017.
 */
import {Tiendas} from "../../../../../api/catalogos/tiendas/collection";
import {actualizarTindaActv} from "../../../../../api/catalogos/tiendas/methods";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as RadioDesactivar} from "../../../comun/radio/radioDesactivar/radioDesactivar";
import template from "./eliminarTienda.html";

class EliminarTienda {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this.tiendaId = $stateParams.tiendaId;

        this.tipoMsj = '';
        this.datos = {};

        this.subscribe('tiendas.todas', () => [{_id: this.tiendaId}]);

        this.helpers({
            tienda(){
                return Tiendas.findOne({_id: this.tiendaId});
            }
        });
    }



    eliminar() {

        this.datos = {
            _id: this.propietarioId,
            activo: this.tienda.activo
        };

        actualizarTindaActv.callPromise(this.datos).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
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
        template: template.default,
        controllerAs: name,
        controller: EliminarTienda
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.editar.eliminar', {
            url: '/eliminar',
            template: '<eliminar-tienda></eliminar-tienda>'
        });
}
