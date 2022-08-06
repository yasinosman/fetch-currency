import alert from 'cli-alerts';

const info = () => {
	alert({
		type: `warning`,
		name: `DEBUG LOG`,
		msg: ``
	});

	console.log(info);
	console.log();
};

export default info;
