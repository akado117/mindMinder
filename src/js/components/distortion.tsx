import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/PlusOne';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { distortionTitles, distortionDescriptors, distortionImages, Distortions} from '../store/distortionsConfig'
import { headingTwo, paragraph } from '../styles/typography';
import { color } from '../styles/theme';
import { fontSize, minHeight, textAlign } from '@material-ui/system';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 345,
    },
    mediaContainer: {
      padding: '0 2rem'
    },
    media: {
      height: 0,
      paddingTop: '100%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
    titleText: {
      ...headingTwo,
      color: color.darkBlue,
      '& div': {
        minHeight: '7rem',
      }
    },
    description: {
      ...paragraph,
      color: color.darkBlue,
      fontSize: '16px'
    }
  }),
);

interface DistortionProps {
  distortionType: Distortions
}

export default function DistortionCard({distortionType}: DistortionProps) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        className={classes.titleText}
        title={distortionTitles[distortionType]}
      />
      <div className={classes.mediaContainer}>
        <CardMedia
          className={classes.media}
          image={`/imgs/distortions/${distortionImages[distortionType]}`}
          title={distortionTitles[distortionType]}
        />
      </div>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <p className={classes.description}>
            {distortionDescriptors[distortionType]}
          </p>
        </CardContent>
      </Collapse>
    </Card>
  );
}