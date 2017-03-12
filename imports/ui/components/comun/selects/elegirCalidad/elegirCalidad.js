/**
 * Created by Héctor on 11/03/2017.
 */
import "./elegirCalidad.html";

class ElegirCalidad {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.helpers({
            calidades() {
                return this.calidades = [
                    {_id: 1, nombre: '1A'},
                    {_id: 2, nombre: '2A'},
                    {_id: 3, nombre: '3A'},
                    {_id: 4, nombre: 'PROMOCION'},
                    {_id: 5, nombre: 'SALDO'},
                ];
            }
        });

    }
}

const name = 'elegirCalidad';

// create a module
export default angular
    .module(name, [])
    .component(name, {
        templateUrl: `imports/ui/components/comun/selects/${name}/${name}.html`,
        controllerAs: name,
        bindings: {
            calidad: '='
        },
        controller: ElegirCalidad
    });
