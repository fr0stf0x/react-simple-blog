import React, {Suspense} from 'react';
import {RestfulProvider} from 'restful-react';
import {useSelector} from 'react-redux';
import {Switch, Route, Redirect, useHistory, useLocation} from 'react-router-dom';

import Layout from '~/src/components/Layout';

import routes from '~/src/routes';
import {getToken, getLoginStatus} from './selectors';
import UserChecking from './containers/User';

import '../index.less';
import {needAuthPathnames, userPathNames} from './utils/constant';

const API_URL = 'http://localhost:3000';

const App = (props) => {
    const token = useSelector(getToken);
    const isLoggedIn = useSelector(getLoginStatus);
    const history = useHistory();
    const location = useLocation();

    React.useEffect(() => {
        if (isLoggedIn) {
            if (userPathNames.includes(location.pathname)) {
                history.push('/blog');
            }
        } else {
            if (needAuthPathnames.includes(location.pathname)) {
                history.push('/login');
            }
        }
    }, [isLoggedIn, location]);

    return (
        <RestfulProvider
            base={API_URL}
            requestOptions={{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }}
        >
            <UserChecking>
                <Layout>
                    <Suspense fallback={<div>Loading</div>}>
                        <Switch>
                            {routes.map(({component, ...route}, idx) => {
                                return (
                                    <Route
                                        key={idx}
                                        path={route.path}
                                        component={component}
                                        exact={route.exact}
                                        name={route.name}
                                    />
                                );
                            })}
                            <Redirect to={'/blog'} />
                        </Switch>
                    </Suspense>
                </Layout>
            </UserChecking>
        </RestfulProvider>
    );
};

export default App;