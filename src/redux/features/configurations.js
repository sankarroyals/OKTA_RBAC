/* eslint-disable camelcase */
/* eslint-disable max-len */
import {createSlice} from '@reduxjs/toolkit';


export const configureCallSlice = createSlice(
    {
      name: 'apiCall',
      initialState: {
        selectedConfiguration: '',
        selectedSortName: '',
        selectedSortType: '',
        selectedUniMasterFilterValue: [],
        selectedUniConversionFilterValue: [],
        selectedPlayBookDropDown: [],
        selectedBuyPlanFilterValue: [],
        selectedRoleAccessValue: [],
        selectedCurrencyFilterValue: [],
        selectedCurrencyConversionFilterValue: [],
        selectedCategoryFilterValue: [],
        selectedForecastDropDown: {},
        selectedCommodityFilterValue: [],
        selectedSubCommodityFilterValue: [],
        selectedMasterSectorValue: [],
        selectedSectorValue: [],
        selectedCountryValue: [],
        selectedGuidancePrice: [],

        reloaddata: '',
        forecastSendToAtlasFx: [],
        forecastsaveButton: 'false',
        HistoricalsaveButton: 'false',
        linkingLoad: false,
        ForecastUpdateSaveButton: true,
      },
      reducers: {
        setselectedConfiguration: (state, action) =>{
          state.selectedConfiguration = action.payload;
        },
        setSelectedUnitMaster: (state, action) =>{
          state.selectedUniMasterFilterValue = action.payload;
        },
        setSelectedUnitConversion: (state, action) =>{
          state.selectedUniConversionFilterValue = action.payload;
        },
        setSelectedCurrencyConversion: (state, action) =>{
          state.selectedCurrencyConversionFilterValue = action.payload;
        },
        setSelectedPlayBook: (state, action) =>{
          state.selectedPlayBookFilterValue = action.payload;
        },
        setCurrencySelected: (state, action) =>{
          state.selectedCurrencyFilterValue = action.payload;
        },
        setPlayBookFilter: (state, action) =>{
          state.selectedPlayBookDropDown = action.payload;
        },
        setBuyPlanFilter: (state, action) =>{
          state.selectedBuyPlanFilterValue = action.payload;
        },
        setRoleAccessFilter: (state, action) =>{
          state.selectedRoleAccessValue = action.payload;
        },
        setCategoryFilter: (state, action) =>{
          state.selectedCategoryFilterValue = action.payload;
        },
        setGuidancePriceFilter: (state, action) =>{
          state.selectedGuidancePrice = action.payload;
        },

        setCommodityFilter: (state, action) =>{
          state.selectedCommodityFilterValue = action.payload;
        },
        setSubCommodityFilter: (state, action) =>{
          state.selectedSubCommodityFilterValue = action.payload;
        },
        setMasterSectorFilter: (state, action) =>{
          state.selectedMasterSectorValue = action.payload;
        },
        setSectorFilter: (state, action) =>{
          state.selectedSectorValue = action.payload;
        },
        setSortFilter: (state, action) =>{
          state.selectedSortName = action.payload;
        },
        setSortType: (state, action) =>{
          state.selectedSortType = action.payload;
        },
        setCountryFilter: (state, action) =>{
          state.selectedCountryValue = action.payload;
        },
        setReloadData: (state, action) =>{
          state.reloaddata = action.payload;
        },
        setForeCastSendToAtlasFx: (state, action) =>{
          state.forecastSendToAtlasFx = action.payload;
        },
        setForeCastSaveButton: (state, action) =>{
          state.forecastsaveButton = action.payload;
        },
        setHistoricalsaveButton: (state, action) =>{
          state.HistoricalsaveButton = action.payload;
        },
        setForecastUpdatesaveButton: (state, action) =>{
          state.ForecastUpdateSaveButton = action.payload;
        },
        setlinkingLoad: (state, action) =>{
          state.linkingLoad = action.payload;
        },
      },
    });


export const {setselectedConfiguration, setForecastUpdatesaveButton, setlinkingLoad, setForeCastSaveButton, setHistoricalsaveButton, setGuidancePriceFilter, setForeCastSendToAtlasFx, setReloadData, setRoleAccessFilter, setBuyPlanFilter, setSectorFilter, setSortType, setSortFilter, setCommodityFilter, setSubCommodityFilter, setMasterSectorFilter, setSelectedUnitMaster, setSelectedPlayBook, setCurrencySelected, setSelectedUnitConversion, setPlayBookFilter, setSelectedCurrencyConversion, setCategoryFilter, setCountryFilter} = configureCallSlice.actions;


// this is for configureStore
export default configureCallSlice.reducer;
