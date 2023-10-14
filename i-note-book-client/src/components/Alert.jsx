import React, { useEffect, useState } from 'react'

export default function Alert(props) {
    return (
        <div>
            {/* <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Alert:</strong> {props.message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div> */}
            {props.message.length != 0 && <div className="alert alert-info text-center" role="alert">
                {props.message}
            </div>}
        </div>
    )
}
