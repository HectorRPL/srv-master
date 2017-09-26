/**
 * Created by Héctor on 22/06/2017.
 */
import template from "./proveedorDatosFiscales.html";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {crearDatoFiscal} from "../../../../../api/datosFiscales/methods";
import {name as FormaDatosFiscales} from "../../../comun/formas/formaDatosFiscales/formaDatosFiscales";

class ProveedorDatosFiscales {
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

        crearDatoFiscal.callPromise(datosFiscalesFinal).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            this.tipoMsj = 'danger';
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
        template: template.default,
        controllerAs: name,
        controller: ProveedorDatosFiscales
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
