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
    background: 'url(imgs/heros/landing-photo.jpg)',
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

  const goToLogin = goTo('login')

  return (
    <SidebarLayout noPadding includeWindowHeightContainer allowOverflow>

      <div className={classes.main}>
        <h1 className={classes.heading}>Welcome to the Future of 18+</h1>
        <div className={classes.buttonContainer} style={{ marginBottom: '3rem' }}>
          <Button variant="contained" className={classes.primaryButton} onClick={goToLogin}>Model SignUp</Button>
          <Button variant="contained" className={classes.primaryButton} onClick={goToLogin}>Fan Signup</Button>
          <Button variant="contained" className={classes.primaryButton} target="_blank" href="https://app.uniswap.org/#/swap?outputCurrency=0xd6327ce1fb9d6020e8c2c0e124a1ec23dcab7536">Buy CumInu</Button>
        </div>
        <div className={classes.buttonContainer}>
          <div className={classes.iconBox}>
            <img src="imgs/icons/stream.png"></img>
            <h3 className={classes.h3}>Live Streaming</h3>
          </div>
          <div className={classes.iconBox}>
            <img src="imgs/icons/tip.png"></img>
            <h3 className={classes.h3}>Anonymous Tipping</h3>
          </div>
          <div className={classes.iconBox}>
            <img src="imgs/icons/mobile_pay.png"></img>
            <h3 className={classes.h3}>Instant Payments</h3>
          </div>
          <div className={classes.iconBox}>
            <img src="imgs/icons/group.png"></img>
            <h3 className={classes.h3}>Huge Community Events</h3>
          </div>

        </div>

      </div>

    </SidebarLayout>

  )
}

export default LandingPage