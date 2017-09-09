/**
 * Created by Héctor on 18/07/2017.
 */
import template from "./desactivarProducto.html";
import {name as Alertas} from "../../../../comun/alertas/alertas";
import {name as RadioDesactivar} from "../../../../comun/radio/radioDesactivar/radioDesactivar";
// import {cambiosProductoActivar} from "../../../../../../api/catalogos/marcas/methods";
// import {Productos} from "../../../../../../api/catalogos/marcas/collection";

class DesactivarProducto {
    constructor($scope, $reactive, $state, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        this.$state = $state;
        $reactive(this).attach($scope);

        this.propietarioId = $stateParams.productoId;

        this.tipoMsj = '';

        /*
        this.subscribe('productos.todos', () => [{_id: this.propietarioId}]);
        this.helpers({
            producto(){
                return Productos.findOne({_id: this.propietarioId});
            }
        });
        */
    }

    editar() {
        this.ocultarBoton = true;
    }

    limpiarCampos(desactivarProductoFrm) {
        this.datos = {};
        desactivarProductoFrm.$setPristine();
    }

    desactivar(desactivarProductoFrm) {
        this.datos._id = this.propietarioId;

        /*
        cambiosProductoActivar.callPromise(this.datos).then(this.$bindToContext(() => {
            this.tipoMsj = 'success';
            this.limpiarCampos(desactivarProductoFrm);
        })).catch(this.$bindToContext((err)=>{
            this.tipoMsj = 'danger';
        }));
        */
    }

}

const name = 'desactivarProducto';

export default angular
    .module(name, [
        Alertas,
        RadioDesactivar
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: DesactivarProducto
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.marcas.admon.editar.desactivar', {
            url: '/desactivar',
            template: '<desactivar-producto></desactivar-producto>'
        });
}
