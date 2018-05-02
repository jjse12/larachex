import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from 'material-ui/styles';
import PropTypes from 'prop-types';
import TablaInventario from "./tabla";
import FooterOpciones from "./opciones";

const styles = theme => ({});

@connect(
    store => ({}),
    {}
)
@withStyles(styles)
export default class /* ComponentName */
    extends Component {

    static propTypes = {};

    componentDidMount() {

    }

    render() {
        return (
            <div>

                <TablaInventario/>
                <FooterOpciones/>
            </div>
        );
    }
}