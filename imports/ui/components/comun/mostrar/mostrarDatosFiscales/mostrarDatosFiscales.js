/**
 * Created by Héctor on 18/07/2017.
 */
import template from "./mostrarDatosFiscales.html";
import {DatosFiscales} from "../../../../../api/datosFiscales/collection";

class MostrarDatosFiscales {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);


        this.subscribe('datosFiscales.proveedor', () => [{propietarioId: this.getReactively('propietarioId')}]);
        this.helpers({
            datosFiscales(){
                return DatosFiscales.findOne({propietarioId: this.getReactively('propietarioId')});
            }
        });
    }
}

const name = 'mostrarDatosFiscales';

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: MostrarDatosFiscales,
        bindings: {
            propietarioId: '<',
            tiendaMatriz: '<'
        }
    });