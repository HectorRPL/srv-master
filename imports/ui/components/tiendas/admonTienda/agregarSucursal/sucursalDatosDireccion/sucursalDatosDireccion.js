/**
 * Created by Héctor on 26/07/2017.
 */
import {altaDireccion} from "../../../../../../api/direcciones/methods";
import {name as Alertas} from "../../../../comun/alertas/alertas";
import {name as FormaDireccion} from "../../../../comun/formas/formaDireccion/formaDireccion";
import template from "./sucursalDatosDireccion.html";

class SucursalDatosDireccion {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this.propietarioId = $stateParams.sucursalId;
        console.log('ESTO ES LA SUCURSAL_ID', this.propietarioId);

        this.tipoMsj = '';
        this.direccion = {};
    }

    // /*
    altaDireccion() {
        this.direccion.propietarioId = this.propietarioId
        let direccionFinal = angular.copy(this.direccion);
        delete direccionFinal.colonias;
        console.log('Esta es la dirección que vamos a enviar:', direccionFinal);

        altaDireccion.callPromise(direccionFinal).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err)=>{
            this.tipoMsj = 'danger';
        }));
    }
    // */


}

const name = 'sucursalDatosDireccion';

export default angular
    .module(name, [
        Alertas,
        FormaDireccion
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: SucursalDatosDireccion
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.agregarSucursal.direccion', {
            url: '/agregar/:sucursalId/direccion',
            template: '<sucursal-datos-direccion></sucursal-datos-direccion>'
        });
}
