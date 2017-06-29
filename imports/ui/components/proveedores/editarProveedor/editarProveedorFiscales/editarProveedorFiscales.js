/**
 * Created by Héctor on 27/06/2017.
 */
import template from "./editarProveedorFiscales.html";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {cambiosDireccionFiscal} from "../../../../../api/datosFiscales/methods";
import {DatosFiscales} from "../../../../../api/datosFiscales/collection";

class EditarProveedorFiscales {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        this.$state = $state;
        $reactive(this).attach($scope);

        this.propietarioId = $stateParams.proveedorId;

        this.tipoMsj = '';

        this.subscribe('datosFiscales.proveedor', () => [{propietarioId: this.propietarioId}]);
        this.helpers({
            datosFiscales(){
                return DatosFiscales.findOne();
            }
        });

    }

    actualizarDireccion() {
        let datosFiscalesFinal = angular.copy(this.datosFiscales);
        delete datosFiscalesFinal.colonias;
        delete datosFiscalesFinal._id;
        delete datosFiscalesFinal.tipoPersona;
        delete datosFiscalesFinal.razonSocial;
        delete datosFiscalesFinal.tipoSociedad;
        delete datosFiscalesFinal.email;
        delete datosFiscalesFinal.fechaCreacion;

        cambiosDireccionFiscal.call(datosFiscalesFinal, this.$bindToContext((err) => {
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

const name = 'editarProveedorFiscales';

export default angular
    .module(name, [
        Alertas,
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: EditarProveedorFiscales
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.proveedores.editar.fiscales', {
            url: '/fiscales',
            template: '<editar-proveedor-fiscales></editar-proveedor-fiscales>'
        });
}