const routes = require('express').Router();
const multer = require('multer');
const multerConfig =  require('./config/multer');
const checkupController = require('./controllers/checkupController');
const informationController = require('./controllers/informationController');
const complaintController = require('./controllers/complaintController');


routes.post("/checkups", checkupController.create);
routes.put("/checkups/:idCheckup", checkupController.validity);
routes.get("/checkups", checkupController.listUser);
routes.get("/checkups/adm", checkupController.listAdm);
routes.delete("/checkups/:id", checkupController.delete);

routes.post("/informations", multer(multerConfig).single('file'), informationController.create);
routes.get("/informations", informationController.list);
routes.delete("/informations/:id/:keyMidia", informationController.delete);

routes.post("/complaints", complaintController.create);
routes.get("/complaints", complaintController.list);
routes.delete("/complaints/:id", complaintController.delete);

module.exports = routes;