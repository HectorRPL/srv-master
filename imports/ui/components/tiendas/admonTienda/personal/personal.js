/**
 * Created by Héctor on 14/04/2017.
 */
import "./personal.html";
import {name as ListaPersonal} from "./listaPersonal/listaPersonal";
import {name as AgregarEmpleado} from "./agregarEmpleado/agregarEmpleado";

class Personal {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
    }
}

const name = 'personal';

// create a module
export default angular
    .module(name, [
        ListaPersonal,
        AgregarEmpleado
    ])
    .component(name, {
        templateUrl: `imports/ui/components/tiendas/admonTienda/${name}/${name}.html`,
        controllerAs: name,
        controller: Personal
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.personal', {
            url: '/personal',
            template: '<personal></personal>',
            abstract: true
        });
}