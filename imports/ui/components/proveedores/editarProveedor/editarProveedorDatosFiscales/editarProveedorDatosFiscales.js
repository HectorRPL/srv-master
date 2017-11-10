/**
 * Created by Héctor on 25/07/2017.
 */
import {Proveedores}                 from "../../../../../api/catalogos/proveedores/collection";
import {actlzrProvdrDatFiscl}        from "../../../../../api/catalogos/proveedores/methods";
import {name as Alertas}             from "../../../comun/alertas/alertas";
import {name as EditarDatosFiscales} from "../../../datosFiscales/editarDatosFiscales/editarDatosFiscales";
import {name as CrearDatosFiscales}  from "../../../datosFiscales/crearDatosFiscales/crearDatosFiscales";
import template                      from "./editarProveedorDatosFiscales.html";

class EditarProveedorDatosFiscales {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this.direccion = {};
        this.proveedorId = $stateParams.proveedorId;
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
            this.tipoMsj = 'danger';
        }));
    }
}

const name = 'editarProveedorDatosFiscales';

export default angular
    .module(name, [
        Alertas,
        EditarDatosFiscales,
        CrearDatosFiscales
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