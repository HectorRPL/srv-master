/**
 * Created by jvltmtz on 10/06/17.
 */
import {Inventarios} from '../../../../api/inventarios/collection'
import {Tiendas} from '../../../../api/catalogos/tiendas/collection'

if (Inventarios.find().count() === 0) {
   const tiendas = Tiendas.find();
    tiendas.forEach((tienda)=>{
        Inventarios.insert({tiendaId: tienda._id});
    });

}
