import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { spaceBetween } from 'CommunityApp/styles/layout';
import { color2 } from 'CommunityApp/styles/theme';
import { useAppSelector, useAppDispatch } from 'CommunityApp/hooks/storeHooks';
import {
  getProperties,
  getUnitsForProperty,
  getUnitsExternalSources,
  getUnitSwitchStatus,
  updatePropertyUnit,
  updatePropertyUnitUsageActive
} from 'CommunityApp/api/properties';
import {
  GuestyListing,
  setPropertyError,
  setSelectedProperty,
  setSelectedUnit,
  usageTypes,
  Property,
  Unit,
  UnitsExternalSource,
  UnitSwitchStatus
} from 'CommunityApp/store/propertySlice';
import UnitsExternalSourceDisplay from 'CommunityApp/components/UnitsExternalSource/UnitExternalSourceDisplay';
import PageHeader from 'CommunityApp/components/PageHeader';
import UnitActiveUsage from 'CommunityApp/components/UnitsExternalSource/UnitActiveUsage';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

type GenericObject = Record<string, unknown>;

const useStyles = makeStyles(() => ({
  autocompleteLabel: {
    '& label': {
      color: '#000000',
      fontSize: 14,
      lineHeight: '19px',
      fontFamily: 'Open Sans'
    },
    '& .MuiInputLabel-shrink': {
      transform: 'none'
    }
  },
  autocompleteDisabledLabel: {
    '& label.Mui-disabled': {
      color: 'inherit'
    }
  },
  error: {
    ...spaceBetween,
    backgroundColor: color2.warningBg,
    border: `3px solid ${color2.warning}`,
    borderRadius: '8px',
    padding: '1rem',
    width: '50%'
  },
  externalUnits: {
    paddingTop: 16
  },
  cardTitle: {
    fontSize: 14
  },
  listsContainer: {
    display: 'flex'
  },
  selectList: {
    marginRight: '2rem',
    width: '31rem'
  },
  subSelectList: {
    width: '21rem'
  },
  block: {
    display: 'block'
  },
  propertyUnitSelection: {
    display: 'flex'
  },
  status: {
    alignItems: 'center',
    color: '#4E4B66',
    display: 'flex',
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 13,
    lineHeight: '22px',
    letterSpacing: '0.25px',
    marginBottom: 5,
    marginTop: 26
  },
  dot: {
    borderRadius: '50%',
    height: 12,
    marginRight: 11,
    width: 12
  },
  active: {
    backgroundColor: '#00BA88'
  },
  pending: {
    backgroundColor: '#FFA500'
  },
  inactive: {
    backgroundColor: '#A30000'
  }
}));

interface ErrorProps {
  error: string;
  classes: ReturnType<typeof useStyles>;
  dispatch: ReturnType<typeof useAppDispatch>;
}
const PropertyError = ({ error, dispatch, classes }: ErrorProps) => {
  if (!error) return null;

  return (
    <Paper elevation={3} className={classes.error}>
      <div>{error}</div>
      <Button onClick={() => dispatch(setPropertyError(''))}>X</Button>
    </Paper>
  );
};

const renderGuestyListingItem = (className: string, option: GuestyListing) => {
  return (
    <div>
      <span className={className}>{`${option.nickname}: ${option.id}`}</span>
      {option.units_external_source && (
        <span className={className}>
          {`Property: ${option.units_external_source.unit?.property_id} | Unit: ${option.units_external_source.unit?.name}`}{' '}
        </span>
      )}
    </div>
  );
};

const renderUnitSwitchStatusText = (unitSwitchStatus: UnitSwitchStatus) => {
  if (unitSwitchStatus.status == 'active') {
    return `Active on ${unitSwitchStatus.value?.external_source}`;
  } else if (unitSwitchStatus.status == 'pending') {
    return `Pending switch to ${unitSwitchStatus.value?.external_source}`;
  } else {
    return 'unset';
  }
};

