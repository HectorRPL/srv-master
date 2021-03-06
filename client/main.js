import angular from "angular";
import angularMeteor from "angular-meteor";
import oclazyload from "oclazyload";
import uiRouter from "angular-ui-router";
import angularUBoostrap from "angular-ui-bootstrap";
import angularMessages from "angular-messages";
import "angular-i18n/angular-locale_es-mx";
import "./stylesheets/animate.css";
import "jquery/dist/jquery";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import {name as App} from "../imports/ui/components/app/app";
import {name as Login} from "../imports/ui/components/login/login";

class Main {}

const name = 'main';

export default angular
    .module('app-master', [
        angularMeteor,
        angularUBoostrap,
        oclazyload,
        uiRouter,
        App,
        Login,
        angularMessages
    ])
    .config(config);
function config($locationProvider, $urlRouterProvider, $stateProvider) {
    'ngInject';
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/login');
}

