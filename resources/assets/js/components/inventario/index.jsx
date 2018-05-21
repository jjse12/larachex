import React, {Component} from 'react';
import TablaInventario from "./tabla";
import FooterOpciones from "./opciones";
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    inventario:{
        marginTop: '4%',
        //overflowY: 'none'
        //top: 0,
        //bottom:'800px',
        //height: '33%'
    }
});

@withStyles(styles)
export default class Inventario extends Component {
    constructor(){
        super();
        this.handleOptionsVisibility= this.handleOptionsVisibility.bind(this);
        this.state = {
            optionsVisible: false
        };
    }

    handleOptionsVisibility(visible){
        this.setState({optionsVisible: visible});
    }

    render() {
        const { optionsVisible } = this.state;
        return (
            <div className={this.props.classes.inventario}>
                <TablaInventario
                    optionsVisibilityHandler={this.handleOptionsVisibility}
                />
                <FooterOpciones
                    visible={optionsVisible}
                />
            </div>
        );
    }
}