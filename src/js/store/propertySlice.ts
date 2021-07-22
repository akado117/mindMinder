import { createSlice } from '@reduxjs/toolkit';
import { Data } from './api/client';

export interface PropertyApiResponse {
  properties: Data[];
}

export interface PropertyUnitsApiResponse {
  units: Data[];
}

export interface GuestyListingsApiResponse {
  listings: Data[];
}

export interface UnitsExternalSourcesApiResponse {
  units_external_sources: Data[];
}

export interface UnitSwitchStatusApiResponse {
  status: string;
  value: UnitsExternalSource | null;
}

export type Property = {
  id: number;
  name: string;
  address: string;
};

export type UnitsExternalSource = {
  id?: number;
  unit_id: number;
  external_source: string;
  external_id: string;
  usage_type: string;
  unit?: Unit;
};

export type UnitUsageActive = {
  units_external_source_id: number;
  start_date: string;
  end_date?: string;
};

export type Unit = {
  id: number;
  name: string;
  units_external_sources: UnitsExternalSource[];
  unit_usage_active: UnitUsageActive[];
  property_id: number;
};

export type GuestyListing = {
  id: string;
  nickname: string;
  units_external_source?: UnitsExternalSource;
};

enum UnitSwitchStatusTypes {
  Active = 'active',
  Pending = 'pending',
  Inactive = 'inactive'
}

export type UnitSwitchStatus = {
  status: UnitSwitchStatusTypes;
  value: UnitsExternalSource | null;
};

export type PropertyState = {
  properties: Property[];
  units: Unit[];
  unitsExternalSources: UnitsExternalSource[];
  unitSwitchStatus: UnitSwitchStatus | null;
  guestyListings: GuestyListing[];
  loading: boolean;
  selectedProperty: string;
  selectedUnit: Unit | null;
  error: string;
};

export const usageTypes = {
  unset: '',
  less_than_30_stay: '< 30 Stay',
  furnished_30_plus: 'Furnished 30+',
  less_than_30_homeshare: '< 30 Homeshare'
};

const initialState: PropertyState = {
  properties: [],
  units: [],
  unitsExternalSources: [],
  unitSwitchStatus: null,
  guestyListings: [],
  loading: false,
  selectedProperty: '',
  selectedUnit: null,
  error: ''
};

export const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setProperties: (state, action) => {
      state.properties = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setSelectedProperty: (state, action) => {
      state.selectedProperty = action.payload;
    },
    setPropertyError: (state, action) => {
      state.error = action.payload;
    },
    setUnits: (state, action) => {
      state.units = action.payload;
    },
    setUnitsExternalSources: (state, action) => {
      state.unitsExternalSources = action.payload;
    },
    setSelectedUnit: (state, action) => {
      state.selectedUnit = action.payload;
    },
    setUnitSwitchStatus: (state, action) => {
      state.unitSwitchStatus = action.payload;
    },
    setGuestyListings: (state, action) => {
      state.guestyListings = action.payload;
    },
    updateUnits: (state, action) => {
      const newUnits = state.units;
      const unitIdx = newUnits.findIndex((unit) => unit.id === action.payload.id);
      newUnits[unitIdx] = action.payload;

      state.units = newUnits;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  setProperties,
  setLoading,
  setPropertyError,
  setSelectedProperty,
  setSelectedUnit,
  setUnits,
  updateUnits,
  setUnitsExternalSources,
  setGuestyListings,
  setUnitSwitchStatus
} = propertySlice.actions;

export default propertySlice.reducer;
