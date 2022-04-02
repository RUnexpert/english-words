import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, MenuItem } from '@mui/material';

export const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleTabs = (page: string) => (e: React.SyntheticEvent) => {
    navigate(page);
  };

  return (
    <AppBar position="static">
      <Toolbar disableGutters>
        <Box sx={{ flexGrow: 1, display: 'flex' }}>
          <MenuItem onClick={handleTabs('/')}>Game</MenuItem>
          <MenuItem onClick={handleTabs('/statistics')}>Statistics</MenuItem>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
