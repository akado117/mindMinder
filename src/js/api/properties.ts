import { AppDispatch } from 'CommunityApp/store/store';
import {
  setProperties,
  setLoading,
  setGuestyListings,
  setPropertyError,
  setSelectedUnit,
  setUnits,
  setUnitsExternalSources,
  setUnitSwitchStatus,
  updateUnits,
  Unit,
  UnitsExternalSource,
  PropertyApiResponse,
  PropertyUnitsApiResponse,
  GuestyListingsApiResponse,
  UnitsExternalSourcesApiResponse
} from 'CommunityApp/store/propertySlice';
import api, { Data } from 'CommunityApp/api/client';

export const getProperties = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    api
      .get<PropertyApiResponse, Data>('/properties', {})
      .then((response) => {
        dispatch(setProperties(response.properties));
        dispatch(setLoading(false));
      })
      .catch((e) => {
        dispatch(setLoading(false));
        // Report error to common error notification reducer?
        throw new Error(e);
      });
  };
};

export const getGuestyListings = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    api
      .get<GuestyListingsApiResponse, Data>('/guesty_listings', {})
      .then((response) => {
        dispatch(setGuestyListings(response.listings));
        dispatch(setLoading(false));
      })
      .catch((e) => {
        dispatch(setLoading(false));
        // Report error to common error notification reducer?
        throw new Error(e);
      });
  };
};

export const getUnitsForProperty = (propertyId: number) => {
  return (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    api
      .get<PropertyUnitsApiResponse, Data>(`/properties/${propertyId}/units`, {})
      .then((response) => {
        dispatch(setUnits(response.units));
        dispatch(setLoading(false));
      })
      .catch((e) => {
        dispatch(setLoading(false));
        dispatch(setUnits([]));
        // Report error to common error notification reducer?
        throw new Error(e);
      });
  };
};

export const getUnitsExternalSources = () => {
  return (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    api
      .get<UnitsExternalSourcesApiResponse, Data>(`/units_external_sources`, {})
      .then((response) => {
        dispatch(setUnitsExternalSources(response));
        dispatch(getGuestyListings());
        dispatch(setLoading(false));
      })
      .catch((e) => {
        dispatch(setLoading(false));
        throw new Error(e);
      });
  };
};

export const updatePropertyUnit = (params: Unit) => {
  return (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    api
      .put<Unit, Unit>(`/properties/${params.property_id}/units/${params.id}`, params)
      .then((response) => {
        dispatch(setSelectedUnit(response));
        dispatch(updateUnits(response));
        dispatch(getUnitsExternalSources());
      })
      .catch((e) => {
        dispatch(setLoading(false));
        dispatch(setPropertyError(e.message));
      });
  };
};

export const updatePropertyUnitUsageActive = (unit: Unit, params: UnitsExternalSource) => {
  return (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    api
      .put<Unit, UnitsExternalSource>(`/properties/${unit.property_id}/units/${unit.id}/usage_type`, params)
      .then((response) => {
        dispatch(setSelectedUnit(response));
        dispatch(updateUnits(response));
        dispatch(getUnitsExternalSources());
      })
      .catch((e) => {
        dispatch(setLoading(false));
        dispatch(setPropertyError(e.message));
      });
  };
};

export const getUnitSwitchStatus = (unit: Unit) => {
  return (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    api
      .get<Unit, Unit>(`/properties/${unit.property_id}/units/${unit.id}/switch_status`, {})
      .then((response) => {
        dispatch(setUnitSwitchStatus(response));
      })
      .catch((e) => {
        dispatch(setLoading(false));
        dispatch(setPropertyError(e.message));
      });
  };
};
