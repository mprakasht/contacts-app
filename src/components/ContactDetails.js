import React from 'react'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Typography, Grid } from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) =>
  createStyles({
    top: {
      width: '100%',
      height: 150,
      borderBottom: '2px solid #dedede',
    },
    userIconView: {
      height: 130,
      width: 130,
      borderRadius: '100%',
      backgroundColor: "#dedede",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12
    },
    userIcon: {
      height: 120,
      width: 120,
      color: '#c0c0c0'
    },
    details: {
      width: '100%',
      marginTop: theme.spacing(2)
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
    },
    infoText: {
      fontSize: 14,
      color: '#454553'
    },
    rootGrid: {
      flexGrow: 1,
      marginTop: theme.spacing(2)
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

const ContactDetails = () => {
  const classes = useStyles();
  const { contactId } = useParams() || 0;
  const contactsList = useSelector((state) => state.contact.contactsList);
  const contactInfo = contactsList.filter(x => x.id.toString() === contactId)[0] || {};
  return (
    <>
      <div className={classes.top}>
        <div style={{ display: 'flex' }}>
          <div className={classes.userIconView}>
            <PersonIcon className={classes.userIcon} />
          </div>
          <Typography variant="body1" className={classes.title}>{(contactInfo.firstName || '') + ' ' + (contactInfo.lastName || '')}</Typography>
        </div>
      </div>
      <div className={classes.details}>
        <Typography variant="body1" style={{ fontSize: 20 }}>Contact Information</Typography>
        <div className={classes.rootGrid}>
          <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={3}>
                <Typography variant="body1" className={classes.infoText}>First Name</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className={classes.infoText}>{contactInfo.firstName}</Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={3}>
                <Typography variant="body1" className={classes.infoText}>Last Name</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className={classes.infoText}>{contactInfo.lastName}</Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={3}>
                <Typography variant="body1" className={classes.infoText}>Email</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className={classes.infoText}>{contactInfo.email}</Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12} spacing={3}>
              <Grid item xs={3}>
                <Typography variant="body1" className={classes.infoText}>Phone</Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography variant="body1" className={classes.infoText}>{contactInfo.phone}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  )
}

export default ContactDetails
