/* eslint-disable  */
const palette = {
  primary: {
    main: '#000000',
  },
  secondary: {
    light: '#000000',
    main: '#E8963D',
  },
  linearProgress: {
    main: '#1976d2',
  },
  text: {
    primary: '#000000',
    secondary: '#000000',
  },
  customText: {
    white: '#fff',
    dark: '#3B4655',
    darkLight: '#6D7888',
    darkGrey: '#DBDBDB',
    lightBlackText: '#3B3A39',
    darkest: '#000',
    textReset: '#004F9A',
    lightGrey: '#555759',
  },
  customBorder: {
    darkGrey: '#DBDBDB',

  },
  customBackground: {
    grey: '#DEDEDE',
    lightBlue: '#4297D3',
    activeButtonBackground: '#0099D8',
    disabledBackground: '#f2f2f2',
    white: '#fff',
  },
  customShadowColor: {
    grey: '#1F3E6929',
  },
  customColor: {
    horizontalLineColor: '#CECECE',
  },
  whitebgbox:{
    borderRadius: "5px",
    width: "97%",
    marginTop: "20px",
    bgcolor: "white",
    height:"100%",
  },
  noAvailableText: {
    font: 'normal normal 600 12px/15px \'Segoe UI\' ',
    color: 'rgba(59, 70, 85, 1)',
  },
  commonWhiteBg: {
    bgcolor: '#eff6fc',
    // height: '78vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '0px',
  },
  AddNewTableButton: {
    'transform': 'translateY(-80px)',
    'marginBottom': '-70px',
    'backgroundColor': '#4297d3',
    'color': '#ffffff',
    'textTransform': 'none',
    'minWidth': '0',
    'padding': '5px 10px',
    'marginTop': '10px',
    'float': 'right',
    'font': 'normal normal 600 13px/19px \'Segoe UI\'',
    '&:hover': {
      backgroundColor: '#4297d3',
    },
    SaveandEdit: {'border': '1px solid gray',
    'display': 'flex', 'border': '0.5px solid #CECECE', 'borderRadius': '4px',
    'width': '58px', 'alignItems': 'center', 'gap': '5px', 'padding': '2px 6px',
    'cursor': 'pointer'}
  },
  AddFilterTableButton: {
    'backgroundColor': '#4297d3',
    'color': '#ffffff',
    'textTransform': 'none',
    'minWidth': '0',
    'width': '110px',
    'textAlign': 'center',
'height': '30px',
'borderRadius': '3px',
    'padding': '5px 10px',
    'float': 'right',
    'cursor': 'pointer',
    'font': 'normal normal 600 13px/19px \'Segoe UI\'',
    '&:hover': {
      backgroundColor: '#4297d3',
    },
  },
  TextArea: {
    padding: '5px'
  },
  filterDropdown: {minWidth: '144px',
  maxWidth: '144px',
  minHeight: '40px',
  marginTop: '13px',
  },
  filterSubmit: {width: '110px', height: '40px'},
  resetbutton: {width: '66px', height: '17px', whiteSpace: 'noWrap', fontSize: '12px'},
  filterheading: {width: '84px', height: '19px', whiteSpace: 'noWrap', fontSize: '14px', fontWeight: 'bold'},
  dropdownItemStyle: {'fontSize': '12px !important', 'whiteSpace': 'normal', 'fontFamily': 'Segoe UI', 'color': 'blue'},
  TableHead: {fontSize: '12px', display: 'flex', alignItems: 'center'},
  TableEdit: {width: '62px', height: '22px'},
};

export default palette;
