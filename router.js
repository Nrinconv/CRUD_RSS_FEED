const express = require('express');
const router = express.Router();

const connection = require('./database/db');

router.get('/', (req, res)=> {
    res.render('home');
});

router.get('/municipio', (req, res)=> {
    connection.query('SELECT * from municipio', (error, results) => {
        if(error){
            throw error;
        }else{
            res.render('municipio/municipio', {results:results});
        }
    });
});

router.get('/municipio/create', (req, res)=> {
    res.render('municipio/create_municipio');
});

router.get('/municipio/edit/:id', (req, res)=> {
    const id = req.params.id;
    connection.query('SELECT * from municipio WHERE idMunicipio=?', [id], (error, results) => {
        if(error){
            throw error;
        }else{
            res.render('municipio/edit_municipio', {municipio:results[0]});
        }
    });
});

router.get('/municipio/delete/:id', (req, res)=> {
    const id = req.params.id;
    connection.query('DELETE from municipio WHERE idMunicipio=?', [id], (error, results) => {
        if(error){
            throw error;
        }else{
            res.redirect('/municipio');
        }
    });
});

router.get('/vivienda', (req, res)=> {
    connection.query('SELECT * from vivienda inner join municipio on Municipio_idMunicipio=idMunicipio', (error, resultsVivienda) => {
        if(error){
            throw error;
        }else{
            connection.query('SELECT * from persona', (error, resultsPersona) => {
                if(error){
                    throw error;
                }else{
                    res.render('vivienda/vivienda', {resultsVivienda:resultsVivienda, resultsPersona:resultsPersona});
                }
            });
        }
    });
});

router.get('/vivienda/create', (req, res)=> {
    connection.query('SELECT * from municipio', (error, resultsMunicipio) => {
        if(error){
            throw error;
        }else{
            connection.query('SELECT * from persona', (error, resultsPersona) => {
                if(error){
                    throw error;
                }else{
                    res.render('vivienda/create_vivienda', {resultsMunicipio:resultsMunicipio, resultsPersona:resultsPersona});
                }
            });
        }
    });
});

router.get('/vivienda/edit/:id', (req, res)=> {
    const id = req.params.id;
    connection.query('SELECT * from vivienda WHERE idVivienda=?', [id], (error, results) => {
    if(error){
        throw error;
    }else{
        connection.query('SELECT * from municipio', (error, resultsMunicipio) => {
        if(error){
            throw error;
        }else{
            connection.query('SELECT * from persona', (error, resultsPersona) => {
            if(error){
                throw error;
            }else{
                res.render('vivienda/edit_vivienda', {vivienda:results[0], resultsMunicipio:resultsMunicipio, resultsPersona:resultsPersona});
            }
        });
        }
    });
    }
    });
});

router.get('/vivienda/delete/:id', (req, res)=> {
    const id = req.params.id;
    connection.query('DELETE from vivienda WHERE idVivienda=?', [id], (error, results) => {
        if(error){
            throw error;
        }else{
            res.redirect('/vivienda');
        }
    });
});

router.get('/persona', (req, res)=> {
    connection.query('SELECT * from persona inner join municipio on Municipio_idMunicipio=idMunicipio inner join vivienda on Vivienda_id_vivienda=idVivienda', (error, results)=>{
        if(error){
            throw error;
        }else{
            res.render('persona/persona', {results:results});
        }
    })
});

router.get('/persona/create', (req, res)=> {
    connection.query('SELECT * from municipio', (error, resultsMunicipio) => {
        if(error){
            throw error;
        }else{
            connection.query('SELECT * from vivienda', (error, resultsVivienda) => {
                if(error){
                    throw error;
                }else{
                    res.render('persona/create_persona', {resultsMunicipio:resultsMunicipio, resultsVivienda:resultsVivienda});
                }
            });
        }
    });
});

router.get('/persona/edit/:id', (req, res)=> {
    const id = req.params.id;
    connection.query('SELECT * from persona WHERE idPersona=?', [id], (error, results) => {
    if(error){
        throw error;
    }else{
        connection.query('SELECT * from municipio', (error, resultsMunicipio) => {
        if(error){
            throw error;
        }else{
            connection.query('SELECT * from vivienda', (error, resultsVivienda) => {
            if(error){
                throw error;
            }else{
                res.render('persona/edit_persona', {persona:results[0], resultsMunicipio:resultsMunicipio, resultsVivienda:resultsVivienda});
            }
        });
        }
    });
    }
    });
});

router.get('/persona/delete/:id', (req, res)=> {
    const id = req.params.id;
    connection.query('DELETE from persona WHERE idPersona=?', [id], (error, results) => {
        if(error){
            throw error;
        }else{
            res.redirect('/persona');
        }
    });
});

const crud = require('./controllers/crud');
router.post('/saveMunicipio', crud.saveMunicipio);
router.post('/updateMunicipio', crud.updateMunicipio);
router.post('/saveVivienda', crud.saveVivienda);
router.post('/updateVivienda', crud.updateVivienda);
router.post('/savePersona', crud.savePersona);
router.post('/updatePersona', crud.updatePersona);



module.exports = router;