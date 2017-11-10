/**
 * Created by jvltmtz on 9/05/17.
 */
import {Tiendas}                    from "../../../../../api/catalogos/tiendas/collection";
import {actlzrTindDatFiscl}         from "../../../../../api/catalogos/tiendas/methods";
import {name as Alertas}            from "../../../comun/alertas/alertas";
import {name as CrearDatosFiscales} from "../../../datosFiscales/crearDatosFiscales/crearDatosFiscales";
import template                     from "./tiendaDatosFiscales.html";

class TiendaDatosFiscales {
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

const name = 'tiendaDatosFiscales';

export default angular
    .module(name, [
        Alertas,
        CrearDatosFiscales
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: TiendaDatosFiscales
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.agregar.fiscales', {
            url: '/fiscales/:tiendaId',
            template: '<tienda-datos-fiscales></tienda-datos-fiscales>'
        });
}