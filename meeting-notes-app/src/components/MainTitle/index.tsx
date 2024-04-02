import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function MainTitle() {
    return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
        <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Notes
            </Typography>
            <Link to="note">
                <Link to="/note">
                    <Typography color="white">
                        New
                    </Typography>
                </Link>
            </Link>
        </Toolbar>
        </AppBar>
    </Box>
    );
}