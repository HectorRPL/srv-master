/**
 * Created by jvltmtz on 12/05/17.
 */
import {TiposSociedades} from "../../../../../api/catalogos/tipoSociedades/collection";
import "./elegirTipoSociedad.html";

class ElegirTipoSociedad {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.subscribe('tiposSociedades.todo');

        this.helpers({
            abreviaturas() {
                return TiposSociedades.find();
            }
        });

    }
}

const name = 'elegirTipoSociedad';

// create a module
export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/comun/selects/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            tiposociedad: '=',
        },
        controller: ElegirTipoSociedad
    });
