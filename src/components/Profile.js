import React, { Component } from 'react';
import { Card, Col, Row, List, Avatar, Spin } from 'antd';

import '../App.css';




class Profile extends Component {
    renderEventItems = (item) => (
        <List.Item>
            <List.Item.Meta
                title={item.type}
                description={item.repo.name}
            />
        </List.Item>
    )

    renderUserItems = (item) => (
        <List.Item>
            <List.Item.Meta
                avatar={<Avatar src={item.avatar_url} />}
                title={<a href={item.html_url}>{item.login}</a>}
            />
        </List.Item>
    )

    renderColumn = (title, dataSource, renderItemFunc) => (
        <Col span={8}>
            <Card title={title}>
                <List
                    pagination={{pageSize: 5}}
                    itemLayout="horizontal"
                    dataSource={dataSource}
                    renderItem={renderItemFunc}
                />
            </Card>
        </Col>
    )

    render () {
        const { user_data, events_data, followers_data, following_data } = this.props;
        return (
            <div>
                {
                    user_data ?

                    <div>
                        <div className="name-container">
                            <h1>{user_data.name}</h1>
                            <Avatar shape="square" size="large" icon="user" src={user_data.avatar_url} />
                        </div>
                        <p>{user_data.bio}</p>
                    </div>

                    :

                    <div style={{textAlign: 'center', padding: '50px'}}>
                        <Spin />
                    </div> 
                }
                <Row gutter={16}>
                    {this.renderColumn("Recent Activities", events_data, this.renderEventItems)}
                    {this.renderColumn("Following", following_data, this.renderUserItems)}
                    {this.renderColumn("Followers", followers_data, this.renderUserItems)}
                </Row>
            </div>
        )
    }
}

export default Profile;