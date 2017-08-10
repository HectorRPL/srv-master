/**
 * Created by jvltmtz on 29/03/17.
 */
import template from "./admonTienda.html";
import {Tiendas} from "../../../../api/catalogos/tiendas/collection";
import {name as TituloPrincipal} from '../../comun/tituloPrincipal/tituloPrincipal';
import {name as Factores} from './factores/factores';
import {name as Comisiones} from './comisiones/comisiones';
import {name as Inventario} from './inventario/inventario';
import {name as Empleados} from './empleados/empleados';
import {name as Promociones} from './promociones/promociones';
import {name as AgregarSucursal} from './agregarSucursal/agregarSucursal';


class AdmonTienda {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.tiendaId = $stateParams.tiendaId;

        this.subscribe('tiendas.todas', () =>
            [
                {
                    _id: this.tiendaId
                }
            ]);
        this.helpers({
            tienda(){
                return Tiendas.findOne({_id: this.tiendaId});
            }
        });
        this.tabs = [
            {titulo: "Empleados", estado: ".empleados.lista", icono: 'fa fa-users'},
            {titulo: "Inventario", estado: ".inventario.lista", icono: 'fa fa-cubes'},
            {titulo: "Factores", estado: ".factores.lista", icono: 'fa fa-money'},
            {titulo: "Comisiones", estado: ".comisiones.lista", icono: 'fa fa-briefcase'},
            {titulo: "Promociones", estado: ".promociones.lista", icono: 'fa fa-hand-o-down'},
        ];

        this.tab = 0;
    }

}

const name = 'admonTienda';

export default angular
    .module(name, [
        TituloPrincipal,
        Factores,
        Comisiones,
        Inventario,
        Promociones,
        Empleados,
        AgregarSucursal
    ])
    .component(name, {
        template,
        controllerAs: name,
        controller: AdmonTienda
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon', {
            url: '/:tiendaId',
            template: '<admon-tienda></admon-tienda>',
            abstract: true
        });
}