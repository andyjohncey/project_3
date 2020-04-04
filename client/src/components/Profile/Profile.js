import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import SaveAltRoundedIcon from '@material-ui/icons/SaveAltRounded';
import SaveRoundedIcon from '@material-ui/icons/SaveRounded';


const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 345,
    },
    avatar: {
        backgroundColor: Purple[500],
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function ProfileCard() {
    const classes = useStyles();
    const [state, setState] = React.useState(false);

    const [formObject, setFormObject] = useState({
        name:"",
        userName:"",
        email:"",
        workRole: "",
        qualification: ""
    })

    const submitHandler = () => {
        setState(!state);
        
    };

    const handleInputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
  
        console.log(name, value)
  
        setFormObject({...formObject, [name]:value})
    } 

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-lable="Profile Picture" className={classes.avatar}>
                        <SaveAltRoundedIcon />
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title="User Profile"
            />
            <CardContent>
                <Typography variant="body2" color="textprimary">
                    <TextField
                        label="Name"
                        id="name"
                        value={formObject.name}
                        className={classes.textField}
                        helperText="Full Name"
                        margin="normal"
                        variant="outlined"
                        onChange={handleInputChange}
                    />
                </Typography>
                <Typography variant="body2" color="textprimary">
                    <TextField
                        label="User Name"
                        id="userName"
                        value={formObject.username}
                        className={classes.textField}
                        helperText="User Name"
                        margin="normal"
                        variant="outlined"
                        onChange={handleInputChange}
                    />
                </Typography>
                <Typography variant="body2" color="textprimary">
                    <TextField
                        label="Email"
                        id="email"
                        value={formObject.email}
                        className={classes.textField}
                        helperText="Email address"
                        margin="normal"
                        variant="outlined"
                        onChange={handleInputChange}
                    />
                </Typography>
                <TextField
                        label="workRole"
                        id="workRole"
                        value={setFormObject.workRole}
                        className={classes.textField}
                        helperText="Work Role"
                        margin="normal"
                        variant="outlined"
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Qualification"
                        id="qualification"
                        value={setFormObject.qualification}
                        className={classes.textField}
                        helperText="Qualification"
                        margin="normal"
                        variant="outlined"
                        onChange={handleInputChange}
                    />
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="update profile">
                    <SaveRoundedIcon onclick={submitHandler}/>
                </IconButton>
            </CardActions>
        </Card>
    );
}