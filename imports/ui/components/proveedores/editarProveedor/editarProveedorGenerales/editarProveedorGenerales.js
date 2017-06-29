/**
 * Created by Héctor on 27/06/2017.
 */
import template from "./editarProveedorGenerales.html";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as FormaDatosProveedores} from "../../../comun/formas/formaDatosProveedores/formaDatosProveedores";
import {cambiosProveedor} from "../../../../../api/catalogos/proveedores/methods";
import {Proveedores} from "../../../../../api/catalogos/proveedores/collection";

class EditarProveedorGenerales {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        this.$state = $state;
        $reactive(this).attach($scope);

        this.propietarioId = $stateParams.proveedorId;
        console.log('$stateParams.proveedorId', $stateParams.proveedorId)

        this.tipoMsj = '';

        this.proveedor = {};

        this.subscribe('proveedores.todos', () => [{_id: $stateParams.proveedorId}]);
        console.log('SEGÚN ESTO ES EL this.proveedorId', this.proveedorId);

        this.helpers({
            proveedor(){
                console.log('TRAER EL PROVEEDOR [26]', Proveedores.findOne());
                return Proveedores.findOne();
            }
        });
    }


    editar() {
        this.ocultarBoton = true;
    }

    guardar() {
        console.log('Esto vamos a enviar linea 28', this.datos);
        cambiosProveedor.call(this.datos, this.$bindToContext((err, result) => {
            if (err) {
                this.msj = 'Error, llamar a soporte técnico: 55-6102-4884 | 55-2628-5121';
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'Los datos de contacto se guardaron con éxito.';
                this.tipoMsj = 'success';
                this.$state.go('app.proveedores.agregar.fiscales', {propietarioId: result});
            }
        }));
    }

}

const name = 'editarProveedorGenerales';

export default angular
    .module(name, [
        Alertas,
        FormaDatosProveedores
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
