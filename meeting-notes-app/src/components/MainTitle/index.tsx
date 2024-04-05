import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { Link } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { NoteType } from '../../api/notes';
import { fetchNotes } from '../../api/notes';
import { useDebounce } from '../../hooks/useDebounce';


interface Props {
    onSearch: (notes: NoteType[]) => void;
} 

export default function MainTitle({onSearch}: Props) {
    const [showSearch, setShowSearch] = useState<Boolean>(true);
    const [searchValue, setSearchValue] = useState('');

    // Debounce the input value
    const debouncedSearchTerm = useDebounce(searchValue, 500);
    
    const handleSearchInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value)
    };
    // Effect for API call simulation
    useEffect(() => {
        try {
            fetchNotes(debouncedSearchTerm).then(res => {
                onSearch(res.data);
            });
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    }, [debouncedSearchTerm]);

    useEffect(() => {
        setShowSearch(location.pathname === '/');
    }, [location.pathname]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#2E8B57' }}>
                <Toolbar>
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
                        Notes
                    </Typography>
                    { showSearch && (
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconButton sx={{ outline: 'white'}} aria-label="search">
                                <SearchIcon sx={{ color: 'white' }} />
                            </IconButton>
                            <InputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                sx={{ color: 'white'}}
                                onChange={handleSearchInputChange}
                            />
                            <Link to="/note" style={{ textDecoration: 'none' }}> {/* Wrap IconButton with Link */}
                                <IconButton sx={{ color: 'white' }} aria-label="new note">
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </Link>
                        </Box>
                    )}

                </Toolbar>
            </AppBar>
        </Box>
    );
}