import {PayloadAction, createSlice} from '@reduxjs/toolkit';

interface IAirlinesItem {
  airlineCode: string;
  airlineName: string;
  flightNumber: string;
}

export interface IFlightsData {
  id: string;
  fare: number;
  displayData: {
    source: {
      airport: {
        cityCode: string;
        cityName: string;
        terminal: string;
        airportCode: string;
        airportName: string;
        countryCode: string;
        countryName: string;
      };
      depTime: string;
    };
    airlines: IAirlinesItem[];
    stopInfo: string;
    destination: {
      airport: {
        cityCode: string;
        cityName: string;
        terminal: string;
        airportCode: string;
        airportName: string;
        countryCode: string;
        countryName: string;
      };
      arrTime: string;
    };
    totalDuration: string;
  };
}

export interface IToLocationData {
  label: string;
  value: string;
}

export type IFlightsSliceInitialStateType = {
  flightsData: IFlightsData[];
  fromLocationdata: IToLocationData[];
  toLocationdata: IToLocationData[];
};

const initialState: IFlightsSliceInitialStateType = {
  flightsData: [],
  fromLocationdata: [
    {label: 'Delhi', value: '1'},
    {label: 'Mumbai', value: '2'},
    {label: 'Chennai', value: '3'},
  ],
  toLocationdata: [
    {label: 'Mumbai', value: '1'},
    {label: 'Delhi', value: '2'},
    {label: 'Chennai', value: '3'},
    {label: 'Indore', value: '4'},
    {label: 'Bhopal', value: '5'},
  ],
};

const flightsSlice = createSlice({
  name: 'flights',
  initialState: initialState as IFlightsSliceInitialStateType,
  reducers: {
    updateFlightsData: (state, action: PayloadAction<[]>) => {
      state.flightsData = action.payload;
    },
  },
});

export const {updateFlightsData} = flightsSlice.actions;

export default flightsSlice.reducer;
