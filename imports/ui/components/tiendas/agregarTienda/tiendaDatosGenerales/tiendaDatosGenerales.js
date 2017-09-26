/**
 * Created by jvltmtz on 9/05/17.
 */
import template from "./tiendaDatosGenerales.html";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as FormaDatosGenerales} from "../../../comun/formas/formaDatosGenerales/formaDatosGenerales";
import {name as FormaDireccion} from "../../../comun/formas/formaDireccion/formaDireccion";
import {crearTienda} from "../../../../../api/catalogos/tiendas/methods";

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
        crearTienda.callPromise(this.datos).then(this.$bindToContext((result) => {
            this.tipoMsj = 'success';
            this.$state.go('app.tienda.agregar.direccion', {tiendaId: result});
        })).catch(this.$bindToContext((err)=>{
            this.tipoMsj = 'danger';
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
        template: template.default,
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
