import {Navigate, Outlet} from 'react-router-dom';

function ProtectedRoute({redirectPath = '/', isAuth}) {
	if (!isAuth) {
		return <Navigate to={redirectPath} replace={true}/>;
	}
	return <Outlet/>;
}

export default ProtectedRoute
