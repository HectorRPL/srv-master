/**
 * Created by Héctor on 27/06/2017.
 */
import {Proveedores} from "../../../../../api/catalogos/proveedores/collection";
import {actualizarProvdrDats} from "../../../../../api/catalogos/proveedores/methods";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as FormaDatosGenerales} from "../../../comun/formas/formaDatosGenerales/formaDatosGenerales";
import template from "./editarProveedorGenerales.html";

class EditarProveedorGenerales {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this.propietarioId = $stateParams.proveedorId;

        this.tipoMsj = '';

        this.subscribe('proveedores.todos', () => [{_id: $stateParams.proveedorId}]);

        this.helpers({
            proveedor(){
                return Proveedores.findOne({_id: $stateParams.proveedorId});
            }
        });
    }

    actualizarDatosGenerales() {
        delete this.proveedor.cuentaContable;
        delete this.proveedor.fechaCreacion;
        delete this.proveedor._id;
        delete this.proveedor.activo;
        delete this.proveedor.dias;

        this.proveedor._id = this.propietarioId;

        actualizarProvdrDats.callPromise(this.proveedor).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
        })).catch(this.$bindToContext((err)=> {
            this.tipoMsj = 'danger';
        }));

    }

}

const name = 'editarProveedorGenerales';

export default angular
    .module(name, [
        Alertas,
        FormaDatosGenerales
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: EditarProveedorGenerales
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.proveedores.editar.generales', {
            url: '/generales',
            template: '<editar-proveedor-generales></editar-proveedor-generales>'
        });
}
