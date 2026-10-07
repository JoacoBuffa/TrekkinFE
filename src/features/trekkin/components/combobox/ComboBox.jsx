import { Autocomplete, TextField } from '@mui/material';

const ComboBox = ({ label, placeholder, options = [], value = null, onChange, loading = false, ...props }) => (
  <Autocomplete
    options={options}
    value={value}
    loading={loading}
    onChange={(_, nuevoValor) => onChange?.(nuevoValor)}
    noOptionsText="Sin resultados"
    loadingText="Cargando..."
    fullWidth
    renderInput={(params) => <TextField {...params} label={label} placeholder={placeholder} />}
    {...props}
  />
);

export default ComboBox;
