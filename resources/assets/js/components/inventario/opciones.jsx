import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    opciones: {
        overflow: 'hidden',
        backgroundColor: '#333',
        position: 'fixed',
        bottom: 0,
        width: '100%',
    },
});

@connect(
    store => ({}),
    {}
)
@withStyles(styles)
export default class FooterOpciones extends Component {

    static propTypes = {};

    componentDidMount() {

    }

    render() {
        return (
            <div className="col-8 offset-2 align-self-center">
                <br/>
                <footer className={this.props.classes} >
                    <h1>el footer</h1>
                </footer>
            </div>
        );
    }
}