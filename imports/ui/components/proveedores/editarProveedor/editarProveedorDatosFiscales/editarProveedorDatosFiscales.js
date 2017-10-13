/**
 * Created by Héctor on 25/07/2017.
 */
import {DatosFiscales}              from "../../../../../api/datosFiscales/collection";
import {crearDatoFiscal}            from "../../../../../api/datosFiscales/methods";
import {actlzrDireccDatsFiscls}     from "../../../../../api/datosFiscales/methods";
import {name as Alertas}            from "../../../comun/alertas/alertas";
import {name as FormaDireccion}     from "../../../comun/formas/formaDireccion/formaDireccion";
import {name as FormaDatosFiscales} from "../../../comun/formas/formaDatosFiscales/formaDatosFiscales";
import template                     from "./editarProveedorDatosFiscales.html";

class EditarProveedorDatosFiscales {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this.direccion = {};

        this.propietarioId = $stateParams.proveedorId;

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
        delete this.datosFiscales._id;
        delete this.datosFiscales.rfc;
        delete this.datosFiscales.tipoPersona;
        delete this.datosFiscales.razonSocial;
        delete this.datosFiscales.tipoSociedad;
        delete this.datosFiscales.apellidos;
        delete this.datosFiscales.nombres;
        delete this.datosFiscales.email;
        delete this.datosFiscales.fechaCreacion;

        actlzrDireccDatsFiscls.callPromise(this.datosFiscales).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            this.tipoMsj = 'danger';
        }));
    }
}

const name = 'editarProveedorDatosFiscales';

export default angular
    .module(name, [
        Alertas,
        FormaDireccion,
        FormaDatosFiscales
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: EditarProveedorDatosFiscales
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.proveedores.editar.fiscales', {
            url: '/datosFiscales',
            template: '<editar-proveedor-datos-fiscales></editar-proveedor-datos-fiscales>'
        });
}