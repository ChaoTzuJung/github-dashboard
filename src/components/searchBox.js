import React, { Component } from 'react'
import { Input } from 'antd';

const Search = Input.Search;

class searchBox extends Component {
    render() {
        return (
            <div>
                <Search
                    style={{
                        width: '300px',
                        marginLeft: '20px',
                    }}
                    placeholder="Github Username"
                    onSearch={value => this.props.fetchData(value)}
                    enterButton
                />
            </div>
        )
    }
}

export default searchBox
