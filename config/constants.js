exports.constants = {
	// Max number of dweets per thing
	MAX_DWEETS: 500,	
	// Max payload of dweet in characters
	MAX_DWEET_SIZE: 200,
	// Time dweet will live in database
	MAX_TIME: 86400,
}

exports.messages = {
	successAddMsg: {
		thisMsg: "succeeded",
		byMsg: "dweeting",
		theMsg: "dweet"
	},

	successGetMsg: {
		thisMsg: "succeeded",
		byMsg: "getting",
		theMsg: "dweets"
	},

	error401Msg: {
		thisMsg: "failed",
		withMsg: 401,
		becauseMsg: "thing is locked"
	},

	error404Msg: {
		thisMsg: "failed",
		withMsg: 404,
		becauseMsg: "we couldn't find this"
	},

	error414Msg: {
		thisMsg: "failed",
		withMsg: 414,
		becauseMsg: "URI too long"
	},

	error500Msg: {
		thisMsg: "failed",
		withMsg: 500,
		becauseMsg: "something went wrong"	
	}
}