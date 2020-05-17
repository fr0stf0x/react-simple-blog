import React, {useEffect} from 'react';
import {Form, Input, Button, message} from 'antd';
import {useHistory} from 'react-router-dom';

import {useDispatch, useSelector} from 'react-redux';
import {useMutate} from 'restful-react';
import {signup as signupAction} from '~/src/reducers/user';
import {getLoginStatus, getUser} from '~/src/selectors/user';
import {getSafe, emailPattern} from '~/src/utils';
import { validateMessages } from '~/src/utils/constant';

const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16}
};
const tailLayout = {
    wrapperCol: {offset: 8, span: 16}
};

const Signup = (props) => {
    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const history = useHistory();

    useEffect(() => {
        if (getSafe(() => user.isLoggedIn)) {
            history.push('/blog');
        }
    }, [user]);

    const {mutate: signup, loading} = useMutate({
        path: '/signup',
        verb: 'POST'
    });

    const onFinish = values => {
        signup(values).then(res => {
            dispatch(signupAction({
                ...values,
                ...res
            }));
        }).catch(e => {
            message.error({
                content: 'Can not sign up',
                duration: 2000
            });
        });
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            {...layout}
            name="basic"
            initialValues={{remember: true}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            validateMessages={validateMessages}
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {required: true, message: 'Please input your name!'},
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {required: true, message: 'Please input your email!'},
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
                    Sign up
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Signup;