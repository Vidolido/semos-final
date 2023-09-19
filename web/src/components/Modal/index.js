const Modal = ({ modalOptions, setModalOptions }) => {
	const handleClick = () => {
		console.log('CLICKED');
		setModalOptions((prevState) => ({
			...prevState,
			show: false,
		}));
	};
	return (
		<div className='modal'>
			<div>
				<h1>Are you sure?</h1>
				<p>
					You are about to delete an event from the system.Pleace proceed with
					caution.
				</p>
			</div>
			<div className='buttons flex gap-20'>
				<button className='btn-blackToTransparent' onClick={handleClick}>
					Cancel
				</button>
				<button className='btn-blackToTransparent' onClick={handleClick}>
					Delete
				</button>
			</div>
		</div>
	);
};

export default Modal;
