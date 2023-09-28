const path = require('path');
const strings = require('../../../pkg/strings');

const upload = async (req, res) => {
	const { file } = req.files;
	let fileTypes = [
		'image/png',
		'image/jpg',
		'image/pjpeg',
		'image/jpeg',
		'image/gif',
	];
	let maxFileSize = 1024 * 1024;

	if (!fileTypes.includes(file.mimetype)) {
		return res.status(400).send('Not supported file type');
	}

	if (maxFileSize < file.size) {
		return res.status(400).send('Max file size is 1mb.');
	}

	let newFileName = `${strings.rng(10)}_${file.name}`;

	// const uploadsPath = path.join(__dirname, '/../../../uploads/');

	let fileLocation = `${__dirname}/../../../uploads/${newFileName}`;
	await file.mv(fileLocation);
	res.status(201).send({ fileName: newFileName });
};

const download = async (req, res) => {
	let filePath = `${__dirname}/../../../uploads/${req.params.file}`;
	return res.download(filePath, req.params.file.split('_')[1]);
};

module.exports = {
	upload,
	download,
};
