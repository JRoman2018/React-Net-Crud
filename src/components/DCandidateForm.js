import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import * as actions from "../actions/dCandidate";
import {Grid, TextField, FormControl, withStyles, InputLabel, Select, MenuItem, Button, FormHelperText} from '@material-ui/core';
import FormOperation from "./FormOperation"

const styles = theme =>({
    root:{
        '& .MuiTextField-root':{
        margin: theme.spacing(1),
        minWidth: 230,
        }
    },
    formControl:{
        margin: theme.spacing(1),
        minWidth: 230,
    },
    smMargin:{
        margin: theme.spacing(1),
    }
})

const initialValue = {
    fullName:'',
    mobile:'',
    email:'',
    age:'',
    bloodGroup:'',
    address:''
}

const DCandidateForm = ({classes, ...props}) => {
    const {currentId, setCurrentId, candidates} = props
    const dispatch = useDispatch();
    //Validate()
    const validate = (fieldValues = values) => {
        let temp ={}
        if('fullName' in fieldValues){
            temp.fullName = fieldValues.fullName?"":"This field is required."
        }
            
        if('mobile' in fieldValues){
            temp.mobile = fieldValues.mobile?"":"This field is required."
        }
        if('bloodGroup' in fieldValues){
            temp.bloodGroup = fieldValues.bloodGroup?"":"This field is required."
        }
        if('email' in fieldValues){
            temp.email = (/^$|.+@.+..+/).test(fieldValues.email)?"":"Email is not valid."
        }
        setErrors({
            ...temp
        })

        if(fieldValues === values)
            return Object.values(temp).every(x => x==="")
    }
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = FormOperation(initialValue, validate, setCurrentId)

    //Material-ui select
    const inputLabel = React.useRef(null);
    const [labelWidth, setLabelWidth] = useState(0);

    useEffect(() => {
        if(currentId !== 0){
            setValues({
                ...candidates.find(x => x.id === currentId)
            })
        setErrors({});
        }
    },[currentId, candidates])
    
    useEffect(() => {
        const input = inputLabel.current;
        setLabelWidth(input.offsetWidth);
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(validate()){
            if(currentId === 0){
                dispatch(actions.create(values, () =>{
                window.alert('Inserted.')
                }))
            }
            else{
                dispatch(actions.update(currentId, values, () =>{
                    window.alert('Updated.')
                }))
            }
            resetForm()
        }
    }

    return ( 
    <form autoComplete="off" noValidate className={classes.root} onSubmit={handleSubmit}>
        <Grid container>
            <Grid item xs={6}>
                <TextField 
                    name="fullName" 
                    variant="outlined" 
                    label="Full Name" 
                    value={values.fullName}
                    onChange={handleInputChange}
                    {...(errors.fullName && {error:true, helperText:errors.fullName})}
                    />
                <TextField 
                    name="email" 
                    variant="outlined" 
                    label="Email" 
                    value={values.email}
                    onChange={handleInputChange}
                    {...(errors.email && {error:true, helperText:errors.email})}
                    />
                <FormControl variant="outlined" className={classes.formControl} {...(errors.bloodGroup && {error:true})}>
                    <InputLabel ref={inputLabel}>Blood Group</InputLabel>
                    <Select
                        name="bloodGroup"
                        value={values.bloodGroup}
                        onChange={handleInputChange}
                        labelWidth={labelWidth}
                        >
                        <MenuItem value="">Select Blood Group</MenuItem>
                        <MenuItem value="A+">A +ve</MenuItem>
                        <MenuItem value="A-">A -ve</MenuItem>
                        <MenuItem value="B+">B +ve</MenuItem>
                        <MenuItem value="B-">B -ve</MenuItem>
                        <MenuItem value="AB+">AB +ve</MenuItem>
                        <MenuItem value="AB-">AB -ve</MenuItem>
                        <MenuItem value="O+">O +ve</MenuItem>
                        <MenuItem value="O-">O -ve</MenuItem>
                    </Select>
                    {errors.bloodGroup && <FormHelperText>{errors.bloodGroup}</FormHelperText>}
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField 
                    name="mobile" 
                    variant="outlined" 
                    label="Mobile" 
                    value={values.mobile}
                    onChange={handleInputChange}
                    {...(errors.mobile && {error:true, helperText:errors.mobile})}
                    />
                <TextField 
                    name="age" 
                    variant="outlined" 
                    label="Age" 
                    value={values.age}
                    onChange={handleInputChange}/>
                    <TextField 
                    name="address" 
                    variant="outlined" 
                    label="Address" 
                    value={values.address}
                    onChange={handleInputChange}/>
                    <div>
                        <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className={classes.smMargin}
                        >
                           {currentId && currentId !== 0 ? 'Update' : 'Submit'} 
                        </Button>
                        <Button
                        variant="contained"
                        color="secondary"
                        className={classes.smMargin}
                        onClick={() => resetForm()}
                        >
                            Reset
                        </Button>
                    </div>
            </Grid>
        </Grid>
    </form>
    );
}
 
export default withStyles(styles)(DCandidateForm);

