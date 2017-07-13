/**
 * Created by jvltmtz on 3/07/17.
 */
import template from "./confirmarAplicarFactor.html";

class ConfirmarAplicarFactor {

    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
        this.titulo = 'Confirmar aplicar factor';
        this.tipoMsj = 'warning';
        this.msj = 'Al aplicar un factor, uno o varios productos podrian verse afectados en sus precios.\n ¿Desea continuar con el proceso?';
    }

    aceptar() {
        this.modalInstance.close(true);
    }

    cerrar() {
        this.modalInstance.dismiss('Cancelado');
    }
}

const name = 'confirmarAplicarFactor';

export default angular
    .module(name, [])
    .component(name, {
        template,
        controllerAs: name,
        controller: ConfirmarAplicarFactor,
        bindings: {
            close: '&',
            dismiss: '&',
            modalInstance: '<',
            resolve: '<'
        }
    });