import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { rem } from 'csx';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import { goTo } from '../hooks/utils';
import SidebarLayout from '../layout/SidebarLayout';
import theme, { color } from '../styles/theme';
import { buttonPrimary } from '../styles/button';
import { headingOne, textBase } from '../styles/typography';
import { flex, horizontalRule, columnStack, center, rowStack } from '../styles/layout';
import { path } from '../routes/Routes';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { login, createAccount } from '../api/sessions';
import { AppDispatch } from '../store/store';
import { AuthError } from '../api/firebase';

const emailRegex = RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'i')
const whitespaceRegex = /\s/g

interface FormState {
  email: {
    email: string
    dirty: boolean
  }
  password: {
    password: string
    dirty: boolean
  }
}

interface signUpFormState {
  email: {
    email: string
    dirty: boolean
  }
  username: {
    username: string
    dirty: boolean
  }
  password: {
    password: string
    dirty: boolean
  }
  passwordRepeat: {
    passwordRepeat: string
    dirty: boolean
  }
}

interface LocationState {
  from: {
    pathname: string
  }
  originalDestination: string
}

const useStyles = makeStyles({
  container: {
    ...textBase,

    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center bottom',
    flexGrow: 1,
    padding: '2rem',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: rem(1),
    paddingRight: rem(1),
    maxWidth: 375,
  },
  loginForm: {
    ...flex,
    ...columnStack('2rem'),
    alignItems: 'center',
    '& button': {
      padding: '10px 20px',
      width: '75%',
      borderRadius: '20px',
      backgroundColor: color.white,
    },
  },
  error: {
    ...center,
    width: '100%',
    padding: '1rem',
  },
  titleMain: {
    ...headingOne,
    marginTop: '1rem',
    marginBottom: '2rem',
    textAlign: 'center',
  },
  titleSmall: {
    ...headingOne,
    ...horizontalRule,
    fontSize: 24,
    fontStyle: 'italic',
    lineHeight: 2.38,
    letterSpacing: -0.05,
    color: color.white,
  },
  loginButton: buttonPrimary,
  resetLink: {
    ...center,
    ...rowStack('2rem'),
    width: '100%',
    padding: '1rem',
    '& > a': {
      color: color.white,
      fontWeight: 'bold',
      fontSize: 18,
    },
  },
})

interface HeadingProps {
  classes: ReturnType<typeof useStyles>
}

const Heading = ({ classes }: HeadingProps) => (
  <h1 className={classes.titleMain}>
    Welcome back
    <span className={`${classes.titleSmall}`}>to</span>
    <span>Cuminu</span>
  </h1>
);
// type tErrorMessages = {
//   [key: string]: string;
// };

// const errorMessages: tErrorMessages = {
//   invalid_authentication: 'Invalid Username or Password',
//   account_deactivated: 'Account Deactivated! Please contact an admin',
//   other: 'Unknown Error'
// };
interface ErrorProps {
  error: null | AuthError;
}

function DisplayError({ error }: ErrorProps) {
  if (!error) return null

  // const errorType = (error && error.data && error.data?.error?.code) || 'other';

  return <Chip label={error.message} style={{fontSize: "18px"}} color="secondary" />;
}

interface LoginFormProps {
  classes: ReturnType<typeof useStyles>
  dispatch: AppDispatch
}

const LoginForm = ({ classes, dispatch }: LoginFormProps) => {
  const [state, setState] = useState<FormState>({
    email: { email: '', dirty: false },
    password: { password: '', dirty: false },
  })

  const {
    email: { email },
    password: { password },
  } = state

  const emailValid = emailRegex.test(email)
  const passwordValid = password.length >= 8

  const canSubmit = emailValid && passwordValid

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: 'email' | 'password',
  ) => setState({ ...state, ...{ [key]: { [key]: event.currentTarget.value, dirty: true } } })

  const handleSubmit = (e: React.SyntheticEvent) => {
    console.log('davik')
    e.preventDefault()
    dispatch(login({ email, password }))
  }
  return (
    <form onSubmit={handleSubmit} className={classes.loginForm}>
      <TextField
        color="primary"
        label="Email"
        value={email}
        type="email"
        onChange={e => handleInputChange(e, 'email')}
        error={state.email.dirty && !emailValid}
        helperText={state.email.dirty && !emailValid && 'Invalid Email'}
        fullWidth
      />
      <TextField
        color="primary"
        label="Password"
        value={password}
        type="password"
        onChange={e => handleInputChange(e, 'password')}
        error={state.password.dirty && !passwordValid}
        helperText={state.password.dirty && !passwordValid && 'Password shorter than 8 characters'}
        fullWidth
      />
      <Button disabled={!canSubmit} fullWidth variant="contained" className={classes.loginButton} type="submit">
        Sign In
      </Button>
    </form>
  )
}

