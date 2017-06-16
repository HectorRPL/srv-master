/**
 * Created by jvltmtz on 9/05/17.
 */
import "./tiendaDatosGenerales.html";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {altaTienda} from "../../../../../api/catalogos/tiendas/methods";
import {altaDireccion} from "../../../../../api/direcciones/methods";

class TiendaDatosGenerales {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.tipoMsj = '';
        this.direccion = {};
        this.$scope = $scope;
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
        altaTienda.call(this.datos, this.$bindToContext((err, result)=> {
            if (err) {
                this.msj = 'Error al crear una tienda, llamar a soporte técnico: 55-6102-4884 | 55-2628-5121';
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
                this.msj = 'Error al crear la direccion de una tienda, llamar a soporte técnico: 55-6102-4884 | 55-2628-5121';
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'Los datos de contacto se guardaron con éxito.';
                this.tipoMsj = 'success';
                this.pasoActual++;
                this.$state.go('app.tienda.agregar.fiscales', {tiendaId: direccionFinal.propietarioId});
            }
        }))
    }

}

const name = 'tiendaDatosGenerales';

// create a module
export default angular
    .module(name, [
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/tiendas/agregarTienda/${name}/${name}.html`,
        controllerAs: name,
        controller: TiendaDatosGenerales
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.agregar.datos', {
            url: '/datos',
            template: '<tienda-datos-generales></tienda-datos-generales>'
        });
}
