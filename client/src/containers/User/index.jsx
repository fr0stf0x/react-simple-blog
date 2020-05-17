import React from 'react';
import {useGet} from 'restful-react';
import {useDispatch} from 'react-redux';

import {logout} from '~/src/reducers/user';

const UserChecking = ({children}) => {
    const {data, loading, error} = useGet('/api/user');
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (error) {
            dispatch(logout());
        }
    }, [error, data]);

    return !loading && children;
};

export default UserChecking;