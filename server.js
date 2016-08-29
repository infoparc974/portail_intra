// Mes requires
var express = require('express');
var app = express();
var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var ldap = require('ldapjs');
var https = require('https');

// -------------------------------

var fs = require('fs');

var httpsPort = 3443;
    // Setup HTTPS
    var options = {
      key: fs.readFileSync('https/my_key.pem'),
      cert: fs.readFileSync('https/final_cert.pem')
    };
    var secureServer = https.createServer(options, app).listen(httpsPort);


// --------------------------

app.set("port_https", 3443); // make sure to use the same port as above, or better yet, use the same variable
// Secure traffic only
app.all("*", function(req, res, next){
  if (req.secure) {
    return next();
  };
  res.redirect("https://"+req.hostname+":"+app.get("port_https")+req.url);
});



var salt = bcrypt.genSaltSync(10);

// Appel collection Applist
var db_applist = mongojs('smprr', ['app_list']);

// Appel collection Annuaire
var db_annuaire = mongojs('smprr', ['annuaire']);

// Appel collection Utilisateurs
var db_users = mongojs('smprr', ['users']);

// Appel collection Docs
var db_docs = mongojs('smprr', ['docs']);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true}));


// Authentification via LDAP

app.post("/login", function(req, res) {

  var token;

  var sessionData = {

    ldap: {
      url: "ldap://parc-2k8r2.parc.wan",
      dn: "CN=ask.ad,OU=Technique,OU=Parc,DC=parc,DC=wan",
      passwd: "Parc974$",
      suffix: "OU=Parc,DC=parc,DC=wan"
    },

    uname: req.body.uname,
    passwd: req.body.passwd,
    dn: "",    

    authList: {}
  };

  var adminClient = ldap.createClient({
    url: sessionData.ldap.url
  });

  adminClient.bind(sessionData.ldap.dn, sessionData.ldap.passwd, function(err) {


    if (err != null){
      res.json("Erreur"+err);
    }
    else{
      adminClient.search(sessionData.ldap.suffix, {
        scope: "sub",
        filter: "(sAMaccountName=" + sessionData.uname + ")"
      }, function(err, ldapResult) {
        if (err != null)
          res.json("Erreur"+err);
        else {
          ldapResult.on('searchEntry', function(entry) {
            sessionData.dn = entry.dn;
            sessionData.name = entry.object.cn;

            var userClient = ldap.createClient({
              url: sessionData.ldap.url,
              reconnect: true
            });
            userClient.bind(sessionData.dn, sessionData.passwd, function(err) {
              if (err != null) {
                res.json("wrong_password")
              } else {
                adminClient.destroy();
                res.send(sessionData);
              };
            });
          });
          ldapResult.on("end", function() {
            if (sessionData.dn === "")
              res.send("unknow_user");
          });
        };
      })
    }
  });
});







// Recup IP

app.get('/monIP', function(req,res){

  var ip = req.connection.remoteAddress;


  if (ip.length < 15){   
    ip = ip;
  }else{
    var nyIP = ip.slice(7);
    ip = nyIP;
  }
  res.json(ip);

});


// CRUD sur collection Docs
app.get('/docs', function (req, res) {

  db_docs.docs.find(function (err, docs) {
    res.json(docs);
  });
});

app.post('/doc', function (req, res) {
  db_docs.docs.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/doc/:id', function (req, res) {
  var id = req.params.id;
  db_docs.docs.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/doc/:id', function (req, res) {
  var id = req.params.id;
  db_docs.docs.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/doc/:id', function (req, res) {
  var id = req.params.id;
  db_docs.docs.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: 
    {
      $set: 
      {
        nom: req.body.nom, 
        href: req.body.href, 
        img: req.body.img
      }
    },
    new: true}, function (err, doc) {
      res.json(doc);
    }
    );
});




// CRUD sur collection App
app.get('/item', function (req, res) {

  db_applist.app_list.find(function (err, docs) {
    res.json(docs);
  });
});

app.post('/item', function (req, res) {
  db_applist.app_list.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/item/:id', function (req, res) {
  var id = req.params.id;
  db_applist.app_list.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/item/:id', function (req, res) {
  var id = req.params.id;
  db_applist.app_list.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/item/:id', function (req, res) {
  var id = req.params.id;
  db_applist.app_list.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: 
    {
      $set: 
      {
        nom: req.body.nom, 
        href: req.body.href, 
        img: req.body.img
      }
    },
    new: true}, function (err, doc) {
      res.json(doc);
    }
    );
});

// CRUD sur collection Annuaire
app.get('/contact', function (req, res) {

  db_annuaire.annuaire.find(

    function (err, docs) {
      res.json(docs);
    });
});

app.post('/contact', function (req, res) {
  db_annuaire.annuaire.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/contact/:id', function (req, res) {
  var id = req.params.id;
  db_annuaire.annuaire.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/contact/:id', function (req, res) {
  var id = req.params.id;
  db_annuaire.annuaire.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/contact/:id', function (req, res) {
  var id = req.params.id;
  db_annuaire.annuaire.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: 
    {
      $set: 
      {
        nom: req.body.nom, 
        prenom: req.body.prenom, 
        fonction: req.body.fonction,
        telephone: req.body.telephone,
        poste: req.body.poste,
        gsm: req.body.gsm,
        service: req.body.service
      }
    },
    new: true}, function (err, doc) {
      res.json(doc);
    }
    );
});

// CRUD sur collection Users
app.get('/user', function (req, res) {

  db_users.users.find(function (err, docs) {
    res.json(docs);
  });
});

app.post('/user', function (req, res) {
  req.body.password = bcrypt.hashSync(req.body.password, salt);
  db_users.users.insert(req.body, function(err, doc) {
    res.json(doc);
  });
});

app.delete('/user/:id', function (req, res) {
  var id = req.params.id;
  db_users.users.remove({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.get('/user/:id', function (req, res) {
  var id = req.params.id;
  db_users.users.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/user/:id', function (req, res) {
  var id = req.params.id;
  db_users.users.findAndModify({
    query: {_id: mongojs.ObjectId(id)},
    update: 
    {
      $set: 
      {
        nom: req.body.nom, 
        username: req.body.username, 
        password: req.body.password, 
        role: req.body.role,
        email: req.body.email
      }
    },
    new: true}, function (err, doc) {
      res.json(doc);
    }
    );
});



app.listen(80);

console.log("Server running on port 80");

