const router = require('express').Router();
const { check, validationResult } = require('express-validator');

const { getAll, create, getById, getByDni, update, remove } = require('../../models/empleado')

router.get('/', async (req, res) => {
    try {
        const empleados = await getAll();
        res.json(empleados)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', [
    check('nombre', 'El campo nombre es obligatorio').exists(),
    check('dni', 'El campo dni es obligatorio y el formato debe ser el adecuado').matches(/(^([0-9]{8,8}\-[A-Z])|^)$/),
    check('sexo', 'El campo sexo es obligatorio').exists(),
    check('fecha_nac', 'El campo fecha_nac es obligatorio').exists(),
    check('salario', 'El campo salario es obligatorio').exists(),
    check('cargo', 'El campo cargo es obligatorio').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    try {
        req.body.fecha_inc = new Date();
        const result = await create(req.body);
        if (result['affectedRows'] === 1) {
            const nuevoEmpleado = await getById(result['insertId']);
            console.log(nuevoEmpleado);
            res.status(201).json({ success: 'Se ha insertado un nuevo empleado', empleado: nuevoEmpleado });
        } else {
            res.status(422).json({ error: 'No se ha podido insertar el empleado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
});

router.put('/', async (req, res) => {
    // res.json(req.body);
    try {
        const result = await update(req.body);
        if (result['affectedRows'] === 1) {
            res.json({ success: 'Se ha editado el empleado correctamente' });
        } else {
            res.status(422).json({ error: 'No se ha podido actualizar el empleado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }

});

router.delete('/', async (req, res) => {
    try {
        const result = await remove(req.body.id);
        if (result['affectedRows'] === 1) {
            res.json({ success: 'Se ha borrado el empleado' });
        } else {
            res.status(422).json({ error: 'No se ha podido borrar el empleado. Comprueba el ID' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

})

module.exports = router;