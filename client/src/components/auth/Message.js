import React from 'react'
import PropTypes from 'prop-types'

const Message = ({ msg }) => {
    return (
        <div>
            <div class="alert alert-warning alert-dismissible fade show" role="alert">
            { msg }
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
  </button>
</div>
        </div>
    )
}

Message.propTypes = {
    msg: PropTypes.string.isRequired,
}

export default Message
