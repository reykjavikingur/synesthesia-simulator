var audit = {
	log: log
};

function log() {
	console.log('navigator properties:');
	console.log('* userAgent:', navigator.userAgent);
	console.log('* platform:', navigator.platform);
	console.log('* language:', navigator.language);
}

module.exports = audit;