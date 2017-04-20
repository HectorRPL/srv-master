/**
 * Created by jvltmtz on 30/03/17.
 */
import {Marcas} from "../../../../../api/catalogos/marcas/collection";
import {name as TituloPrincipal} from '../../../comun/tituloPrincipal/tituloPrincipal';
import {name as ListaProductosMarca} from './listaProductosMarca/listaProductosMarca';
import "./inventario.html";

class Inventario {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Inventario';
        this.tiendaId = $stateParams.tiendaId;
        this.subscribe('marcas.todas');

        this.helpers({
            marcas(){
                return Marcas.find();
            }
        });
    }


    muestrameTiendaId(tiendaId){
        console.log('Mostraras el tiendaId: ', tiendaId);
    }

}

const name = 'inventario';

// create a module
export default angular
    .module(name, [
        TituloPrincipal,
        ListaProductosMarca
    ])
    .component(name, {
        templateUrl: `imports/ui/components/tiendas/admonTienda/${name}/${name}.html`,
        controllerAs: name,
        controller: Inventario
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.inventario', {
            url: '/:tiendaId/inventario',
            template: '<inventario></inventario>'
        });
}