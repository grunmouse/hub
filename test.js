var assert = require('assert');
var Hub = require('./index.js');
var sinon = require('sinon');
describe('Hub Test', function(){
    describe('Hub Implementation', function() {
        var hub = new Hub();

        it('Hub creation ok', ()=>{
			assert.ok(hub);
		});
		
		describe('sub unsub component', ()=>{
			var component = {

			};
			let callback = function(event, data) {
				it('callback arguments', ()=>{
					assert.equal(event, 'event.name');
					assert.ok(data == component);
				})
			};
			let spy = sinon.spy(callback);

			var unsub = hub.sub('event.name', spy);
			hub.pub('event.name', component);
			it('call is ok', ()=>{
				assert.ok(spy.called);
			});
			unsub();
			
			it('unsub is ok', ()=>{
				hub.pub('event.name', component);
				assert.ok(spy.calledOnce);
			});
			
			var callback2 = function(event, data) {
				assert.ok(true, 'Callback2 works');
			},
			callback3 = function() {
				assert.ok(false, 'Callback3 works');
			};

			var unsub2 = hub.sub('event.name', callback2),
				unsub3 = hub.sub('event.name', callback3);

			unsub3();

			it('callback2 no callback3', ()=>{
				hub.pub('event.name');
			});

			unsub2();
		});

    });

    describe("No sub test", function() {
        it('Pub works without any sub on this event.', ()=>{
			var hub = new Hub(), isThrown = false;

			try {
				hub.pub("ololo");
			}
			catch (e) {
				isThrown = true;
				throw e;
			}

			assert.ok(!isThrown);
		})
    });


});