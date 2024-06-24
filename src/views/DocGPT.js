import MenuIcon from '@mui/icons-material/Menu';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import {
    AppBar,
    Box,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    TextField,
    Toolbar,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import './DocGPT.css';

const DocGPT = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            setInput('');
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <Box className="chat-container">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleSidebar}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">DocGPT</Typography>
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onClick={toggleSidebar}
                    onKeyDown={toggleSidebar}
                >
                    <List>
                        <ListItem button key={'Settings'}>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Settings'} />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
            <Paper className="chat-window" elevation={3}>
                <List>
                    {messages.map((message, index) => (
                        <ListItem key={index} className={message.sender === 'user' ? 'message-user' : 'message-gpt'}>
                            <ListItemText primary={message.text} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <Box className="chat-input">
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <IconButton color="primary" onClick={handleSend}>
                    <SendIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default DocGPT;
