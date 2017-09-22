describe('Session Service', function() {

	beforeEach(module('myApp'));

	var session;

	beforeEach(inject(function(_session_) {
		session = _session_;
	}));

	it('Should create and destroy session', function() {

		// Create
		spyOn(session, 'create').and.callThrough();
		session.create('Emma', 'host', 'adsfjasdlkjfaslkdf');
		expect(session.create).toHaveBeenCalled();
		expect(session.create.calls.count()).toBe(1);

		expect(session.user).toBe('Emma');
		expect(session.role).toBe('host');
		expect(session.token).toBe('adsfjasdlkjfaslkdf');

		// Destroy
		spyOn(session, 'destroy').and.callThrough();
		session.destroy();
		expect(session.destroy).toHaveBeenCalled();
		expect(session.destroy.calls.count()).toBe(1);

		expect(session.user).toBeFalsy();
		expect(session.role).toBeFalsy();
		expect(session.token).toBeFalsy();
	});
});