import Loadable from 'react-loadable';
import Loading from '@components/RouteLoading';

const lazyLoad = path => {
	return Loadable({
		loader: () => import(`../pages/${path}`),
		loading: Loading,
	});
};

export default lazyLoad;
