var utils = require('partial.js/utils');
var mail = require('partial.js/mail');
exports.install = function(framework) {
	framework.route('/', vista_inicio);
	framework.route('/vista_about/', vista_about);
	framework.route('/vista_referencias/', vista_referencias);
	framework.route('/vista_contacto/', vista_contacto);
	framework.route('/vista_contacto/', post_contacto, ['post', 'xhr']);
	framework.route('/register', view_registration);
	framework.route('/register', json_registration, ['post']);
};


function vista_inicio() {
	var self = this;
	self.view('inicio');
}

function vista_about() {
	var self = this;
	self.view('about');
}

function vista_referencias() {
	var self = this;
	self.view('referencias');
}

function vista_contacto() {
	var self = this;
	self.view('contacto', {
		Email: '@'
	});
}
// Post para contacto

function post_contacto() {
	var self = this;
	var model = utils.reduce(self.post, {
		Nombre: String,
		Email: String,
		Mensaje: String,
	});

	var validacion = self.validate(model, ['Nombre', 'Email', 'Mensaje'], 'form-');

	if (validacion.hasError()) {
		self.json(validacion);
		return;
	}

	model.DateCreated = new Date();
    // Guardar en la base de datos
    self.database('contacto').insert(model);
    
    // Remplazar nueva linea
    model.Message = model.Message.htmlEncode.replace(/\n/g, '<br />');

    // leer plantilla para el emaiil y el render de la cadena
    var template = self.view('email/contacto', model, true);
    
    //crear mensaje
    var messege = new mailMessege('Formulario de contacto', template);
    message.to(self.config['mail']);
    message.reply(model.Email);

    messege.sender(self.config['mail'], self.cnfig['name']);
    message.send('smtp.gmail.com', {
    	port: 465,
    	secure: true,
    	user: 'Tu_gmail',
    	password: 'Tu_password'
    });
}

function view_registration() {
	var self = this;

	self.repository.title = 'Registration';

	var model = {
		type: 0,
		name: '',
		email: '@',
		password: '',
		phone: '+52',
		country: 'DF',
		terms: true
	};

	self.repository.country = ['', 'AS', 'BC', 'BS', 'CC', 'CS', 'CH', 'CL', 'CM', 'DF', 'DG', 'GT', 'GR', 'HG', 'JC'];
	self.repository.type = [{
		id: 0,
		name: ''
	}, {
		id: 1,
		name: 'Periodismo'
	}, {
		id: 2,
		name: 'Humor/Entretenimento'
	}, {
		id: 3,
		name: 'Educativo'
	}, {
		id: 4,
		name: 'Deportes'
	}, {
		id: 5,
		name: 'Otro'
	}];

	self.view('registration', model);
}

// THIS IS BAD EXAMPLE (SEND FORM VIA XHR)
// METHOD: POST

function json_registration() {
	var self = this;

	self.repository.country = ['', 'AS', 'BC', 'BS', 'CC', 'CS', 'CH', 'CL', 'CM', 'DF', 'DG', 'GT', 'GR', 'HG', 'JC'];
	self.repository.type = [{
		id: 0,
		name: ''
	}, {
		id: 1,
		name: 'Periodismo'
	}, {
		id: 2,
		name: 'Humor/Entretenimento'
	}, {
		id: 3,
		name: 'Educativo'
	}, {
		id: 4,
		name: 'Deportes'
	}, {
		id: 5,
		name: 'Otro'
	}];

	self.repository.isSuccess = true;
	self.view('registration', self.post);
}