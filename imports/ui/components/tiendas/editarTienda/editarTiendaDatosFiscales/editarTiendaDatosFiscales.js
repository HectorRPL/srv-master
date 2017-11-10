/**
 * Created by Héctor on 25/07/2017.
 */
import {Tiendas} from "../../../../../api/catalogos/tiendas/collection";
import {actlzrTindDatFiscl} from "../../../../../api/catalogos/tiendas/methods";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as FormaEditarDatosFiscales} from "../../../comun/formas/formaEditarDatosFiscales/formaEditarDatosFiscales";
import {name as FormaDatosFiscales} from "../../../comun/formas/formaDatosFiscales/formaDatosFiscales";
import template from "./editarTiendaDatosFiscales.html";

class EditarTiendaDatosFiscales {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this.direccion = {};

        this.tiendaId = $stateParams.tiendaId;

        this.tipoMsj = '';

        this.subscribe('tiendas.todas', () => [{_id: this.tiendaId}]);
        this.helpers({
            tienda(){
                return Tiendas.findOne({_id: this.tiendaId});
            }
        });
    }
    asignarDatosFiscalesId(result) {
        let datos = {
            _id: this.tiendaId,
            datosFiscalesId: result.item
        };
        actlzrTindDatFiscl.callPromise(datos).then(this.$bindToContext(() => {
            this.msj = 'Éxito al realizar la operación';
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            console.log(err);
            this.tipoMsj = 'danger';
        }));
    }
}

const name = 'editarTiendaDatosFiscales';

export default angular
    .module(name, [
        Alertas,
        FormaEditarDatosFiscales,
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