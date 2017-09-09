/**
 * Created by Héctor on 11/03/2017.
 */
import template from "./elegirCalidad.html";

class ElegirCalidad {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);

        this.helpers({
            calidades() {
                return this.calidades = [
                    {_id: '1A', nombre: 'PRIMERA'},
                    {_id: '2A', nombre: 'SEGUDA'},
                    {_id: '3A', nombre: 'TERCERA'},
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
        template: template.default,
        controllerAs: name,
        bindings: {
            calidad: '='
        },
        controller: ElegirCalidad
    });
