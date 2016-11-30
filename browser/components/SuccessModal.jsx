import React, { Component } from 'react'

export default class SuccessModal extends Component {

    render(){
        return (
        <div>          
            <div id="success-modal">
                <div className="modal__overlay" role="dialog" aria-labelledby="modal__title" aria-describedby="modal_desc">
                    <div className="modal__wrap">
                        <label htmlFor="modal__trigger">&#10006;</label>
                        <h2 id="modal__title">This is your modal content</h2>
                        <p id="modal__desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac laoreet elit. Phasellus dignissim purus vitae urna cursus, quis congue ligula tristique. Ut nec blandit risus. Donec at orci ut justo venenatis viverra. Suspendisse in volutpat lacus. In enim est, dapibus eget ipsum sed, suscipit ultrices diam.</p>
                    </div>
                </div>
            </div>
        </div>
        )
    }

}