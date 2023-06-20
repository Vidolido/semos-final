// req.files.slika -- да пробам .slika да биде на некој начин динамично.
// во request-от да праќам некакво ID за да ја разликува сликата доколку има повеќе event-и со исто име.
// ако не постои патека /uploads не ја креира, треба со fs на windows
const upload = async (req, res) => {
	let eventId = req.eventId || 'testIme';
	let fileTypes = [
		'image/png',
		'image/jpg',
		'image/pjpeg',
		'image/jpeg',
		'image/gif',
	];
	let maxFileSize = 1024 * 1024;

	if (!fileTypes.includes(req.files.slika.mimetype)) {
		return res.status(400).send('Not supported file type');
	}

	if (maxFileSize < req.files.slika.size) {
		return res.status(400).send('Max file size is 1mb.');
	}

	let newFileName = `${eventId}_${req.files.slika.name}`;
	await req.files.slika.mv(`${__dirname}/../../../uploads/${newFileName}`);
	res.status(201).send({ filename: newFileName });
};

const download = async (req, res) => {
	let filePath = `${__dirname}/../../../uploads/${req.params.file}`;
	res.download(filePath, req.params.file.split('_')[1]);
};

module.exports = {
	upload,
	download,
};
