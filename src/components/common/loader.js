import React from 'react'
import {connect} from 'react-redux'

class Loader extends React.Component {
    
    render () {
        let { isLoading } = this.props
        
        if (isLoading === true) {
            return (
                <div>
                    <div className="loading-bg"></div>
                    <div className="loading-fg">
                        <h5 className="loading-header">Loading</h5>
                        <p className="loading-content">Please wait whilst we load your content.</p>
                        <div className="loader"></div>
                    </div>
                </div>
            )
        } else {
            return (<div></div>)
        }
    }
}

Loader.defaultProps = {
    isLoading: false
}

Loader.propTypes = {
    isLoading: React.PropTypes.bool.isRequired
}

function mapStateToProps (state) {
    return {
        isLoading: state.isLoading
    }
}

export default connect(mapStateToProps)(Loader)
