const express = require('express');
const fs = require('fs');
const app = express();
const port = 3001;

// middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

// metodos get
app.get('/',(req,res)=>{
    res.send('hola desde express');
})


app.get('/unicosta',(req,res)=>{
    res.send('hola desde la pagina de la universidad de la costa')
})

app.listen(port,()=>{console.log(`app ejecutandoce en el puerto ${port}`)})


// metodos post

app.post('/formulario',(req,res)=>{
    console.log(req.body)
    const { id,nombre, apellido,titulo,Autor,Editorial,ano} = req.body;
    if (!id || !nombre || !apellido || !titulo || !Autor || !Editorial || !ano) {
        return res.redirect('/error.html');
    }
    // res.send(`datos enviadsos correctamente: ${nombre} ${apellido}`)
    const fecha = new Date();
    const fechaFormateada = fecha.toISOString().split('T')[0];
    const contenido = `ID: ${id}\nNombre: ${nombre}\nApellido: ${apellido}\nTitulo: ${titulo}\nAutor: ${Autor}\nEditorial: ${Editorial}\nAño: ${ano}\n\n`;
    const nombreArchivo = `${id}_reservado_${fechaFormateada}.txt`;
    
    fs.writeFile(`data/${nombreArchivo}`, contenido, (err) => {
        if (err) {
            console.error('Error al escribir el archivo:', err);
            return res.redirect('/error.html');
        }
        console.log('Archivo creado:', nombreArchivo);
        res.download(`data/${nombreArchivo}`, nombreArchivo, (err) => {
            if (err) {
                console.error('Error al descargar el archivo:', err);
                res.status(500).send('Error al descargar el archivo');
            }
        });
    });




})