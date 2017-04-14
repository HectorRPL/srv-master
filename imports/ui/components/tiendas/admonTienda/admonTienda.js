/**
 * Created by jvltmtz on 29/03/17.
 */
import "./admonTienda.html";
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
        this.titulo = 'Administrar';
        this.tituloInv = 'Inventario';
        this.tituloFact = 'Factores';
        this.tituloComi = 'Comisiones';
        this.tiendaId = $stateParams.tiendaId;
        this.subscribe('tiendas.todas');

        this.helpers({
            tienda(){
                return Tiendas.findOne({_id: this.tiendaId});
            }
        });
    }

}

const name = 'admonTienda';

// create a module
export default angular
    .module(name, [
        TituloPrincipal,
        Factores,
        Comisiones,
        Inventario,
        Personal
    ])
    .component(name, {
        templateUrl: `imports/ui/components/tiendas/${name}/${name}.html`,
        controllerAs: name,
        controller: AdmonTienda
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon', {
            url: '/:tiendaId',
            template: '<admon-tienda></admon-tienda>'
        });
}