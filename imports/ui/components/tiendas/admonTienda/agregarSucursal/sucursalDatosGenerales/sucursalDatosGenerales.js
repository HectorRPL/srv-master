/**
 * Created by Héctor on 26/07/2017.
 */
import {crearSucursal} from "../../../../../../api/catalogos/tiendas/sucursales/methods";
import {name as Alertas} from "../../../../comun/alertas/alertas";
import {name as FormaDatosGenerales} from "../../../../comun/formas/formaDatosGenerales/formaDatosGenerales";
import template from "./sucursalDatosGenerales.html";

class SucursalDatosGenerales {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        this.$state = $state;
        $reactive(this).attach($scope);

        this.tiendaId = $stateParams.tiendaId;
        this.sucursalId = {};

        this.tipoMsj = '';
        this.datos = {
            telefonos: [{telefono: ''}]
        };
    }

    altaDatosGenerales() {
        this.datos.tiendaMatrizId = this.tiendaId;
        console.log(this.datos);
        crearSucursal.callPromise(this.datos).then(this.$bindToContext((result) => {
            this.tipoMsj = 'success';
            this.sucursalId = result
            console.log(this.sucursalId);
            this.$state.go('app.tienda.agregarSucursal.direccion', {sucursalId: this.sucursalId});
        })).catch(this.$bindToContext((err)=>{
            console.log(err);
            this.tipoMsj = 'danger';
        }));
    }
}

const name = 'sucursalDatosGenerales';

export default angular
    .module(name, [
        Alertas,
        FormaDatosGenerales
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: SucursalDatosGenerales
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.agregarSucursal.datos', {
            url: '/agregar/datos',
            template: '<sucursal-datos-generales></sucursal-datos-generales>'
        });
}
