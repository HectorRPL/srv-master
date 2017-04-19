/**
 * Created by Héctor on 14/04/2017.
 */
import "./personal.html";
import {Tiendas} from "../../../../../api/catalogos/tiendas/collection";
import {Empleados} from "../../../../../api/empleados/collection";
import {name as AgregarEmpleado} from './agregarEmpleado/agregarEmpleado';

class Personal {
    constructor($scope, $reactive, $state, $uibModal, $stateParams) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Tiendas';
        this.tiendaId = $stateParams.tiendaId;
        this.$uibModal = $uibModal;
        this.subscribe('tiendas.seleccionada', ()=> [{_id: this.tiendaId}]);
        this.subscribe('empleados.porTienda', ()=> [{tiendaId: this.tiendaId}]);

        this.helpers({
            tienda(){
                return Tiendas.findOne({_id: this.tiendaId});
            },
            empleados(){
                return Empleados.find({tiendaId: this.tiendaId});
            }
        });

    }

    modalAgregar() {
        const tiendaId = this.tiendaId;
        var modalInstance = this.$uibModal.open({
            animation: true,
            component: 'AgregarEmpleado',
            backdrop: 'static',
            size: 'md',
            keyboard: true,
            resolve: {
                tiendaId: function () {
                    return tiendaId;
                }

            }
        });
    }

}

const name = 'personal';

// create a module
export default angular
    .module(name, [
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
        .state('app.tienda.personal', {
            url: '/:tiendaId/personal',
            template: '<personal></personal>'
        });
}