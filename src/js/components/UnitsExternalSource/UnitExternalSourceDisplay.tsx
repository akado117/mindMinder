import React, { FunctionComponent } from 'react';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { usageTypes, UnitsExternalSource } from 'CommunityApp/store/propertySlice';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import CardContent from '@material-ui/core/CardContent';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      background: '#F6F9FC',
      border: '2px solid #D0D1D2',
      boxSizing: 'border-box',
      borderRadius: 8,
      height: 92,
      minWidth: 260,
      padding: '6px 8px 6px 18px'
    },
    cardHeader: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      textTransform: 'capitalize'
    },
    cardFooter: {
      display: 'flex',
      marginTop: 2,
      '& > div::before, & > div::after': {
        borderBottom: 'none'
      },
      '& > div': {
        paddingBottom: 5
      }
    },
    cardItemPadding: {
      padding: 0
    },
    cardFont: {
      color: '#4E4B66',
      fontFamily: 'Poppins',
      fontStyle: 'normal',
      fontSize: 13,
      letterSpacing: 0.25,
      lineHeight: '22px'
    },
    footerLabel: {
      display: 'flex',
      marginRight: 5,
      transform: 'none'
    },
    select: {
      '& > select.MuiSelect-select': {
        padding: '0 8px 0 0'
      }
    },
    removeButton: {
      color: '#000000'
    }
  })
);

interface Props {
  associatedGuestyListings: UnitsExternalSource[];
  handleUsageTypeChange: (
    event: React.ChangeEvent<HTMLInputElement | { name?: string | undefined; value: unknown }>,
    updatedUes: UnitsExternalSource
  ) => void;
  handleExternalSourceRemove: (removeUes: UnitsExternalSource) => void;
}

const UnitsExternalSourceDisplay: FunctionComponent<Props> = ({
  handleExternalSourceRemove,
  handleUsageTypeChange,
  associatedGuestyListings
}) => {
  const styles = useStyles(useTheme());

  return (
    <Grid container spacing={1}>
      {associatedGuestyListings.map((ues) => {
        return (
          <Grid key={`${ues.external_source}-${ues.external_id}`} item xs="auto">
            <Card className={styles.card}>
              <CardContent className={styles.cardItemPadding}>
                <Typography className={`${styles.cardHeader} ${styles.cardFont}`} variant="h5" component="h2">
                  {ues.external_source}
                  <IconButton
                    className={styles.removeButton}
                    color="inherit"
                    onClick={() => handleExternalSourceRemove(ues)}
                    size="small"
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </Typography>
                <Typography className={styles.cardFont}>{ues.external_id}</Typography>
              </CardContent>
              <CardContent className={`${styles.cardItemPadding} ${styles.cardFooter}`}>
                <InputLabel className={`${styles.cardFont} ${styles.footerLabel}`} htmlFor="usage-type-select">
                  Usage Type:
                </InputLabel>
                <Select
                  className={`${styles.cardFont} ${styles.select}`}
                  native
                  value={ues.usage_type || usageTypes.unset}
                  onChange={(e) => handleUsageTypeChange(e, ues)}
                  inputProps={{
                    name: 'usage-type',
                    id: 'usage-type-select'
                  }}
                >
                  {Object.entries(usageTypes).map(([key, label]) => {
                    return (
                      <option key={`usage-type-${key}`} value={key}>
                        {label}
                      </option>
                    );
                  })}
                </Select>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default UnitsExternalSourceDisplay;
