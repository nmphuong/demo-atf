import React from 'react';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import './style.css';

const { Content } = Layout;
const CominSoon = () => {

    return (
        <Content className="page-container cusIconPlaned">
            <div className="comin-soon-content">
                <div className="comin-soon-title">Coming Soon</div>
            </div>
        </Content>
    );
};

export default CominSoon;
