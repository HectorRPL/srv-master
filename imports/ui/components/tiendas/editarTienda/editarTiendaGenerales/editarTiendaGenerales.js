/**
 * Created by Héctor on 30/06/2017.
 */
import template from "./editarTiendaGenerales.html";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as FormaDatosGenerales} from "../../../comun/formas/formaDatosGenerales/formaDatosGenerales";
import {cambiosTienda} from "../../../../../api/catalogos/tiendas/methods";
import {Tiendas} from "../../../../../api/catalogos/tiendas/collection";

class EditarTiendaGenerales {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        this.$state = $state;
        $reactive(this).attach($scope);

        this._id = $stateParams.tiendaId;

        this.tipoMsj = '';

        this.tienda = {};

        this.subscribe('tiendas.todas', () => [{_id: this._id}]);

        this.datosTiendaNuevo = {};
        this.helpers({
            tienda(){
                this.datosTiendaNuevo = Tiendas.findOne({_id: this._id});
                return angular.copy(this.datosTiendaNuevo);
            }
        });
    }

    editar() {
        this.ocultarBoton = true;
    }

    limpiarCampos(datosGeneralesForm) {
        this.datosTiendaNuevo = {};
        datosGeneralesForm.$setPristine();
    }

    actualizarDatosGenerales(datosGeneralesForm) {
        delete this.datosTiendaNuevo.cuentaContable;
        delete this.datosTiendaNuevo.fechaCreacion;
        delete this.datosTiendaNuevo._id;
        delete this.datosTiendaNuevo.activo;
        delete this.datosTiendaNuevo.dias;
        delete this.datosTiendaNuevo.tiendaMatrizId;

        this.datosTiendaNuevo._id = this._id;
        cambiosTienda.call(this.datosTiendaNuevo, this.$bindToContext((err, result) => {
            if (err) {
                this.msj = err + 'Error, llamar a soporte técnico: 55-6102-4884 | 55-2628-5121';
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'Los datos de contacto se guardaron con éxito.';
                this.tipoMsj = 'success';
                this.limpiarCampos(datosGeneralesForm);
            }
        }));
    }

}

const name = 'editarTiendaGenerales';

export default angular
    .module(name, [
        Alertas,
        FormaDatosGenerales
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: EditarTiendaGenerales
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.editar.generales', {
            url: '/datosgenerales',
            template: '<editar-tienda-generales></editar-tienda-generales>'
        });
}

/*todo: En editar datos generales, tanto en proeedores como en tiendas no está funcionando correctamente, me manda un error al estar vacío*/