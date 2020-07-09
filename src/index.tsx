import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import store from '@store/index';
import zhCN from 'antd/es/locale/zh_CN';
import NoMatch from '@pages/404';
import routes from './routes';
import '@styles/normalize.less';
import '@styles/global.less';
import lazyLoad from '@utils/lazyLoad';

const App: FC = () => {
	return (
		<ConfigProvider locale={zhCN}>
			<Provider store={store}>
				<Router>
					<div>
						<Switch>
							{routes.map(item => {
								return (
									<Route key={item.link} path={item.link} component={lazyLoad(item.path)} exact />
								);
							})}
							<Route component={NoMatch} />
						</Switch>
					</div>
				</Router>
			</Provider>
		</ConfigProvider>
	);
};

ReactDOM.render(<App />, document.getElementById('app'));
