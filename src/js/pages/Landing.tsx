import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { headingOne, headingThree } from '../styles/typography';
import { buttonPrimary } from '../styles/button';
import { columnStack, rowStack, center } from '../styles/layout';
import SidebarLayout from '../layout/SidebarLayout';
import { goTo } from '../hooks/utils';


const useStyles = makeStyles((theme) => ({
  main: {
    textAlign: 'center',
    background: 'url(imgs/heros/woman.jpg)',
    boxShadow: 'inset 0 0 0 1000px rgba(0,0,0,.6)',
    paddingTop: '150px',
    paddingBottom: '150px',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center top',
    ...center,
    ...columnStack("2rem")
  },
  heading: {
    ...headingOne,
    marginBottom: '4rem'
  },
  description: {
    ...headingThree,
    padding: '2rem'
  },
  primaryButton: buttonPrimary,

  buttonContainer: {
    [theme.breakpoints.up('md')]: rowStack("3rem"),
    [theme.breakpoints.down('sm')]: {
      width: '50%',
      ...columnStack("2rem"),
      '& > button': {
        width: '100%'
      }
    }
  },

  h3: {
    ...headingThree,
    fontWeight: 'bold'
  },
  iconBox: {
    ...center,
    flexDirection: 'column',
    '& > img': { marginBottom: '1rem' },
    marginTop: '1rem'
  }
}))



const LandingPage: React.FunctionComponent = () => {
  const classes = useStyles()

  const goToSignup = goTo('signup')

  return (
    <SidebarLayout noPadding includeWindowHeightContainer allowOverflow>
      <div className={classes.main}>
        <h1 className={classes.heading}>Welcome to MindMinder</h1>
        <h3 className={classes.description}>Mind Minder exists as a place to help you with your mental health. Anxiety flairing up? Check our list of mental dilusions which may be causing you grief. We give you a place to track when you think these thoughts. Later, we'll give you a calendar so you can seek patterns within the chaos of your mind.</h3>
        <div className={classes.buttonContainer} style={{ marginBottom: '3rem' }}>
          <Button variant="contained" className={classes.primaryButton} onClick={goToSignup}>SignUp</Button>
        </div>
      </div>
    </SidebarLayout>

  )
}

export default LandingPage