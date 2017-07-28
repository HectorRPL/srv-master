/**
 * Created by jvltmtz on 10/05/17.
 */
import template from "./agregarSucursal.html";
import {name as SucursalDatosGenerales} from "./sucursalDatosGenerales/sucursalDatosGenerales";
import {name as SucursalDatosDireccion} from "./sucursalDatosDireccion/sucursalDatosDireccion";

class AgregarSucursal {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Agregar Sucursal';

        this.tabs = [
            {titulo: "Datos Generales", estado: ".datos", icono: 'fa fa-user'},
            {titulo: "Dirección",       estado: ".direccion", icono: 'fa fa-map-marker'}
        ];
    }

}

const name = 'agregarSucursal';

export default angular
    .module(name, [
        SucursalDatosGenerales,
        SucursalDatosDireccion
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: AgregarSucursal
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.agregarSucursal', {
            url: '/sucursal/:tiendaId',
            template: '<agregar-sucursal></agregar-sucursal>',
            abstract: true
        });
}
