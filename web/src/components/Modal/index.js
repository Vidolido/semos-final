import { useAuth } from '../../hooks/useAuth';
import { useEvents } from '../../hooks/useEvents';

const Modal = ({ modalOptions, setModalOptions, setIsDeleted }) => {
	const resetModal = {
		show: false,
		message: '',
		action: '',
		button: '',
		id: '',
	};

	const { changeAccountType, deleteAccount, isDeleted } = useAuth();
	const { deleteEvent } = useEvents();

	const handleCancel = () => {
		setModalOptions(resetModal);
	};
	const handleClick = () => {
		switch (modalOptions.action) {
			case 'deleteEvent':
				const deletedEvent = deleteEvent(modalOptions.id);
				setModalOptions(resetModal);
				if (deletedEvent) {
					setIsDeleted(true);
				}
				break;
			case 'deleteUser':
				const deletedUser = deleteAccount(modalOptions.id);
				setModalOptions(resetModal);
				if (deletedUser) {
					setIsDeleted(true);
				}
				break;
			case 'updateUser':
				changeAccountType(modalOptions.id).then((res) => {
					res === true && setIsDeleted(true);
				});

				setModalOptions(resetModal);
				break;
			default:
				return;
		}
	};
	return (
		<div className='modal'>
			<div>
				<h1>Are you sure?</h1>
				<p>
					{`${modalOptions.message}Pleace proceed with
					caution.`}
				</p>
			</div>
			<div className='buttons flex gap-20'>
				<button className='btn-blackToTransparent' onClick={handleCancel}>
					Cancel
				</button>
				<button
					className='btn-blackToTransparent'
					onClick={handleClick}
					disabled={isDeleted === true && 'disabled'}>
					{modalOptions.button}
				</button>
			</div>
		</div>
	);
};

export default Modal;
