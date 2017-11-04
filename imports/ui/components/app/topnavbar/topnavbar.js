import {name as Logout} from './logout/logout';
import {name as Minimalize} from './minimalize/minimalize';
import template from "./topnavbar.html";

class Topnavbar {
    constructor($scope, $reactive) {
        'ngInject';
        $reactive(this).attach($scope);
    }
}

const name = 'topnavbar';

export default angular
    .module(name, [
        Logout,
        Minimalize
    ])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: Topnavbar
    });
