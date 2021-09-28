import React from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import { distortionImages } from '../store/distortionsConfig'
import DistortionCard from '../components/distortion'
import SidebarLayout from '../layout/SidebarLayout'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center'
    },
  }),
);

const distortions = Object.keys(distortionImages)

export default function Distortions() {

  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <SidebarLayout noPadding includeWindowHeightContainer allowOverflow>
      <Container className={classes.root}>
        {distortions.map(distortion => <DistortionCard distortionType={distortion} key={distortion} />)}
      </Container>
    </SidebarLayout>
  )
}