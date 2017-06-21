/**
 * Created by jvltmtz on 19/06/17.
 */
import template from "./listaPersonal.html";
import {Empleados} from "../../../../../../api/empleados/collection";

class ListaPersonal {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.tiendaId = $stateParams.tiendaId;
        this.subscribe('empleados.porTienda', ()=> [{tiendaId: this.tiendaId}]);

        this.helpers({
            empleados(){
                return Empleados.find({tiendaId: this.tiendaId});
            }
        });

    }
}

const name = 'listaPersonal';

// create a module
export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: ListaPersonal
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.tienda.admon.personal.lista', {
            url: '/lista',
            template: '<lista-personal></lista-personal>'
        });
}