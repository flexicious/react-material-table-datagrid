
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import DateUtils from '@date-io/moment';
import { InlineDatePicker, MuiPickersUtilsProvider } from 'material-ui-pickers';

type ColorType =
 | 'primary'
 | 'contrast';

type Props = {
    color: ColorType,
    classes: Object,
    selectedDate?: Date,
    onDateChange: (date: Date) => any,
}

const styles = theme => ({
    contrastScheme: {
        '& label': {
            color: `${theme.palette.primary.contrastText} !important`
        },
        '& div': {
            color: `${theme.palette.primary.contrastText}`,
        },
        '& div:hover:not(.MuiInput-disabled):not(.MuiInput-focused):not(.MuiInput-error):before': {
            borderBottomColor: `${theme.palette.primary.contrastText}`
        },
        '& div:before': {
            borderBottomColor: `${theme.palette.primary.contrastText}`,
        },
        '& div:after': {
            borderBottomColor: `${theme.palette.primary.contrastText}`,
        },
    },
    primaryScheme: {
        '& label': {
            color: `${theme.palette.primary.main} !important`
        },
        '& div': {
            color: `${theme.palette.primary.main}`,
        },
        '& div:hover:not(.MuiInput-disabled):not(.MuiInput-focused):not(.MuiInput-error):before': {
            borderBottomColor: `${theme.palette.primary.main}`
        },
        '& div:before': {
            borderBottomColor: `${theme.palette.primary.main}`,
        },
        '& div:after': {
            borderBottomColor: `${theme.palette.primary.main}`,
        },
    },
});

class MaterialDatePicker extends React.PureComponent<Props> {

    constructor(props) {
        super(props);
        this.state = {
            selected: props.selectedDate
        }
    }

    static defaultProps = {
        color: 'primary',
        format: 'MM/DD/YYYY',
        selectedDate: new Date(),
    }

    handleOnChange = date => {

        const { selected } = this.state;

        if( selected.toDateString() === date.toDateString() ) {
            return;
        }

        const { onDateChange } = this.props;

        if( onDateChange ) {
            onDateChange(date);
        }

        this.setState({
            selected: date
        });
    }

    static getDerivedStateFromProps = (newProps, prevState) => {
        const { selected } = prevState;
        const oldSelectedDate = prevState.selectedDate;
        const { selectedDate } = newProps;
        if(selectedDate && selected !== selectedDate) {

            const stateObj = { selectedDate };

            if(!oldSelectedDate) {
                stateObj.selected = selectedDate;
            }

            return stateObj;
        } 
        
        return null;
    }

    render = () => {
        
        const { 
            value,
            onChange,
            className, 
            onDateChange, 
            selectedDate,
            classes, 
            color,
            ...more 
        } = this.props;
        const { selected } = this.state;

        return (
            <MuiPickersUtilsProvider utils={DateUtils}>
                <InlineDatePicker
                    color='primary'
                    value={ selected }
                    onChange={w => this.handleOnChange(w.toDate())}
                    className={classNames({
                        [classes.primaryScheme]: color === 'primary',
                        [classes.contrastScheme]: color === 'contrast',
                    })}
                    {...more}
                />
            </MuiPickersUtilsProvider>
        );
    }
}

export default withStyles(styles)(MaterialDatePicker);
