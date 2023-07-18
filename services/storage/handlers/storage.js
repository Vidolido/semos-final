const strings = require('../../../pkg/strings');
// во request-от да праќам некакво ID за да ја разликува сликата доколку има повеќе event-и со исто име.
// ако не постои патека /uploads не ја креира, треба со fs на windows
const upload = async (req, res) => {
	// console.log(req.auth, 'vo handler');
	// console.log(req.body, 'vo handler');
	const { file } = req.files;
	let fileTypes = [
		'image/png',
		'image/jpg',
		'image/pjpeg',
		'image/jpeg',
		'image/gif',
	];
	let maxFileSize = 1024 * 1024;

	// TODO: Да вратам errors како на секаде.
	if (!fileTypes.includes(file.mimetype)) {
		return res.status(400).send('Not supported file type');
	}

	if (maxFileSize < file.size) {
		return res.status(400).send('Max file size is 1mb.');
	}

	let newFileName = `${strings.rng(10)}_${file.name}`;
	await file.mv(`${__dirname}/../../../uploads/${newFileName}`);
	res.status(201).send({ fileName: newFileName });
};

const download = async (req, res) => {
	console.log(req.params, 'OVA e vo handlerot');
	let filePath = `${__dirname}/../../../uploads/${req.params.file}`;
	res.download(filePath, req.params.file.split('_')[1]);
};

module.exports = {
	upload,
	download,
};
