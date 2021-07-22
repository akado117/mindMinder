import React, { FunctionComponent } from 'react';
import { isAfter, isWithinRange } from 'date-fns';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { Unit, UnitsExternalSource } from './store/propertySlice';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(() =>
  createStyles({
    selectList: {
      width: '43rem'
    }
  })
);

interface Props {
  disabled: boolean;
  unit: Unit;
  handleUnitUsageChange: (
    _event: React.ChangeEvent<Record<string, unknown>>,
    value: UnitsExternalSource | null,
    _reason: string
  ) => void;
}

const activeExternalSource = (unit: Unit) => {
  const currentUua = unit.unit_usage_active.find((uua) => {
    const startDate = new Date(uua.start_date);
    const endDate = uua.end_date && new Date(uua.end_date);
    const today = new Date();

    if (endDate && isWithinRange(today, startDate, endDate)) {
      // End date exists and current date is between the start + end
      return true;
    } else if (!endDate && isAfter(today, startDate)) {
      // No end date AND start date <= today
      return true;
    }

    return false;
  });

  return currentUua && unit.units_external_sources.find((ues) => ues.id == currentUua.units_external_source_id);
};

const UnitActiveUsage: FunctionComponent<Props> = ({ unit, handleUnitUsageChange, disabled }) => {
  const styles = useStyles(useTheme());

  const currentUsage = activeExternalSource(unit);

  const usableUsages = unit.units_external_sources.filter((ues) => ues.usage_type);

  return (
    <div className={styles.selectList}>
      <Autocomplete
        options={usableUsages}
        getOptionLabel={(option: UnitsExternalSource) =>
          `${option.external_source}-${option.external_id}: ${option.usage_type}`
        }
        disabled={disabled}
        getOptionDisabled={(option: UnitsExternalSource) => option.id == currentUsage?.id}
        value={currentUsage}
        disableClearable
        onChange={handleUnitUsageChange}
        id="unit-usage-active-select"
        autoComplete
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        renderInput={(params: any) => (
          <TextField {...params} label="Current Use" margin="normal" className={styles.selectList} />
        )}
      />
    </div>
  );
};

export default UnitActiveUsage;
