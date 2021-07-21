import React, { FunctionComponent } from 'react';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import Cityscape from 'illustrations/small-cityscape-night-construction.svg';
import { LogoMark } from 'components/Logos';
import { flex } from 'CommunityApp/styles/layout';
import { buttonSecondary } from 'CommunityApp/styles/button';
import AppBody from 'CommunityApp/layout/AppBody';

/**
 * @prop positionContent  Display the 404 message and illustration at the top
 * of the container ('top') or fill the space by placing the text in the center
 * and illustration on the bottom ('stretch').
 */
interface Props {
  handleReturnHome: () => void;
}

const style = makeStyles((theme) => ({
  container: {
    alignContent: 'stretch',
    alignItems: 'stretch',
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    flexWrap: 'nowrap',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      overflowX: 'hidden',
      overflowY: 'auto'
    },
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center',
      width: '39rem'
    }
  },
  subcontainer: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      justifyContent: 'center',
      width: '39rem'
    },
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'stretch',
      width: '100%'
    }
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    [theme.breakpoints.up('md')]: {
      flexGrow: 0
    }
  },
  errorText: {
    color: theme.palette.error.main,
    marginTop: '3rem',
    marginBottom: '0.5rem'
  },
  flexContent: {
    ...flex,
    flexDirection: 'column',
    alignItems: 'center'
  },
  primaryText: {
    color: theme.palette.primary.light,
    marginTop: '0.5rem',
    marginBottom: '2rem'
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    padding: '1rem',
    [theme.breakpoints.up('md')]: {
      padding: '2rem'
    }
  }
}));

const buttonStyle = makeStyles((theme) => ({
  buttonStyle: {
    ...buttonSecondary,
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
}));

const PageNotFound: FunctionComponent<Props> = (props) => {
  const { handleReturnHome } = props;
  const classes = style(useTheme());
  const buttonClass = buttonStyle();

  return (
    <AppBody>
      <div className={classes.messageContainer}>
        <LogoMark height={45} width={71} />
        <h4 className={classes.errorText}>404</h4>

        <h1 className={`${classes.primaryText} ${classes.flexContent}`}>
          {props.children || (
            <React.Fragment>
              <span>Sorry! We couldn’t find the</span>
              <span>page you were looking for.</span>
            </React.Fragment>
          )}
        </h1>
      </div>
      <div className={classes.flexContent}>
        <Cityscape />
        <div className={classes.buttonContainer}>
          <button className={buttonClass.buttonStyle} onClick={handleReturnHome}>
            Return to Home
          </button>
        </div>
      </div>
    </AppBody>
  );
};

export default PageNotFound;
