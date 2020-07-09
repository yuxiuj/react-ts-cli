import React, { FC } from 'react';
import { Button } from 'antd';
import styles from './index.less';

const Home: FC = () => {
	return (
		<div className={styles['home-wrapper']}>
			<Button type="primary">点击</Button>
		</div>
	);
};

export default Home;
