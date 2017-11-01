/**
 * Created by Héctor on 09/02/2017.
 */
import "metismenu/dist/metisMenu.js";
import {name as CapitalizarInputs} from "../directives/capitalizarInputs/capitalizarInputs";
import {name as Navigation} from "./navigation/navigation";
import {name as Topnavbar} from "./topnavbar/topnavbar";
import {name as ProveedoresClass} from "../proveedores/proveedores";
import {name as TiendasClass} from "../tiendas/tiendas";
import {name as Marcas} from "../marcas/marcas";
import template from "./app.html";

class App {
    constructor() {
        this.userName = 'Example user';
        this.helloText = 'Welcome in SeedProject';
        this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';

    }
}

const name = 'app';

export default angular
    .module(name, [
        CapitalizarInputs,
        Navigation,
        Topnavbar,
        ProveedoresClass,
        TiendasClass,
        Marcas
    ]).component(name, {
        template: template.default,
        controllerAs: name,
        controller: App
    }).config(config);

function config($stateProvider) {
    'ngInject';
    $stateProvider
        .state('app', {
            url: '/app',
            template: '<app></app>',
            abstract:true
        });
};