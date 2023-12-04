import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
const FetchLoader = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ width: "100%", height: "60vh"}}>
            <Spinner animation="border" role="status" style={{ borderTopColor: '#49c1a5', borderRightColor: '#00BFFF' }}>
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    )
}

export default FetchLoader