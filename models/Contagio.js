const { Sequelize } = require('sequelize');
const sequelize = require('../database/database');

const contagio = sequelize.define('contagio', {
    id_de_caso: { type: Sequelize.INTEGER, primaryKey: true },
    fecha_reporte_web: { type: Sequelize.DATE },
    fecha_de_notificaci_n: { type: Sequelize.DATE },
    departamento: { type: Sequelize.INTEGER },
    departamento_nom: { type: Sequelize.STRING },
    ciudad_municipio: { type: Sequelize.INTEGER },
    ciudad_municipio_nom: { type: Sequelize.STRING },
    edad: { type: Sequelize.INTEGER },
    unidad_medida: { type: Sequelize.INTEGER },
    sexo: { type: Sequelize.STRING },
    fuente_tipo_contagio: { type: Sequelize.STRING },
    ubicacion: { type: Sequelize.STRING },
    estado: { type: Sequelize.STRING },
    pais_viajo_1_cod: { type: Sequelize.STRING },
    pais_viajo_1_nom: { type: Sequelize.STRING },
    recuperado: { type: Sequelize.STRING },
    fecha_inicio_sintomas: { type: Sequelize.DATE },
    fecha_diagnostico: { type: Sequelize.DATE },
    fecha_recuperado: { type: Sequelize.DATE },
    tipo_recuperacion: { type: Sequelize.STRING },
    per_etn_: { type: Sequelize.INTEGER }
}, {
    timestamps: false
});

module.exports = contagio;