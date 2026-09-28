import './Authorization.scss';

export default function Authorization({idInstance, setIdInstance, apiTokenInstance, setApiTokenInstance, login}) {

	const isFilled = () => {
		const defaultClass = "authentication__btn"

		if(!idInstance || !apiTokenInstance) return `${defaultClass} disabled`;

		return defaultClass;
	}
	return (
		<div className='authentication'>
			<img className="authentication__logo" src="https://irkutsk.expert-tk.ru/assets/mgr/images/biglogofab6eaa89b.png" alt="logo"/>
			<div className='authentication__menu'>
				<div className='authentication__title'>Авторизация</div>
				<div className='authentication__input'>
					<input value={idInstance} onChange={e => setIdInstance(e.target.value)} required name="idInstance" type="text"></input>
					<label className='authentication__label'>Ваш "idInstance"</label>
				</div>
				<div className='authentication__input'>
					<input value={apiTokenInstance} onChange={e => setApiTokenInstance(e.target.value)} required name="apiTokenInstance" type="text"></input>
					<label className='authentication__label'>Ваш "apiTokenInstance"</label>
				</div>
				<button onClick={login} className={isFilled()}>Войти</button>
			</div>
		</div>
	);
}