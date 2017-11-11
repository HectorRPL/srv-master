/**
 * Created by Héctor on 11/11/2017.
 */
import {Marcas} from "../../../../../../api/catalogos/marcas/collection";
import {borrarMarcaProveedor} from "../../../../../../api/catalogos/marcasProveedores/methods";
import utilsPagination from "angular-utils-pagination";
import {name as Alertas} from "../../../../comun/alertas/alertas";
import template from "./listaMarcasProveedores.html";

class ListaMarcasProveedores {
    constructor($scope, $reactive, $stateParams) {
        'ngInject';
        $reactive(this).attach($scope);
        this.proveedorId = $stateParams.proveedorId;

        this.perPage = 10;
        this.page = 1;


        this.subscribe('marcas.todas', () => [{_id: {$in: this.getReactively('marcasId')}}, {
            limit: parseInt(this.perPage),
            skip: parseInt((this.getReactively('page') - 1) * this.perPage)
        }]);
        this.helpers({
            marcas(){
                return Marcas.find({});
            }
        });
    }
    quitarMarca(marca) {
        let datos = {
            proveedorId: this.proveedorId,
            marcaId: marca._id
        };
        console.log(datos);
        borrarMarcaProveedor.callPromise(datos)
            .then(this.$bindToContext((result) => {
                this.tipoMsj = 'success';
            }))
            .catch(this.$bindToContext((err) => {
                console.log(err);
                this.msj = err.reason;
                this.tipoMsj = 'danger';
            }));
    }
}

const name = 'listaMarcasProveedores';

export default angular
    .module(name, [
        utilsPagination,
        Alertas
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: ListaMarcasProveedores,
        bindings: {
            marcasId: '<'
        }
    });