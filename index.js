class Hub {
	constructor(){
		this._callbacks = {};
		this._uid=0;
	}
	
	sub(event, cb) {
		var me = this, callbacks = me._callbacks,
			list = callbacks[event],
			uid = me._uid++;
		if(list === undefined) {
			callbacks[event] = list = new Map();
		}

		list.set(uid, cb);

		return function() {
			list.delete(uid);
		}
	}

	pub(event, data) {
		var list = this._callbacks[event],
			name,
			invoker = (item)=>(item(event, data));
		
		list && list.forEach(invoker);
	}
}

module.exports = Hub;