/**
 * Created by Héctor on 26/07/2017.
 */
import {crearDireccion} from "../../../../../api/direcciones/methods";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as FormaDireccion} from "../../../comun/formas/formaDireccion/formaDireccion";
import template from "./proveedorDatosDireccion.html";

class ProveedorDatosDireccion {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        this.$state = $state;
        $reactive(this).attach($scope);

        this.propietarioId = $stateParams.proveedorId;
        console.log('[17]', $stateParams.proveedorId);

        this.tipoMsj = '';
        this.direccion = {};
    }

    guardarDireccion() {
        this.direccion.propietarioId = this.propietarioId
        let direccionFinal = angular.copy(this.direccion);
        delete direccionFinal.colonias;
        console.log('Esta es la dirección que vamos a enviar:', direccionFinal);

        crearDireccion.callPromise(direccionFinal).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';

            /* TODO: El usuario podría meter más de una dirección

             Si el usuario agrega la direción y lluego regresa con la flecha del navegador es posible
             que pueda introducir mas de una dirección o mas un datos fiscales.

             */
            this.$state.go('app.proveedores.agregar.fiscales', {propietarioId:  this.propietarioId});
        })).catch(this.$bindToContext((err)=>{
            console.log('[39]', err);
            this.tipoMsj = 'danger';
        }));
    }

}

const name = 'proveedorDatosDireccion';

export default angular
    .module(name, [
        Alertas,
        FormaDireccion
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: ProveedorDatosDireccion
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.proveedores.agregar.direccion', {
            url: '/direccion/:proveedorId',
            template: '<proveedor-datos-direccion></proveedor-datos-direccion>'
        });
}
