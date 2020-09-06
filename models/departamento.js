//método para recuperar todos los departamentos
const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM departamento', (err, rows) => {
            if (err) reject(err);
            resolve(rows)
        })
    });
}

//método para crear un nuevo departamento
const create = ({ nombre, ciudad }) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO departamento (nombre, ciudad) VALUES (?,?)', [nombre, ciudad], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

//método que recupera un departamento a partir de su ID
const getById = (pDepartamentoId) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM departamento WHERE id = ?', [pDepartamentoId], (err, rows) => {
            if (err) reject(err);
            if (rows.length !== 1) resolve(null);
            resolve(rows[0]);
        });
    });
}

//método para editar un departamento ya existente
const update = ({ nombre, ciudad, id }) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE departamento SET nombre = ?, ciudad = ? WHERE id = ?', [nombre, ciudad, id], (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
}

//método para eliminar un departamento
const remove = (pDepartamentoId) => {
    return new Promise((resolve, reject) => {
        db.query('DELETE FROM departamento WHERE id = ?', [pDepartamentoId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    getAll, create, getById, update, remove
}