const SignupForm = ({ classes, dispatch }: LoginFormProps) => {
  const [state, setState] = useState<signUpFormState>({
    email: { email: '', dirty: false },
    username: { username: '', dirty: false },
    password: { password: '', dirty: false },
    passwordRepeat: { passwordRepeat: '', dirty: false },
  })

  const { email: { email }, password: { password }, username: { username }, passwordRepeat: { passwordRepeat } } = state;

  const validation = {
    email: emailRegex.test(email),
    password: password.length >= 8,
    passwordRepeat: passwordRepeat === password,
    username: username.length > 3 && !whitespaceRegex.test(username)
  }

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof signUpFormState,
  ) => setState({ ...state, ...{ [key]: { [key]: event.currentTarget.value, dirty: true } } })

  function handleValidation(field: keyof signUpFormState, errorText: string) {
    return state[field].dirty && !validation[field] && errorText
  }

  const goToRick = goTo('rick')

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (Object.values(validation).indexOf(false) === -1) {
      dispatch(createAccount({ email, password, username })).then(() => goToRick(e));
    }
  }
  return (
    <form onSubmit={handleSubmit} className={classes.loginForm}>
      <TextField
        color="primary"
        label="Email"
        value={email}
        type="email"
        onChange={e => handleInputChange(e, 'email')}
        error={!!handleValidation('email', 'Invalid Email')}
        helperText={handleValidation('email', 'Invalid Email')}
        fullWidth
      />
      <TextField
        color="primary"
        label="UserName"
        value={username}
        type="text"
        onChange={(e) => handleInputChange(e, 'username')}
        error={!!handleValidation('username', "Must be longer than 3 characters")}
        helperText={handleValidation('username', "Must be longer than 3 characters and have no spaces")}
        fullWidth
      />
      <TextField
        color="primary"
        label="Password"
        value={password}
        type="password"
        onChange={e => handleInputChange(e, 'password')}
        error={!!handleValidation('password', 'Password is shorter than 8 characters')}
        helperText={handleValidation('password', 'Password is shorter than 8 characters')}
        fullWidth
      />
      <TextField
        color="primary"
        label="Verify Password"
        value={passwordRepeat}
        type="password"
        onChange={e => handleInputChange(e, 'passwordRepeat')}
        error={!!handleValidation('passwordRepeat', 'Passwords must match')}
        helperText={handleValidation('passwordRepeat', 'Passwords must match')}
        fullWidth
      />
      <Button
        disabled={Object.values(validation).indexOf(false) !== -1}
        fullWidth
        variant="contained"
        className={classes.loginButton}
        type="submit"
      >
        Sign Up
      </Button>
    </form>
  )
}

interface LoginProps {
  type?: 'login' | 'signup' | 'reset'
}

const Login = ({ type }: LoginProps) => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);
  const [formType, setFormType] = useState<LoginProps["type"]>(type || 'login')

  const classes = useStyles(theme);
  const history = useHistory();
  const location = useLocation<LocationState>();

  const { isAuthenticated } = authState

  // Will redirect if isAuthenticated is true
  if (isAuthenticated) {
    // redirect if user was trying to access a different page
    const destination = location.state ? location.state.originalDestination : path.home
    history.replace(path.login, {})
    history.push(destination)
  }

  // If error occurs, reset local state
  // const previousErrorValue = usePrevious<string | null>(error);
  // if (!previousErrorValue && error) console.log('winning');

  let form
  if (formType === 'login') {
    form = <LoginForm classes={classes} dispatch={dispatch} />
  } else if (formType === 'signup') {
    form = <SignupForm classes={classes} dispatch={dispatch} />
  }

  const signupSigninLink =
    formType === 'login' ? (
      <a onClick={() => setFormType('signup')}>Sign Up</a>
    ) : (
      <a onClick={() => setFormType('login')}>Login</a>
    )

  return (
    <SidebarLayout noPadding includeWindowHeightContainer allowOverflow>
      <div className={classes.container}>
        <Container maxWidth="sm">
          <Heading classes={classes} />
          <div className={classes.error}>
            <DisplayError error={authState.error} /> 
          </div>
          {form}
          <div className={classes.resetLink}>
            {signupSigninLink}
            <a onClick={() => setFormType('reset')}>Reset Password</a>
          </div>
        </Container>
      </div>
    </SidebarLayout>
  )
}

export default Login