export default function UnitMapper() {
  const propertyState = useAppSelector((state) => state.property);
  const dispatch = useAppDispatch();
  const styles = useStyles(useTheme());

  const handlePropertySelect = (_event: React.ChangeEvent<GenericObject>, value: Property, _reason: string) => {
    dispatch(setSelectedProperty(value.id));
    dispatch(getUnitsForProperty(value.id));
  };

  const handleUnitSelect = (_event: React.ChangeEvent<GenericObject>, value: Unit, _reason: string) => {
    dispatch(getUnitSwitchStatus(value));
    dispatch(setSelectedUnit(value));
  };

  const isExternalSourceUsed = (listingId: string) => {
    return !!propertyState.unitsExternalSources.find((ues) => {
      return ues.external_id === listingId;
    });
  };

  const handleGuestySelect = (
    _event: React.ChangeEvent<GenericObject>,
    value: GuestyListing | null,
    _reason: string
  ) => {
    if (propertyState.selectedUnit && value) {
      const newExternalSources = [...propertyState.selectedUnit.units_external_sources];

      newExternalSources.push({
        external_source: 'guesty',
        external_id: value.id,
        unit_id: propertyState.selectedUnit.id,
        usage_type: usageTypes.unset
      });

      const updateUnit = { ...propertyState.selectedUnit, units_external_sources: newExternalSources };
      dispatch(updatePropertyUnit(updateUnit));
    }
  };

  const handleExternalSourceRemove = (removeUes: UnitsExternalSource) => {
    if (propertyState.selectedUnit) {
      const currentIndex = propertyState.selectedUnit.units_external_sources.findIndex(
        (ues) => ues.external_id === removeUes.external_id
      );
      const newExternalSources = [...propertyState.selectedUnit.units_external_sources];

      newExternalSources.splice(currentIndex, 1);

      const updateUnit = { ...propertyState.selectedUnit, units_external_sources: newExternalSources };
      dispatch(updatePropertyUnit(updateUnit));
    }
  };

  const handleUsageTypeChange = (
    event: React.ChangeEvent<HTMLInputElement | { name?: string | undefined; value: unknown }>,
    updatedUes: UnitsExternalSource
  ) => {
    if (propertyState.selectedUnit && updatedUes) {
      const newExternalSources = [...propertyState.selectedUnit.units_external_sources];
      const currentIndex = newExternalSources.findIndex((ues) => ues.external_id === updatedUes.external_id);

      newExternalSources[currentIndex] = {
        ...updatedUes,
        usage_type: event.target.value as string
      };

      const updateUnit = { ...propertyState.selectedUnit, units_external_sources: newExternalSources };
      dispatch(updatePropertyUnit(updateUnit));
    }
  };

  const handleUnitUsageChange = (
    _event: React.ChangeEvent<GenericObject>,
    value: UnitsExternalSource | null,
    _reason: string
  ) => {
    if (propertyState.selectedUnit && value) {
      dispatch(updatePropertyUnitUsageActive(propertyState.selectedUnit, value));
    }
  };

  let entrataExternalSources = [] as UnitsExternalSource[];
  let guestyExternalSources = [] as UnitsExternalSource[];

  if (propertyState.selectedUnit) {
    guestyExternalSources = propertyState.selectedUnit.units_external_sources.filter(
      (ues) => ues.external_source === 'guesty'
    );
    entrataExternalSources = propertyState.selectedUnit.units_external_sources.filter(
      (ues) => ues.external_source === 'entrata'
    );
  }

  useEffect(() => {
    dispatch(getUnitsExternalSources());
    dispatch(getProperties());
  }, []);

  return (
    <div>
      <PageHeader title="Unit Search and Details" />
      <PropertyError error={propertyState.error} dispatch={dispatch} classes={styles} />
      {propertyState.unitSwitchStatus && (
        <div className={styles.status}>
          <div className={`${styles.dot} ${styles[propertyState.unitSwitchStatus.status]}`}></div>
          {renderUnitSwitchStatusText(propertyState.unitSwitchStatus)}
        </div>
      )}
      <div className={styles.propertyUnitSelection}>
        <Autocomplete
          className={`${styles.selectList} ${styles.autocompleteLabel}`}
          options={propertyState.properties}
          getOptionLabel={(option: Property) => `${option.id} - ${option.name}`}
          onChange={handlePropertySelect}
          disableClearable
          id="propperty-select"
          autoComplete
          includeInputInList
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          renderInput={(params: any) => (
            <TextField {...params} label="Property Name" margin="normal" className={styles.selectList} />
          )}
        />
        <Autocomplete
          className={`${styles.selectList} ${styles.autocompleteLabel}`}
          options={propertyState.units}
          getOptionLabel={(option: Unit) => option.name}
          onChange={handleUnitSelect}
          disabled={propertyState.units.length === 0}
          disableClearable
          id="unit-select"
          autoComplete
          includeInputInList
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          renderInput={(params: any) => (
            <TextField {...params} label="Unit Name" margin="normal" className={styles.selectList} />
          )}
        />
      </div>
      <div>
        {propertyState.selectedUnit && propertyState.guestyListings.length > 0 && (
          <div>
            <Autocomplete
              className={`${styles.autocompleteLabel} ${styles.autocompleteDisabledLabel}`}
              options={entrataExternalSources}
              getOptionLabel={(option: UnitsExternalSource) => option.external_id}
              disabled
              id="entrata-select"
              autoComplete
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              renderInput={(params: any) => (
                <TextField {...params} label="Entrata ID" margin="normal" className={styles.subSelectList} />
              )}
              value={entrataExternalSources[0] || null}
            />
            <Autocomplete
              className={styles.autocompleteLabel}
              options={propertyState.guestyListings}
              getOptionLabel={(option: GuestyListing) => `${option.nickname}: ${option.id}`}
              renderOption={(option: GuestyListing) => renderGuestyListingItem(styles.block, option)}
              getOptionDisabled={(option: GuestyListing) => isExternalSourceUsed(option.id)}
              onChange={handleGuestySelect}
              id="guesty-select"
              autoComplete
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              renderInput={(params: any) => (
                <TextField {...params} label="Guesty Listing IDs" margin="normal" className={styles.subSelectList} />
              )}
            />
          </div>
        )}
        {propertyState.selectedUnit && (
          <div className={styles.externalUnits}>
            <UnitsExternalSourceDisplay
              associatedGuestyListings={guestyExternalSources}
              handleUsageTypeChange={handleUsageTypeChange}
              handleExternalSourceRemove={handleExternalSourceRemove}
            />
          </div>
        )}
      </div>
      {propertyState.selectedUnit && (
        <UnitActiveUsage
          unit={propertyState.selectedUnit}
          handleUnitUsageChange={handleUnitUsageChange}
          disabled={propertyState.unitSwitchStatus?.status === 'pending'}
        />
      )}
    </div>
  );
}
