import { Spinner } from "reactstrap";

export const Loading = () => {
	return (
		<div className='col-12 mt-2'>
			<Spinner color="warning" style={{ width: '5rem', height: '5rem' }}/>
			<h3 className='text-light'>Loading . . .</h3>
		</div>
);
}