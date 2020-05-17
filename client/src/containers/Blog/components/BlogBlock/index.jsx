import React from 'react';
import {Typography, Space, Card, Tag, Row, Col} from 'antd';
import {getSafe} from '~/src/utils';
import {useHistory} from 'react-router-dom';

const {Title, Paragraph, Text} = Typography;

const BlogBlock = (props) => {
    const history = useHistory();

    const onClickBlock = () => {
        history.push(`/blog/${props._id}/view`);
    };

    return (
        <Card className='blog-block' onClick={onClickBlock}>
            <Typography>
                <Row>
                    <Col>
                        <Title 
                            ellipsis={{
                                expandable: true,
                                rows: 2
                            }}
                        >
                            {props.title}
                        </Title>
                    </Col>
                </Row>

                {getSafe(() => props.createdBy.name) && (
                    <Row style={{marginBottom: 10}}>
                        <Text title>Written by {props.createdBy.name}</Text>
                    </Row>
                )}

                {!!getSafe(() => props.tags.length) && (
                    <Row style={{marginBottom: 10}}>
                        <Text>
                            Tags: {
                                props.tags.map((tag, idx) => (
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
                    {props.body}
                </Paragraph>
            </Typography>
        </Card>
    );
};

export default BlogBlock;
