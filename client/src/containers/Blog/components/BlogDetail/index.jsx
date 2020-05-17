import React from 'react';
import {useGet} from 'restful-react';
import {getSafe} from '~/src/utils';
import {Row, Card, Typography, Col, Spin, Tag, Space, Empty} from 'antd';

import {useParams} from 'react-router-dom';

const {Title, Text, Paragraph} = Typography;

const BlogDetail = (props) => {
    const params = useParams();

    const {data, loading, error} = useGet(`/api/blog/${params.id}`);

    return loading ? (
        <Spin />
    ) : error ? <Empty /> : (
        <Card>
            <Typography>
                <Row>
                    <Col>
                        <Title
                            ellipsis={{
                                expandable: true,
                                rows: 2
                            }}
                        >
                            {data.data.title}
                        </Title>
                    </Col>
                </Row>

                {getSafe(() => data.data.createdBy.name) && (
                    <Row style={{marginBottom: 10}}>
                        <Text title>Written by {data.data.createdBy.name}</Text>
                    </Row>
                )}

                {!!getSafe(() => data.data.tags.length) && (
                    <Row style={{marginBottom: 10}}>
                        <Text>
                            Tags: {
                                data.data.tags.map((tag, idx) => (
                                    <Space key={idx}>
                                        <Tag>{tag}</Tag>
                                    </Space>
                                ))
                            }
                        </Text>
                    </Row>
                )}

                <Paragraph 
                    ellipsis={{
                        expandable: true,
                        rows: 5
                    }}
                >
                    {data.data.body}
                </Paragraph>
            </Typography>
        </Card>
    );
};

export default BlogDetail;