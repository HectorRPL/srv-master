/**
 * Created by Héctor on 27/06/2017.
 */
import template from "./editarProveedorGenerales.html";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as CuentaContable} from "../../../comun/inputs/cuentaContable/cuentaContable";
import {cambiosProveedor} from "../../../../../api/catalogos/proveedores/methods";

class EditarProveedorGenerales {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$scope = $scope;
        this.$state = $state;
        $reactive(this).attach($scope);

        this.tipoMsj = '';
        this.datos =  {
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
        CuentaContable
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
