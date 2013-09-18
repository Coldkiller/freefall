exports.install = function(framework) {
	framework.route('/register', view_registration);
	framework.route('/register', json_registration, ['post']);
};

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