/**
 * Created by Héctor on 22/06/2017.
 */
import template from "./proveedorDatosGenerales.html";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as FormaDatosGenerales} from "../../../comun/formas/formaDatosGenerales/formaDatosGenerales";
import {name as CuentaContableProveedores} from "../../../comun/inputs/cuentaContableProveedores/cuentaContableProveedores";
import {crearProveedor} from "../../../../../api/catalogos/proveedores/methods";

class ProveedorDatosGenerales {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.tipoMsj = '';
        this.$scope = $scope;
        this.ocultarBoton = false;

        this.datos = {
            telefonos: [{telefono: ''}]
        };
    }

    agregarTelefono() {
        this.nuevoTelefono = {
            telefono: this.telefono,
            extension: this.extension,
        };
        this.datos.telefonos.push(this.nuevoTelefono);
    }

    guardar() {
        crearProveedor.call(this.datos, this.$bindToContext((err, result) => {
            if (err) {
                this.msj = 'Error, llamar a soporte técnico: 55-6102-4884 | 55-2628-5121';
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'Los datos de contacto se guardaron con éxito.';
                this.tipoMsj = 'success';
                this.$state.go('app.proveedores.agregar.direccion', {proveedorId: result});
            }
        }));
    }

}

const name = 'proveedorDatosGenerales';

export default angular
    .module(name, [
        Alertas,
        FormaDatosGenerales,
        CuentaContableProveedores
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: ProveedorDatosGenerales
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.proveedores.agregar.datos', {
            url: '/datos',
            template: '<proveedor-datos-generales></proveedor-datos-generales>'
        });
}
