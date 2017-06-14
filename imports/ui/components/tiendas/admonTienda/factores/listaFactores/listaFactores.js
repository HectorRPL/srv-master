/**
 * Created by Héctor on 13/06/2017.
 */
import {Factores} from "../../../../../../api/factores/collection";
import utilsPagination from "angular-utils-pagination";
import "./listaFactores.html";

class ListaFactores {

    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);

        this.perPage = 15;
        this.page = 1;

        this.subscribe('factores.todos');
        this.helpers({
            factores (){
                console.log('Que onda we, a ver que me traes', Factores.find());
                return Factores.find({}, {
                    sort: {fechaCreacion: -1}
                });
            }
        });
    }

    pageChanged(newPage) {
        this.page = newPage;
    }

}

const name = 'listaFactores';

export default angular
    .module(name, [
        utilsPagination
    ])
    .component(name, {
        templateUrl: `imports/ui/components/tiendas/admonTienda/factores/${name}/${name}.html`,
        controllerAs: name,
        controller: ListaFactores,
        bindings: {
            marca: '=',
            prod: '=',
            tiendaid: '=',
            count: '='
        },
    });
