import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu"
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material";

//import HomeBG from "../Assets/images/homebg.jpg";
import HomeBGNew from "../Assets/images/homebg_new.jpg";
import TapiokaLogo from "../Assets/images/tapioka.png";

import { pagesValues } from "./HeaderPages";

import styled from "@emotion/styled";

// modify background-position to shift mobile-view around
const HeaderContainer = styled.div`
  background-image: url(${HomeBGNew});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 60% center;
  width: 100%;
  height: 100vh;
`;

const HeaderTextContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  min-height: 90%;
  width: 100%;
  overflow-wrap: anywhere;
`;

const fontTheme = createTheme(
  {
    typography: {
      fontFamily: [
        'Signika',
        'sans-serif',
      ].join(','),
    },
  }
);

const colorHeaderTheme = createTheme(
  {
    palette: {
      primary: {
        main: "#DD7D6C" //"#E35239AA" 
      },
    },
  }
);

type Props = {
  isMobile: boolean,
  scrollPosition: number,
  scrollChangePosition: number,
}

const Header = ({
  isMobile, scrollPosition, scrollChangePosition  
}: Props) => {
  const [toggleDrawer, setToggleDrawer] = useState<boolean>(false);
  
  function renderMenuDesktop() {
    return (
      <ThemeProvider theme={fontTheme}>
        <Box
          component="div"
        >
          {pagesValues.map((page) => (
            <Button key={page+isMobile} href={`#${page.toLowerCase()}`}>
              <Typography
                color="#eee"
                textAlign="center"
                marginLeft="1rem"
                marginRight="1rem"
                fontWeight={400}
              >
                {page}
              </Typography>
            </Button>
          ))}
        </Box>
      </ThemeProvider>
    );
  }

  function renderMenuMobile() {
    return (
      <ThemeProvider theme={fontTheme}>
        <IconButton 
          edge="start"
          color="inherit"
          aria-label="open drawer"
          size="large"
          onClick={() => setToggleDrawer(true)}
        >   
          <MenuIcon sx={{ color: "#eee" }} color="action" />
        </IconButton>
        <Drawer
          anchor="right"
          variant="temporary"
          open={toggleDrawer}
          onClose={() => setToggleDrawer(false)} 
        > 
          {pagesValues.map((page) => (
            <div key={page+isMobile} style={{ textAlign: "center" }}>
              <Button href={`#${page.toLowerCase()}`} onClick={() => setToggleDrawer(false)} >
                <Typography
                  color="#1F271B"
                  textAlign="center"
                  marginLeft="1rem"
                  marginRight="1rem"
                  fontWeight={400}
                >
                  {page}
                </Typography>
              </Button>
            </div>
          ))}
        </Drawer>
      </ThemeProvider>
    );
  }

  return (
    <HeaderContainer key={String(isMobile)} id="home">
      <ThemeProvider theme={colorHeaderTheme}>
        <AppBar
          position="fixed"
          color={scrollPosition < scrollChangePosition ? "transparent" : "primary"}
          elevation={0}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <a href="#home">
              <Box
                component="img"
                sx={{ height: 48 }}
                alt="Tapioka Logo"
                src={TapiokaLogo}
              />
            </a>
            { 
            isMobile
              && renderMenuMobile()
            }
            { 
            !isMobile
              && renderMenuDesktop()
            }
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <HeaderTextContainer>
        <Fade
          in={true}
          timeout={2000}
        >
          <div>
            <Typography
              color="#eee"
              textAlign="center"
              fontWeight={600}
              variant={isMobile ? "h3" : "h1"}
            >
              TAPIOKA MAGAZINE
            </Typography>
            <Typography
              color="#eee"
              textAlign="center"
              fontWeight={400}
              variant={isMobile ? "caption" : "h5"}
            >
              Oklahoma's first APIDA-MENA culture publication
            </Typography>
          </div>
        </Fade>
      </HeaderTextContainer>
    </HeaderContainer> 
  );
}

export default Header;