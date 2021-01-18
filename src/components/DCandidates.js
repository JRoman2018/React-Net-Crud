import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as actions from "../actions/dCandidate";
import DCandidateForm from './DCandidateForm';
import EditIcon from "@material-ui/icons/Edit"
import DeleteICon from "@material-ui/icons/Delete"
import {Grid, Paper, TableCell, Table, TableHead, TableContainer, TableRow, TableBody, withStyles, ButtonGroup, Button} from '@material-ui/core'

const styles = theme => ({
    root:{
        "& .MuiTableCell-head":{
            fontSize:"1.25rem",
            fontWeight: "bold"
        }
    },
    paper:{
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
})

const DCandidates = ({classes, ...props}) => {
    const candidates = useSelector(state => state.dCandidate.list);
    const [currentId, setCurrentId] = useState(0)
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(actions.fetchAll())
    },[]) //ComponentDidMount

    const handleDelete = (id) => {
        dispatch(actions.Delete(id))
        window.alert('Deleted!')
    }

    return ( 
    <Paper className={classes.paper} elevation={3}>
        <Grid container>
            <Grid item xs={6}>
                <DCandidateForm {...({currentId, setCurrentId, candidates})}/>
            </Grid>
            <Grid item xs={6}>
                <TableContainer>
                    <Table>
                        <TableHead className={classes.root}>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Mobile</TableCell>
                                <TableCell>Blood Group</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {candidates.map(candidate =>{
                                const {id, fullName, mobile, bloodGroup} = candidate;
                                return (
                                <TableRow key={id} hover>
                                    <TableCell>{fullName}</TableCell>
                                    <TableCell>{mobile}</TableCell>
                                    <TableCell>{bloodGroup}</TableCell>
                                    <TableCell>
                                        <ButtonGroup variant="text">
                                            <Button><EditIcon color="primary" onClick={() => setCurrentId(id)}/></Button>
                                            <Button><DeleteICon color="secondary" onClick={() => handleDelete(id)}/></Button>
                                        </ButtonGroup>
                                    </TableCell>
                                </TableRow>
                                    )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid> 
    </Paper>
    );
}


export default (withStyles(styles)(DCandidates));
