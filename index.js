// ** database **
// https://blog.logrocket.com/crud-rest-api-node-js-express-postgresql/
// https://www.luiztools.com.br/post/tutorial-de-crud-com-node-js-sequelize-e-postgresql/

// ** ejs**
// https://ejs.co/
//https://blog.logrocket.com/how-to-use-ejs-template-node-js-application/

// ** MVC **
// https://www.codecademy.com/article/mvc-architecture-for-full-stack-app

//Session
//https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/

const express = require("express");
const sessions = require("express-session");
const cookieParser = require("cookie-parser");
const NCacheStore = require("ncache-sessions")(sessions);

const usuarios = require("./models/usuarios");

const app = express();
// create store for NCache
//const store =  NCacheStore.createStore(config.ncacheStore);

// Configure session middleware
//const oneDay = 1000 * 60 * 60 * 24;
const oneDay = -1;
app.use(
  sessions({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: null },
  })
);
// cookie parser middleware
app.use(cookieParser());

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

const port = 3000;

app.set("view engine", "ejs");

//@ CREDENCIAIS
const myusername = "user";
const mypassword = "123";

// a variable to save a session
var session;

app.get("/", (req, res) =>
  (async () => {
    session = req.session;
    console.log("Valor session.userid: ", session.userid);
    console.log("Valor Cookie.menuSistema: ", req.cookies.menuSistema.menu1);
    if (!session.userid) {
      res.redirect("/login");
    } else {
      let user = await usuarios.getUsers();
      console.log("quantidade de rows:", user.length);
      res.render("pages/index", { user: user[1].name, menus:req.cookies.menuSistema.menu1 });
    }
  })()
);

app.post("/user", (req, res) => {
  if (req.body.username == myusername && req.body.password == mypassword) {
    session = req.session;
    session.userid = req.body.username;
    console.log(req.session);
    //Cria JSON para Cookie

    let menus = {
      menu1: [{ modulo:"adm100", direitos:["c","r"]}, "adm110","adm111","adm130","adm131"],
      menu2: "18",
    };
    
    res.cookie("menuSistema", menus, {expire: 0});
    res.redirect("/");
  } else {
    res.send("Invalid username or password");
  }
});

app.get("/login", (req, res) => {
  req.session.destroy();
  res.render("pages/login", {});
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
