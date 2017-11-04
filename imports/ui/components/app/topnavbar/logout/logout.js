import {Meteor} from "meteor/meteor";
import template from "./logout.html";

class Logout {
    constructor($scope, $reactive, $state) {
        'ngInject';
        $reactive(this).attach($scope);
        this.state = $state;
        this.error = '';

    }

    salir() {
        this.error = '';
        Meteor.logout(
            this.$bindToContext((err) => {
                if (err) {
                    this.error = err;
                } else {
                    this.state.go('login');
                }
            })
        );
    }
}

const name = 'logout';

export default angular
    .module(name, [])
    .component(name, {
        template: template.default,
        controllerAs: name,
        controller: Logout
    });
