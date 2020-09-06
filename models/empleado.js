//método para recuperar todos los empleados
const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM empleados', (err, rows) => {
            if (err) reject(err)
            resolve(rows);
        })
    });
}

//método para crear un nuevo empleado
const create = ({ nombre, dni, sexo, fecha_nac, fecha_inc, salario, cargo }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO empleados (nombre, dni, sexo, fecha_nac, fecha_inc, salario, cargo) VALUES (?,?,?,?,?,?,?)', [nombre, dni, sexo, fecha_nac, fecha_inc, salario, cargo], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

//método que recupera un empleado a través de su ID
const getById = (pEmpleadoId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM empleados WHERE id = ?', [pEmpleadoId], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        });
    });
}

//método que recupera un empleado a través de su DNI (para, con custom-validator, comprobar si ya está en la BD)
const getByDni = (pEmpleadoDni) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM empleados WHERE dni = ?', [pEmpleadoDni], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        });
    });
}

//método para editar un empleado ya existente
const update = ({ nombre, dni, sexo, fecha_nac, fecha_inc, salario, cargo, id }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE empleados SET nombre = ?, dni = ?, sexo = ?, fecha_nac = ?, fecha_inc = ?, salario = ?, cargo = ? WHERE id = ?', [nombre, dni, sexo, fecha_nac, fecha_inc, salario, cargo, id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

//método para eliminar un empleado
const remove = (pEmpleadoId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM empleados WHERE id = ?', [pEmpleadoId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    getAll, create, getById, getByDni, update, remove,
}