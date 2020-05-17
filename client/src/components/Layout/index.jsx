import React, {useState, useEffect} from 'react';
import {useLocation, useHistory} from 'react-router-dom';

import {LoginOutlined, UserOutlined} from '@ant-design/icons';
import {Layout as AntLayout, Menu, Breadcrumb, Dropdown} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {getUser} from '~/src/selectors';
import {getSafe} from '~/src/utils';
import {logout} from '~/src/reducers/user';

const {Header, Content, Footer} = AntLayout;

const Layout = ({children}) => {
    const [breadCrumbs, setBreadCrumbs] = useState([]);

    const location = useLocation();
    const history = useHistory();
    const user = useSelector(getUser);
    const dispatch = useDispatch();

    useEffect(() => {
        const breadCrumbs = location.pathname.split('/').filter(Boolean);

        setBreadCrumbs(breadCrumbs);
    }, [location]);

    const handleMenuClick = ({key}) => {
        switch (key) {
            case 'about': {
                history.push(`/user/${user._id}`);
                break;
            }
            case 'logout': {
                dispatch(logout());
                break;
            }
            case 'login': 
            case 'signup': {
                history.push(`/${key}`);
                break;
            }
        }
    };

    const onSelectMenu = (selected) => {
        if (history.location.pathname !== selected.key) {
            history.push(selected.key);
        }
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="about" icon={<UserOutlined />}>
                About me
            </Menu.Item>
            <Menu.Item key="logout" icon={<LoginOutlined />}>
                Log out
            </Menu.Item>
        </Menu>
    );

    const logMenu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="login" icon={<UserOutlined />}>
                Log in
            </Menu.Item>
            <Menu.Item key="signup" icon={<LoginOutlined />}>
                Sign up
            </Menu.Item>
        </Menu>
    );

    const onClickDropdownLog = () => {
        handleMenuClick({key: '/login'});
    };

    return (
        <>
            <AntLayout>
                <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                    {/* <div className="logo" /> */}
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['/blog']} onSelect={onSelectMenu}>
                        <Menu.Item key="/blog">Home</Menu.Item>
                        <Menu.Item key="/blog/my-blog">My Blog</Menu.Item>
                    </Menu>
                    {getSafe(() => user.isLoggedIn) ? (
                        <Dropdown.Button className="dropdown-user" overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>
                            {user.email}
                        </Dropdown.Button>
                    ) : (
                        <Dropdown.Button onClick={onClickDropdownLog} className="dropdown-user" overlay={logMenu} placement="bottomCenter" icon={<UserOutlined />}>
                            Sign in
                        </Dropdown.Button>
                    )}
                </Header>
                <Content className="site-layout" style={{padding: '0 50px', marginTop: 64}}>
                    <Breadcrumb style={{margin: '16px 0'}}>
                        {Array.isArray(breadCrumbs) && breadCrumbs.map((b, k) => (
                            <Breadcrumb.Item key={k}>{b}</Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 380}}>
                        {children}
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>ThaoTX Blog ©{new Date().getFullYear()}</Footer>
            </AntLayout>
        </>
    );
};

export default Layout;