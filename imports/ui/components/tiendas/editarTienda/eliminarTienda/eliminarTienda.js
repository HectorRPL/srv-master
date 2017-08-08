/**
 * Created by Héctor on 10/07/2017.
 */
import template from "./eliminarTienda.html";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as RadioDesactivar} from "../../../comun/radio/radioDesactivar/radioDesactivar";
import {cambiosTiendaActivar} from "../../../../../api/catalogos/tiendas/methods";
import {Tiendas} from "../../../../../api/catalogos/tiendas/collection";

class EliminarTienda {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this.tiendaId = $stateParams.tiendaId;

        this.tipoMsj = '';
        this.tienda = {};
        this.datos = {};

        this.subscribe('tiendas.todas', () => [{_id: this.tiendaId}]);

        this.helpers({
            tienda(){
                return Tiendas.findOne({_id: this.tiendaId});
            }
        });
    }



    eliminar() {
        this.datos._id = this.tiendaId;
        this.datos.activo = this.dato.activo;

        console.log('Esto se va a enviar', this.datos);
        cambiosTiendaActivar.callPromise(this.datos).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err)=>{
            console.log(err);
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
        .state('app.tienda.editar.eliminar', {
            url: '/eliminar',
            template: '<eliminar-tienda></eliminar-tienda>'
        });
}
