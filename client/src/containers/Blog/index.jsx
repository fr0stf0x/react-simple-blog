import React from 'react';
import {useGet} from 'restful-react';
import {Button, Divider, Space, Empty, Row, Col} from 'antd';

import {useHistory} from 'react-router-dom';
import BlogBlock from './components/BlogBlock';
import {getSafe} from '~/src/utils';

export default function Blog ({mine}) {
    const {data, loading, error} = useGet(`/api/blog${mine ? '/my-blog' : ''}`);
    const history = useHistory();

    const onClickCreateBlog = () => {
        history.push('/blog/create');
    };

    return (
        <Space direction="vertical">
            <Button onClick={onClickCreateBlog} type="primary">Create blog</Button>
            {error && (
                <Empty />
            )}
            {loading ? <div>Loading</div> : (
                <div className="blogs">
                    {getSafe(() => data.data.length) ? (
                        <>
                            {data.data.map((blog) => (
                                <Row key={blog._id} gutter={24}>
                                    <Col span={24}>
                                        <BlogBlock
                                            {...blog}
                                        />
                                        <Divider />
                                    </Col>
                                </Row>
                            ))}
                        </>
                    ) : (
                        <Empty />
                    )}
                </div>
            )}
        </Space>
    );
}
