import { Link, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { ThemeContext } from "./AppTheme";
import { useContext } from "react";


export function NavMenu() {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path;
    };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="home"
          sx={{ mr: 2 }}
          component={Link}
          to="/"
        >
          <StorefrontIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Tools Bazaar
        </Typography>
              <Button component={Link} to="/all-products" color="inherit"
              sx={{ backgroundColor: isActive("/all-products") ? "grey" : "transparent" }}
              >
          All products
         </Button>

        <button onClick={toggleDarkMode}>
            {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
              <IconButton color="inherit" onClick={toggleDarkMode}>
                  {darkMode ? "Light Mode" : "Dark Mode"}
              </IconButton>

      </Toolbar>
    </AppBar>
  );
}
