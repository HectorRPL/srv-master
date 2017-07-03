/**
 * Created by jvltmtz on 9/05/17.
 */
import template from "./tiendaDatosGenerales.html";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as FormaDatosGenerales} from "../../../comun/formas/formaDatosGenerales/formaDatosGenerales";
import {name as FormaDireccion} from "../../../comun/formas/formaDireccion/formaDireccion";
import {altaTienda} from "../../../../../api/catalogos/tiendas/methods";

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
        console.log('Estos son los datos generales que vamos a enviar', this.datos);
        altaTienda.call(this.datos, this.$bindToContext((err, result)=> {
            if (err) {
                this.msj = err + 'Error al crear una tienda, llamar a soporte técnico: 55-6102-4884 | 55-2628-5121';
                this.tipoMsj = 'danger';
            } else {
                this.$state.go('app.tienda.agregar.direccion', {tiendaId: result});
            }
        }));
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
