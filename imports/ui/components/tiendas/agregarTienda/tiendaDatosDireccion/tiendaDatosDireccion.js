/**
 * Created by Héctor on 03/07/2017.
 */
import template from "./tiendaDatosDireccion.html";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as FormaDireccion} from "../../../comun/formas/formaDireccion/formaDireccion";
import {altaDireccion} from "../../../../../api/direcciones/methods";

class TiendaDatosDireccion {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        this.$state = $state;
        $reactive(this).attach($scope);

        this.propietarioId = $stateParams.tiendaId;

        this.tipoMsj = '';
        this.direccion = {};
    }

    guardarDireccion() {
        this.direccion.propietarioId = this.propietarioId
        let direccionFinal = angular.copy(this.direccion);
        delete direccionFinal.colonias;
        console.log('Esta es la dirección que vamos a enviar:', direccionFinal);

        altaDireccion.callPromise(direccionFinal).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';

            /* TODO: El usuario podría meter más de una dirección

            Si el usuario agrega la direción y lluego regresa con la flecha del navegador es posible
            que pueda introducir mas de una dirección o mas un datos fiscales.

            */
            this.$state.go('app.tienda.agregar.fiscales', {tiendaId:  this.propietarioId});
        })).catch(this.$bindToContext((err)=>{
            this.tipoMsj = 'danger';
        }));
    }

}

const name = 'tiendaDatosDireccion';

export default angular
    .module(name, [
        Alertas,
        FormaDireccion
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: TiendaDatosDireccion
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.agregar.direccion', {
            url: '/:tiendaId/direccion',
            template: '<tienda-datos-direccion></tienda-datos-direccion>'
        });
}
