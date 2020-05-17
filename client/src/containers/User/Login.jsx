import React from 'react';
import {Form, Input, Button, Alert, Space, message} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {getLoginStatus} from '~/src/selectors/user';

import {login as loginAction} from '~/src/reducers/user';

import {useMutate} from 'restful-react';
import {useHistory} from 'react-router-dom';
import {validateMessages} from '~/src/utils/constant';

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16}
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16}
};

const Login = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const {mutate: login, loading, error} = useMutate({
        path: '/signin',
        verb: 'POST'
    });

    const onFinish = values => {
        login(values).then(res => {
            dispatch(loginAction({
                ...values,
                ...res
            }));
        }).catch(e => {
            message.error({
                content: 'Wrong user or password',
                duration: '3000'
            });
        });
    };

    const createAccount = () => {
        history.push('/signup');
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Form
                {...layout}
                name="basic"
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                validateMessages={validateMessages}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {required: true, message: 'Please input your email!'},
                        // {pattern: emailPattern, message: 'Please input a valid email'}
                        {type: 'email'}
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Log in
                    </Button>
                    <Button type="link" onClick={createAccount}>
                        Create account
                    </Button>
                </Form.Item>
            </Form>
            
        </>
    );
};

export default Login;