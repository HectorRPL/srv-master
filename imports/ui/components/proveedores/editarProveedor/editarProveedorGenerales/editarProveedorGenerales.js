/**
 * Created by Héctor on 27/06/2017.
 */
import template from "./editarProveedorGenerales.html";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as FormaDatosGenerales} from "../../../comun/formas/formaDatosGenerales/formaDatosGenerales";
import {cambiosProveedor} from "../../../../../api/catalogos/proveedores/methods";
import {Proveedores} from "../../../../../api/catalogos/proveedores/collection";

class EditarProveedorGenerales {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        this.$state = $state;
        $reactive(this).attach($scope);

        this.propietarioId = $stateParams.proveedorId;

        this.tipoMsj = '';

        this.proveedor = {};

        this.subscribe('proveedores.todos', () => [{_id: $stateParams.proveedorId}]);

        this.datosProveedorNuevo = {};
        this.helpers({
            proveedor(){
                this.datosProveedorNuevo = Proveedores.findOne({_id: $stateParams.proveedorId});
                return angular.copy(this.datosProveedorNuevo);
            }
        });


    }

    editar() {
        this.ocultarBoton = true;
    }

    limpiarCampos(datosGeneralesForm) {
        this.datosProveedorNuevo = {};
        datosGeneralesForm.$setPristine();
    }


    actualizarDatosGenerales(datosGeneralesForm) {
        delete this.datosProveedorNuevo.cuentaContable;
        delete this.datosProveedorNuevo.fechaCreacion;
        delete this.datosProveedorNuevo._id;
        delete this.datosProveedorNuevo.activo;
        delete this.datosProveedorNuevo.dias;

        this.datosProveedorNuevo._id = this.propietarioId;
        cambiosProveedor.call(this.datosProveedorNuevo, this.$bindToContext((err, result) => {
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

const name = 'editarProveedorGenerales';

export default angular
    .module(name, [
        Alertas,
        FormaDatosGenerales
    ])
    .component(name, {
        template,
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
