const initialState = {
  latitude: 0,
  longitude: 0,
};

export default function weatherReducer(
  state = initialState,
  action: {
    type: any;
    latitude: number;
    longitude: number;
  },
) {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        latitude: action.latitude,
        longitude: action.longitude,
      };
    default:
      return state;
  }
}
