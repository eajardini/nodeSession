const mdlUsuarios = require('../models/usuarios')

const getAllUser = (req, res) => (async () => {
    let user = await mdlUsuarios.getUsers();
    console.log("quantidade de rows:", user.length);
    res.render('pages/index', { user: user[1].name })
})();

const updateUser = (request, res)  => (async () =>{
    const id = parseInt(request.body.id);
    const { name, email } = request.body
    console.log("Valor id:", id);
    let user = await mdlUsuarios.UpdateUsers(id, name, email);   
} )();

module.exports = {
    getAllUser,
    updateUser,
}