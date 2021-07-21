import React, { useState, FunctionComponent } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import EmailValidator from 'email-validator';
import { rem } from 'csx';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Link from '@material-ui/core/Link';
import { color } from 'CommunityApp/styles/theme';
import { headingOne, textBase } from 'CommunityApp/styles/typography';
import { flex, horizontalRule, columnStack, center } from 'CommunityApp/styles/layout';
import WindowHeightContainer from 'CommunityApp/layout/WindowHeightContainer';
import { LogoMark } from 'components/Logos';
import { path } from 'CommunityApp/routes/Routes';
import { useAppDispatch, useAppSelector } from 'CommunityApp/hooks/storeHooks';
import { login } from 'CommunityApp/api/sessions';
import { APIError, baseURL } from 'CommunityApp/api/client';

interface FormState {
  email: string;
  password: string;
}

interface LocationState {
  from: {
    pathname: string;
  };
  originalDestination: string;
}

const useStyles = makeStyles({
  container: {
    ...textBase,
    backgroundColor: color.cloud,
    backgroundImage: 'url(/images/illustrations/cloud.svg)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center bottom',
    flexGrow: 1,
    padding: '2rem'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: rem(1),
    paddingRight: rem(1),
    maxWidth: 375
  },
  loginForm: {
    ...flex,
    ...columnStack('2rem'),
    alignItems: 'center',
    '& .MuiInput-underline:before': {
      display: 'none'
    },
    '& input': {
      padding: '10px 20px',
      borderRadius: '20px'
    },
    '& button': {
      padding: '10px 20px',
      width: '75%',
      borderRadius: '20px',
      backgroundColor: color.blueSky
    }
  },
  error: {
    ...center,
    width: '100%',
    padding: '1rem'
  },
  titleMain: {
    marginTop: '2rem',
    marginBottom: '4rem',
    textAlign: 'center'
  },
  titleSmall: {
    ...headingOne,
    ...horizontalRule,
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 2.38,
    letterSpacing: -0.05,
    color: color.moon
  }
});

interface HeadingProps {
  classes: ReturnType<typeof useStyles>;
}

const Heading = ({ classes }: HeadingProps) => (
  <h1 className={classes.titleMain}>
    Dashboard
    <span className={`${classes.titleSmall}`}>for</span>
    <span>Community Team</span>
  </h1>
);
type tErrorMessages = {
  [key: string]: string;
};

const errorMessages: tErrorMessages = {
  invalid_authentication: 'Invalid Username or Password',
  account_deactivated: 'Account Deactivated! Please contact an admin',
  other: 'Unknown Error'
};
interface ErrorProps {
  error: null | APIError;
}

function DisplayError({ error }: ErrorProps) {
  if (!error) return null;

  const errorType = (error && error.data && error.data?.error?.code) || 'other';

  return <Chip label={errorMessages[errorType as string] as string} color="secondary" />;
}

const Login: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const [state, setState] = useState<FormState>({
    email: '',
    password: ''
  });
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation<LocationState>();

  const { email, password } = state;
  const { isLoading, isAuthenticated, error } = authState;

  const canSubmit = EmailValidator.validate(email) && password.length >= 6 && !isLoading;

  // Will redirect if isAuthenticated is true
  if (isAuthenticated) {
    // redirect if user was trying to access a different page
    const destination = location.state ? location.state.originalDestination : path.home;
    history.replace(path.login, {});
    history.push(destination);
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: 'email' | 'password'
  ) => setState({ ...state, ...{ [key]: event.currentTarget.value } });

  const handleSubmit = () => {
    dispatch(login({ email, password }));
  };

  const passwordResetLink = `${baseURL}/admin/password_reset/new`;

  // If error occurs, reset local state
  // const previousErrorValue = usePrevious<string | null>(error);
  // if (!previousErrorValue && error) console.log('winning');

  return (
    <WindowHeightContainer>
      <div className={classes.container}>
        <Container maxWidth="sm">
          <LogoMark />
          <Heading classes={classes} />
          <div className={classes.error}>
            <DisplayError error={authState.error} />
          </div>
          <div onSubmit={handleSubmit} className={classes.loginForm}>
            <TextField
              label="Email"
              value={email}
              type="email"
              onChange={(e) => handleInputChange(e, 'email')}
              error={!!error}
              fullWidth
            />
            <TextField
              label="Password"
              value={password}
              type="password"
              onChange={(e) => handleInputChange(e, 'password')}
              error={!!error}
              fullWidth
            />
            <Button disabled={!canSubmit} fullWidth onClick={handleSubmit} variant="contained" color="primary">
              Sign In
            </Button>
          </div>
          <div className={classes.error}>
            <Link href={passwordResetLink}>Reset Password</Link>
          </div>
        </Container>
      </div>
    </WindowHeightContainer>
  );
};

export default Login;
