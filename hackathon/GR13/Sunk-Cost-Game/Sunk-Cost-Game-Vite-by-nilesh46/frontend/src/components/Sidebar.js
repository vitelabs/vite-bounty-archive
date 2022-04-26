import React, { useState } from "react";
import {
    IconButton,
    Typography,
    Button,
    List,
    ListItem,
    ListItemText,
    Drawer,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const theme = useTheme();

    return (
        <div>
            <Drawer
                open={openDrawer}
                anchor={"right"}
                onClose={() => setOpenDrawer(false)}
            >
                <List
                    sx={{
                        background: `${theme.palette.background.navbar}`,
                        flexGrow: 1,
                    }}
                >
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Button to="/" component={Link}>
                                <Typography color={theme.palette.white}>
                                    Home
                                </Typography>
                            </Button>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Button to="/pots" component={Link}>
                                <Typography color={theme.palette.white}>
                                    Pots
                                </Typography>
                            </Button>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Button to="/createpot" component={Link}>
                                <Typography color={theme.palette.white}>
                                    Create Pot
                                </Typography>
                            </Button>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <Button to="/profile" component={Link}>
                            <Typography color={theme.palette.white}>
                                Profile
                            </Typography>
                        </Button>
                    </ListItem>
                </List>
            </Drawer>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon />
            </IconButton>
        </div>
    );
};

export default Sidebar;
