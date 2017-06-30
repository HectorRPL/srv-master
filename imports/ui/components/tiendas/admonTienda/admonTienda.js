/**
 * Created by jvltmtz on 29/03/17.
 */
import template from "./admonTienda.html";
import {Tiendas} from "../../../../api/catalogos/tiendas/collection";
import {name as TituloPrincipal} from '../../comun/tituloPrincipal/tituloPrincipal';
import {name as Factores} from './factores/factores';
import {name as Comisiones} from './comisiones/comisiones';
import {name as Inventario} from './inventario/inventario';
import {name as Personal} from './personal/personal';

class AdmonTienda {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.tiendaId = $stateParams.tiendaId;
        this.subscribe('tiendas.todas');

        this.helpers({
            tienda(){
                return Tiendas.findOne({_id: this.tiendaId});
            }
        });

        this.tabs = [
            {titulo: "Personal", estado: ".personal.lista", icono: 'fa fa-user'},
            {titulo: "Inventario", estado: ".inventario", icono: 'fa fa-cubes'},
            {titulo: "Factores", estado: ".factores.lista", icono: 'fa fa-money'},
            {titulo: "Comisiones", estado: ".comisiones.lista", icono: 'fa fa-briefcase'},
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
        Personal
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