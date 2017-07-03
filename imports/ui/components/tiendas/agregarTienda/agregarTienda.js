/**
 * Created by jvltmtz on 9/03/17.
 */
import template from "./agregarTienda.html";
import {name as TiendaDatosGenerales} from "./tiendaDatosGenerales/tiendaDatosGenerales";
import {name as TiendaDatosDireccion} from "./tiendaDatosDireccion/tiendaDatosDireccion";
import {name as TiendaDatosFiscales} from "./tiendaDatosFiscales/tiendaDatosFiscales";
import {name as CuentaContable} from "../../comun/inputs/cuentaContable/cuentaContable";

class AgregarTienda {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Agregar Tienda';

        this.tabs = [
            {titulo: "Datos Generales", estado: ".datos", icono: 'fa fa-user'},
            {titulo: "Dirección", estado: ".direccion", icono: 'fa fa-map-marker'},
            {titulo: "Datos Fiscales", estado: ".fiscales", icono: 'fa fa-cubes'}
        ];
    }

}

const name = 'agregarTienda';

export default angular
    .module(name, [
        TiendaDatosGenerales,
        TiendaDatosDireccion,
        TiendaDatosFiscales,
        CuentaContable
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: AgregarTienda
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.agregar', {
            url: '/agregar',
            template: '<agregar-tienda></agregar-tienda>',
            abstract: true
        });
}
