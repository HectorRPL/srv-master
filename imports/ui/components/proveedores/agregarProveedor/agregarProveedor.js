/**
 * Created by jvltmtz on 8/03/17.
 */
/**
 * Created by jvltmtz on 8/03/17.
 */
import "./agregarProveedor.html";
import {name as Alertas} from "../../comun/alertas/alertas";

class AgregarProveedor {
    constructor($scope, $reactive, $state) {
        'ngInject';
        this.$state = $state;
        $reactive(this).attach($scope);
        this.titulo = 'Proveedores';

    }

    agregar() {

    }

}

const name = 'agregarProveedor';

// create a module
export default angular
    .module(name, [
        Alertas
    ])
    .component(name, {
        templateUrl: `imports/ui/components/proveedores/${name}/${name}.html`,
        controllerAs: name,
        controller: AgregarProveedor
    });
