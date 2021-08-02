import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function PaginationControlled(props) {
  const classes = useStyles();
   const [page, setPage] = React.useState(1); 
  const handleChange = (event, value) => {
    setPage(value);
  }; 

  return (
    <div className='m-5 d-flex flex-row justify-content-center'>
      <div className={classes.root}>
        <Pagination count={props.totalPages} page={page} onChange={handleChange}
        onClick={()=>props.paginate(page)} size="large" color='primary' />
      </div>
      </div>

  );
}
