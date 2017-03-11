/**
 * Created by jvltmtz on 10/03/17.
 */
import "./empleados.html";
//import {Tiendas} from "../../../../api/catalogos/empleados/collection";
import {Tiendas} from "../../../../api/catalogos/tiendas/collection";
import {name as TituloPrincipal} from '../../comun/tituloPrincipal/tituloPrincipal';

class EmpleadosClass {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Tiendas';
        this.tiendaId = $stateParams.tiendaId;
        this.subscribe('tiendas.seleccionada', ()=> [{_id: this.tiendaId}]);

        this.helpers({
            tienda(){
                return Tiendas.findOne({_id: this.tiendaId});
            },
            empledados(){
              return;
            },
        });
    }


}

const name = 'empleados';

// create a module
export default angular
    .module(name, [
        TituloPrincipal,
    ])
    .component(name, {
        templateUrl: `imports/ui/components/tiendas/${name}/${name}.html`,
        controllerAs: name,
        controller: EmpleadosClass
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.empleados', {
            url: ':tiendaId/empleados',
            template: '<empleados></empleados>'
        });
}