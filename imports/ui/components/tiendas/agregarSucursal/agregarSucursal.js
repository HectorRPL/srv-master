/**
 * Created by jvltmtz on 10/05/17.
 */
import "./agregarSucursal.html";
import {name as Alertas} from "../../comun/alertas/alertas";
import {altaSucursal} from "../../../../api/catalogos/tiendas/sucursales/methods";
import {altaDireccion} from "../../../../api/direcciones/methods";

class AgregarSucursal {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.tipoMsj = '';
        this.direccion = {};
        this.$scope = $scope;
        this.datos = {
            telefonos: [{telefono: ''}]
        };
        this.tiendaId = $stateParams.tiendaId;
        this.titulo = 'Agregar Sucursal';
    }

    agregarTelefono() {
        this.nuevoTelefono = {
            telefono: this.telefono,
            extension: this.extension,
        };
        this.datos.telefonos.push(this.nuevoTelefono);
    }

    guardar() {
        this.datos.tiendaMatrizId = this.tiendaId;
        console.log('Crear suscursal ', this.datos);
        altaSucursal.call(this.datos, this.$bindToContext((err, result)=> {
            if (err) {
                this.msj = 'Error al crear una Sucursal, llamar a soporte técnico: 55-6102-4884 | 55-2628-5121';
                this.tipoMsj = 'danger';
            } else {
                this.direccion.propietarioId = result;
                this.guardarDireccion();

            }
        }));
    }

    guardarDireccion() {
        let direccionFinal = angular.copy(this.direccion);
        delete direccionFinal.colonias;
        altaDireccion.call(direccionFinal, this.$bindToContext((err, result)=> {
            if (err) {
                this.msj = 'Error al crear la direccion de una Sucursal, llamar a soporte técnico: 55-6102-4884 | 55-2628-5121';
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'Los datos de contacto se guardaron con éxito.';
                this.tipoMsj = 'success';
                this.pasoActual++;
            }
        }))
    }

}

const name = 'agregarSucursal';

// create a module
export default angular
    .module(name, [
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/tiendas/${name}/${name}.html`,
        controllerAs: name,
        controller: AgregarSucursal
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.sucursal', {
            url: '/sucursal/:tiendaId',
            template: '<agregar-sucursal></agregar-sucursal>'
        });
}
