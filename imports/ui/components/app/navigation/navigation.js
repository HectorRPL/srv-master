/**
 * Created by Héctor on 09/02/2017.
 */
import template from "./navigation.html";

class Navigation {
    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.$state = $state;
    }
}

const name = 'navigation';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: Navigation
    });

