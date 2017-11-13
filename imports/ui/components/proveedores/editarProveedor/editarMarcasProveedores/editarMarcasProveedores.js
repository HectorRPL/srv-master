/**
 * Created by Héctor on 10/11/2017.
 */
import {MarcasProveedores}              from "../../../../../api/catalogos/marcasProveedores/collection";
import {actlizrMarcsProvdrs}            from "../../../../../api/catalogos/marcasProveedores/methods";
import {name as BuscarMarca}            from "../../../comun/busquedas/buscarMarca/buscarMarca";
import {name as ListaMarcasProveedores} from "./listaMarcasProveedores/listaMarcasProveedores";
import {name as Alertas}                from "../../../comun/alertas/alertas";
import template                         from "./editarMarcasProveedores.html";

class EditarMarcasProveedores {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        this.$scope = $scope;
        $reactive(this).attach($scope);

        this.proveedorId = $stateParams.proveedorId;

        this.tipoMsj = '';

        this.subscribe('marcasProveedores.lista', () => [{proveedorId: this.proveedorId}]);
        this.helpers({
            marcasProveedor(){
                return MarcasProveedores.findOne({proveedorId: this.proveedorId});
            }
        });
    }

    aniadirMarca() {
        let datos = {
            proveedorId: this.proveedorId,
            marcaId: this.marcaSelec._id
        };
        console.log('datos que vamos a enviar para añadir la marca a un provedor', datos);
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
        BuscarMarca,
        ListaMarcasProveedores,
        Alertas
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