/**
 * Created by Héctor on 09/03/2017.
 */
import "./fixtures/proveedores/proveedores";
import "./fixtures/productos/helvex";
import "./fixtures/productos/daltile";
import "./fixtures/inventarios/inventarios";

Meteor.startup(function () {
/*
    if (PuestosRoles.find().count() === 0) {
        const roles = [
            {"name": "crea_factores"},
            {"name": "actu_factores"},
            {"name": "borr_factores"}
        ];

        roles.forEach((rol) => {
            Meteor.roles.insert(rol);
        });
    }
*/
});