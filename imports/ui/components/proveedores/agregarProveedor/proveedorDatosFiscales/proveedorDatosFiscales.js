/**
 * Created by Héctor on 22/06/2017.
 */
import template from "./proveedorDatosFiscales.html";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {altaDatosFiscales} from "../../../../../api/datosFiscales/methods";
import {name as FormaDatosFiscales} from "../../../comun/formas/formaDatosFiscales/formaDatosFiscales";

class proveedorDatosFiscales {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.propietarioId = $stateParams.propietarioId;

        this.datosFiscales = {
            tipoPersona: 'PM'
        };

        this.tipoMsj = '';
        this.$scope = $scope;
    }

    guardar() {
        let datosFiscalesFinal = angular.copy(this.datosFiscales);
        delete datosFiscalesFinal.colonias;

        datosFiscalesFinal.propietarioId = this.propietarioId;
        altaDatosFiscales.call(datosFiscalesFinal, this.$bindToContext((err) => {
            if (err) {
                this.msj = err + 'Error, llamar a soporte técnico: 55-6102-4884 | 55-2628-5121';
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'Los datos fiscales se guardaron exitosamente.';
                this.tipoMsj = 'success';
            }
        }));
    }

}

const name = 'proveedorDatosFiscales';

// create a module
export default angular
    .module(name, [
        Alertas,
        FormaDatosFiscales
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: proveedorDatosFiscales
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.proveedores.agregar.fiscales', {
            url: '/fiscales/:propietarioId',
            template: '<proveedor-datos-fiscales></proveedor-datos-fiscales>'
        });
}
