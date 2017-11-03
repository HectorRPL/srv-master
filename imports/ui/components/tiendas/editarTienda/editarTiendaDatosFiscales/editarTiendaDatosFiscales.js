/**
 * Created by Héctor on 25/07/2017.
 */
import {DatosFiscales}              from "../../../../../api/datosFiscales/collection";
import {crearDatoFiscal}            from "../../../../../api/datosFiscales/methods";
import {actualizarDatoFiscal}       from "../../../../../api/datosFiscales/methods";
import {name as Alertas}            from "../../../comun/alertas/alertas";
import {name as FormaDireccion}     from "../../../comun/formas/formaDireccion/formaDireccion";
import {name as FormaDatosFiscales} from "../../../comun/formas/formaDatosFiscales/formaDatosFiscales";
import template                     from "./editarTiendaDatosFiscales.html";

class EditarTiendaDatosFiscales {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this.direccion = {};

        this.propietarioId = $stateParams.tiendaId;

        this.tipoMsj = '';

        this.subscribe('datosFiscales.proveedor', () => [{propietarioId: this.propietarioId}]);
        this.helpers({
            datosFiscales(){
                return DatosFiscales.findOne({propietarioId: this.propietarioId});
            }
        });
    }

    altaDatosFiscales() {
        let datosFiscalesFinal = angular.copy(this.datosFiscales);
        delete datosFiscalesFinal.colonias;
        delete datosFiscalesFinal.fechaCreacion;
        datosFiscalesFinal.propietarioId = this.propietarioId;

        crearDatoFiscal.callPromise(datosFiscalesFinal).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            this.tipoMsj = 'danger';
        }));
    }

    actualizarDireccionFiscal() {
        delete this.datosFiscales.colonias;
        delete this.datosFiscales.fechaCreacion;

        actualizarDatoFiscal.callPromise(this.datosFiscales).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            this.tipoMsj = 'danger';
        }));
    }
}

const name = 'editarTiendaDatosFiscales';

export default angular
    .module(name, [
        Alertas,
        FormaDireccion,
        FormaDatosFiscales
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: EditarTiendaDatosFiscales
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.editar.fiscales', {
            url: '/datosFiscales',
            template: '<editar-tienda-datos-fiscales></editar-tienda-datos-fiscales>'
        });
}