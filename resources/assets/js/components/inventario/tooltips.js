import React from 'react';

export const notificarEmail = (click) => {
    return <div>
        <div className='row'>
            <div className='col-12'>
                <h5>Notificar</h5>
            </div>
        </div>
        <div className='row'>
            <div className='col-12'>
                <img style={{
                    cursor: 'pointer',
                    textAlign: 'center',
                    width: '50%',
                    marginLeft: '25%',
                }} onClick={click} src='/img/email-icons/email128px.png'/>
            </div>
        </div>
    </div>;
};

export const notificarWhatsapp= (click) => {
    return <div>
        <div className='row'>
            <div className='col-12'>
                <h5>Notificar</h5>
            </div>
        </div>
        <div className='row'>
            <div className='col-12'>
                <img style={{
                    cursor: 'pointer',
                    textAlign: 'center',
                    width: '50%',
                    marginLeft: '25%',
                }} onClick={click} src='/img/whatsapp-icons/whatsapp128px.png'/>
            </div>
        </div>
    </div>;
};

export const notificarAmbos = (clickW, clickE) => {
    return <div>
        <div className='row'>
            <div className='col-12'>
                <h5>Notificar</h5>
            </div>
        </div>
        <div className='row'>
            <div className='col-12'>
                <img style={{
                    cursor: 'pointer',
                    textAlign: 'center',
                    width: '30%',
                    marginLeft: '12.5%',
                }} onClick={clickW} src='/img/whatsapp-icons/whatsapp128px.png'/>
                <img style={{
                    cursor: 'pointer',
                    textAlign: 'center',
                    width: '30%',
                    marginLeft: '12.5%',
                }} onClick={clickE} src='/img/email-icons/email128px.png'/>
            </div>
        </div>
    </div>;
};