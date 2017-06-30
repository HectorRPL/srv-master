/**
 * Created by jvltmtz on 9/05/17.
 */
import template from "./tiendaDatosGenerales.html";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as FormaDatosGenerales} from "../../../comun/formas/formaDatosGenerales/formaDatosGenerales";
import {name as FormaDireccion} from "../../../comun/formas/formaDireccion/formaDireccion";
import {altaTienda} from "../../../../../api/catalogos/tiendas/methods";
import {altaDireccion} from "../../../../../api/direcciones/methods";

class TiendaDatosGenerales {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$scope = $scope;
        this.$state = $state;
        $reactive(this).attach($scope);

        this.tipoMsj = '';
        this.direccion = {};
        this.datos = {
            telefonos: [{telefono: ''}]
        };
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
        altaDireccion.call(direccionFinal, this.$bindToContext((err)=> {
            if (err) {
                this.msj = 'Error al crear la direccion de una tienda, llamar a soporte técnico: 55-6102-4884 | 55-2628-5121';
                this.tipoMsj = 'danger';
            } else {
                this.msj = 'Los datos de contacto se guardaron con éxito.';
                this.tipoMsj = 'success';
                this.$state.go('app.tienda.agregar.fiscales', {tiendaId: direccionFinal.propietarioId});
            }
        }))
    }

}

const name = 'tiendaDatosGenerales';

export default angular
    .module(name, [
        Alertas,
        FormaDatosGenerales,
        FormaDireccion
    ])
    .component(name, {
        template,
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
