import React from 'react';
// Post - add proptypes

const Home = props => {
    if (props.user) {
        return (
            <div className="Home">
                <p>Current User:</p>
                <code>
                    {JSON.stringify(props)}
                </code>
            </div>
        )
    } else {
        return (
            <div className="Home">
                <p>Current User:</p>
                <code>
                    {JSON.stringify(props)}
                </code>
            </div>
        )
    }
}

export default Home