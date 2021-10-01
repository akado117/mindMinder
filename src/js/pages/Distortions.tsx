import React from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import { distortionImages } from '../store/distortionsConfig'
import DistortionCard from '../components/distortion'
import SidebarLayout from '../layout/SidebarLayout'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: '2rem',
      paddingBottom: '2rem',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
      columnGap: '1rem',
      rowGap: '2rem',
      justifyContent: 'center',
      [theme.breakpoints.between('xs','sm')]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
      },
      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: 'repeat(1, minmax(0, max-content))',
      }
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
        {distortions.map(distortion => <div><DistortionCard distortionType={distortion} key={distortion} /></div>)}
      </Container>
    </SidebarLayout>
  )
}