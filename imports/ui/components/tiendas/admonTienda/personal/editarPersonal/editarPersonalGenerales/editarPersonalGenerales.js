/**
 * Created by Héctor on 11/07/2017.
 */
import template from "./editarPersonalGenerales.html";
import {name as Alertas} from "../../../../../comun/alertas/alertas";
import {name as FormaDatosGenerales} from "../../../../../comun/formas/formaDatosGenerales/formaDatosGenerales";
// import {cambiosPersonal} from "../../../../../../../api/empleados/methods";
import {Empleados} from "../../../../../../../api/empleados/collection";

class EditarPersonalGenerales {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        this.$state = $state;
        $reactive(this).attach($scope);

        this._id = $stateParams.personalId;

        this.tipoMsj = '';

        this.tienda = {};

        this.subscribe('empleados.porTienda', () => [{_id: this.personalId}]);

        this.datosPersonalNuevo = {};
        this.helpers({
            personal(){
                this.datosPersonalNuevo = Empleados.findOne({_id: this._id});
                return angular.copy(this.datosPersonalNuevo);
            }
        });
    }

    editar() {
        this.ocultarBoton = true;
    }

    limpiarCampos(datosGeneralesForm) {
        this.datosPersonalNuevo = {};
        datosGeneralesForm.$setPristine();
    }

    actualizarDatosGenerales(datosGeneralesForm) {
        delete this.datosPersonalNuevo.cuentaContable;
        delete this.datosPersonalNuevo.fechaCreacion;
        delete this.datosPersonalNuevo._id;
        delete this.datosPersonalNuevo.activo;
        delete this.datosPersonalNuevo.dias;
        delete this.datosPersonalNuevo.tiendaMatrizId;

        this.datosPersonalNuevo._id = this._id;

        /*
        cambiosPersonal.callPromise(this.datosPersonalNuevo).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
            this.limpiarCampos(datosGeneralesForm);
        })).catch(this.$bindToContext((err) => {
            this.tipoMsj = 'danger';
        }));
        */
    }
}

const name = 'editarPersonalGenerales';

export default angular
    .module(name, [
        Alertas,
        FormaDatosGenerales
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: EditarPersonalGenerales
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.empleados.editar.generales', {
            url: '/:personalId/generales',
            template: '<editar-personal-generales></editar-personal-generales>'
        });
}