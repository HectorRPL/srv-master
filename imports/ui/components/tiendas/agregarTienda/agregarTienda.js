/**
 * Created by jvltmtz on 9/03/17.
 */
import template from "./agregarTienda.html";
import {name as TiendaDatosGenerales} from "./tiendaDatosGenerales/tiendaDatosGenerales";
import {name as TiendaDatosFiscales} from "./tiendaDatosFiscales/tiendaDatosFiscales";

class AgregarTienda {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Agregar Tienda';
        this.pasoActual = 1
    }

}

const name = 'agregarTienda';

// create a module
export default angular
    .module(name, [
        TiendaDatosGenerales,
        TiendaDatosFiscales
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: AgregarTienda,
        bindings:{
            paso: '<'
        }
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.agregar', {
            url: '/agregar',
            template: '<agregar-tienda></agregar-tienda>',
            abstract: true,
            component: 'agregarTienda',
            bindings: { paso: 'pasoactual' },
            data:{
                pasoactual: 0
            }
        });
}
