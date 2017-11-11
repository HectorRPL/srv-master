/**
 * Created by Héctor on 10/11/2017.
 */
import {actlizrMarcsProvdrs} from "../../../../../api/catalogos/marcasProveedores/methods";
import {name as Alertas} from "../../../comun/alertas/alertas";
import {name as BuscarMarca} from "../../../comun/busquedas/buscarMarca/buscarMarca";
import template from "./editarMarcasProveedores.html";

class EditarMarcasProveedores {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this.proveedorId = $stateParams.proveedorId;

        this.tipoMsj = '';
        this.marcaSelec = '';
    }

    aniadirMarca() {
        let datos = {
            proveedorId: this.proveedorId,
            marcaId: this.marcaSelec._id
        };
        actlizrMarcsProvdrs.callPromise(datos)
            .then(this.$bindToContext(() => {
                this.tipoMsj = 'success';
            }))
            .catch(this.$bindToContext((err) => {
                this.tipoMsj = 'danger';
            }));
    }
}

const name = 'editarMarcasProveedores';

export default angular
    .module(name, [
        Alertas,
        BuscarMarca
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: EditarMarcasProveedores
    })
    .config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app.proveedores.editar.marcas', {
            url: '/marcas',
            template: '<editar-marcas-proveedores></editar-marcas-proveedores>'
        });
}