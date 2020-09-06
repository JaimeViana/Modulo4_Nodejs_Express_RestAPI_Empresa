const router = require('express').Router();

//requerimos los ficheros hacia los que vamos a delegar la gestión de rutas
const apiEmpleadosRouter = require('./api/empleados');
const apiDepartamentosRouter = require('./api/departamentos');

//delegamos la gestión de las rutas
router.use('/empleados', apiEmpleadosRouter);
router.use('/departamentos', apiDepartamentosRouter);

module.exports = router;