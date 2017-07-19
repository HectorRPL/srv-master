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
        this.mostrarCampos = true;
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

        cambiosTienda.callPromise(this.datosTiendaNuevo).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
            this.limpiarCampos(datosGeneralesForm);
        })).catch(this.$bindToContext((err)=>{
            this.tipoMsj = 'danger';
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