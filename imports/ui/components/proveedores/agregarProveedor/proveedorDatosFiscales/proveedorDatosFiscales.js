/**
 * Created by Héctor on 22/06/2017.
 */
import {Proveedores}                from "../../../../../api/catalogos/proveedores/collection";
import {actlzrProvdrDatFiscl}       from "../../../../../api/catalogos/proveedores/methods";
import {name as Alertas}            from "../../../comun/alertas/alertas";
import {name as CrearDatosFiscales} from "../../../datosFiscales/crearDatosFiscales/crearDatosFiscales";
import template                     from "./proveedorDatosFiscales.html";

class ProveedorDatosFiscales {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this.direccion = {};
        this.proveedorId = $stateParams.propietarioId;
        this.tipoMsj = '';

        this.subscribe('proveedores.todos', () => [{_id: this.proveedorId}]);
        this.helpers({
            proveedor(){
                return Proveedores.findOne({_id: this.proveedorId});
            }
        });
    }
    asignarDatosFiscalesId(result) {
        let datos = {
            _id: this.proveedorId,
            datosFiscalesId: result.item
        };
        actlzrProvdrDatFiscl.callPromise(datos).then(this.$bindToContext(() => {
            this.msj = 'Éxito al realizar la operación';
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err) => {
            console.log(err);
            this.tipoMsj = 'danger';
        }));
    }
}

const name = 'proveedorDatosFiscales';

export default angular
    .module(name, [
        Alertas,
        CrearDatosFiscales
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