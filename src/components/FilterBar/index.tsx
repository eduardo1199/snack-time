import { Box, Input } from "@mui/material";

interface FilterBarProps {
  onChangeFilter: (value: string) => void;
  label: string;
}

export function FilterBar(props: FilterBarProps) {
 return(
  <Box width="100%" display="flex" justifyContent="center">
    <Input
      style={{
        color: 'white',
        width: '100%'
      }}
      placeholder={props.label}
      onChange={(e) => props.onChangeFilter(e.target.value)}
    />
  </Box>
 )
}