/**
 * Created by Héctor on 30/06/2017.
 */
import template from "./editarTiendaGenerales.html";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as FormaDatosGenerales} from "../../../comun/formas/formaDatosGenerales/formaDatosGenerales";
import {cambiosTienda} from "../../../../../api/catalogos/tiendas/methods";
import {Tiendas} from "../../../../../api/catalogos/tiendas/collection";

class EditarTiendaGenerales {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this._id = $stateParams.tiendaId;
        this.tipoMsj = '';

        // this.tienda = {};

        this.subscribe('tiendas.todas', () => [{_id: this._id}]);
        this.helpers({
            tienda(){
                return Tiendas.findOne({_id: this._id});
            }
        });
    }

    actualizarDatosGenerales() {
        delete this.tienda.cuentaContable;
        delete this.tienda.fechaCreacion;
        delete this.tienda._id;
        delete this.tienda.activo;
        delete this.tienda.dias;
        delete this.tienda.tiendaMatrizId;

        this.tienda._id = this._id;

        console.log('[39] Lo que vamos a enviar', this.tienda);

        cambiosTienda.callPromise(this.tienda).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err)=>{
            console.log('[47]', err);
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