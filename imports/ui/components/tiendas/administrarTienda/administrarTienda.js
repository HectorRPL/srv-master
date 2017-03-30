/**
 * Created by jvltmtz on 29/03/17.
 */
import "./administrarTienda.html";
import {Tiendas} from "../../../../api/catalogos/tiendas/collection";
import {name as TituloPrincipal} from '../../comun/tituloPrincipal/tituloPrincipal';
import {name as TabFactores} from '../administrarTienda/tabFactores/tabFactores';
import {name as TabComisiones} from '../administrarTienda/tabComisiones/tabComisiones';
import {name as TabInventarios} from '../administrarTienda/tabInventarios/tabInventarios';

class AdministrarTienda {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Administrar';
        this.tituloInv = 'Inventarios';
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

const name = 'administrarTienda';

// create a module
export default angular
    .module(name, [
        TituloPrincipal,
        TabFactores,
        TabComisiones,
        TabInventarios
    ])
    .component(name, {
        templateUrl: `imports/ui/components/tiendas/${name}/${name}.html`,
        controllerAs: name,
        controller: AdministrarTienda
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tiendas.administrar', {
            url: '/admin/:tiendaId',
            template: '<administrar-tienda></administrar-tienda>'
        });
}