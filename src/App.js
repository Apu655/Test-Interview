import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import selectors from "./utils/selectors";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Result from './components/Result';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


const App = () => {
  const theme = useTheme();

  const [name,setName] = React.useState("")
  const [item, setItem] = React.useState([]);
  const [agreement,setAgreement] = React.useState(false)
  const [submit,setSubmit] = React.useState(false)
  const [errorMessage,setErrorMessage] = React.useState("")


  const handleSelector = (event) => {
    const {target: { value } } = event;
    setItem(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
    console.log(item)
  };

  const handleName = (event)=>{
    const {target: { value } } = event;
    setName(value)
    console.log(name)
  }

  const handleSubmit = ()=>{
    if (name && agreement && item){
      setSubmit(true)
    }
    else if(!item){
      setSubmit(false)
      setErrorMessage("Please fill out the all the fields")
    }
    else if(!agreement){
      setSubmit(false)
      setErrorMessage("Please fill out the all the fields")
    }
    else if(!name){
      setSubmit(false)
      setErrorMessage("Please fill out the all the fields")
    }
    else{
      console.log("Git update")
    }
  }

  return (
    <div className='w-96 mx-auto h-screen flex items-center flex-col'>
      <form>
        <h3 className='m-1 py-2 font-semibold text-center text-xl w-[100%]'>Please enter your name and pick the Sectors you are currently involved in</h3>
        <Box
            sx={{
            width: "100%",
            maxWidth: '100%',
            m:1
          }}
        >
        <TextField onChange={handleName} value={name} fullWidth label="Enter you name" id="fullWidth" />
        </Box>
        <FormControl sx={{ m: 1, width: "100%" }}>
          <InputLabel id="demo-multiple-chip-label">Select</InputLabel>
          <Select
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={item}
            onChange={handleSelector}
            input={<OutlinedInput id="select-multiple-chip" label="Select" />}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >


            {selectors.map((selector) => (
              <MenuItem
                key={selector.value}
                value={selector.option}
                style={getStyles(selector.option, item, theme)}
              >
                {selector.option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel 
        sx={{

          m:.0
        }}
        control={<Checkbox  
          checked={agreement}
          onChange={()=>setAgreement(!agreement)}
          
        />} label="I agree to the terms and conditions" />
        <Button 
        sx={{
          width: "100%",
          maxWidth: '100%',
          m:1
        }}
        onClick={handleSubmit}
        variant="contained">Submit</Button>
      </form>
      {
        submit?
      (<Result name={name} agreement={agreement} item={item}/>)
      :(<p className='text-red-400'>{errorMessage}</p>)
      }
    </div>
  )
}

export default App