import React from 'react';
import {Form, Input, Button} from 'antd';
import {useMutate} from 'restful-react';
import {useHistory} from 'react-router-dom';
import {validateMessages} from '~/src/utils/constant';

const layout = {
    labelCol: {span: 6},
    wrapperCol: {span: 14}
};

const CreateBlog = () => {
    const history = useHistory();

    const {mutate: createBlog, loading} = useMutate({
        path: '/api/blog',
        verb: 'POST'
    });

    const onFinish = values => {
        createBlog({
            title: values.title,
            body: values.body,
            tags: (values.tags || []).split(',').filter(Boolean)
        }).then(res => {
            history.push('/blog');
        });
    };

    return (
        <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
        >
            <Form.Item name='title' label="Title" rules={[{required: true}]}>
                <Input placeholder="Nice title" />
            </Form.Item>
            <Form.Item name='tags' label="Tag">
                <Input placeholder="Tags split by comma" />
            </Form.Item>
            <Form.Item name='body' label="Body" rules={[{required: true}]}>
                <Input.TextArea
                    rows={10}
                    placeholder={'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel nostrum perspiciatis mollitia quos obcaecati delectus expedita, eos hic ullam. Tempore nisi sit nesciunt incidunt corrupti ipsam voluptatum fugiat, eaque voluptatibus.'} 
                />
            </Form.Item>
            <Form.Item wrapperCol={{...layout.wrapperCol, offset: 6}}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateBlog;