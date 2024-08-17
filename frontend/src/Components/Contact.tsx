import React, { useState } from "react";

import Button from "@mui/material/Button";
import EmailIcon from "@mui/icons-material/Email";
import Grow, { GrowProps } from "@mui/material/Grow";
import IconButton from "@mui/material/IconButton";
import InstagramIcon from "@mui/icons-material/Instagram";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material";

import styled from "@emotion/styled";

const ContactContainer = styled.div`
  width: 100%;
  min-height: 75vh;
  background-color: #FAF4EA;

  display: flex;
  gap: 1rem;

  flex-direction: column;

  align-items: center;

  padding-top: 1rem;
  box-sizing: border-box;
`;

const FormContainer = styled.div`
  width: 90%;
  max-width: 900px;
  height: fit-content;
  background-color: #FFF;

  display: flex;
  flex-direction: column;

  align-items: center;

  border: 1px solid #000000;
  border-radius: 12px;
  box-shadow: 1;

  margin: auto;
  padding: 1rem;

  box-sizing: border-box;
`;

const FooterContainer = styled.section`
  width: 100%;
  //background-color: #1F271B;

  display: flex;
  gap: 1rem;

  justify-content: space-between;
`;

const fontTheme = createTheme({
  typography: {
    fontFamily: [
      'Signika',
      'sans-serif',
    ].join(','),
  },});

const colorFooterTheme = createTheme(
  {
    palette: {
      primary: {
        main: "#353535"
      },
    },
  }
);
  
const Contact = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  
  function wipeData() {
    const EMPTY_STRING = "";

    setName(EMPTY_STRING);
    setEmail(EMPTY_STRING);
    setSubject(EMPTY_STRING);
    setMessage(EMPTY_STRING);
  }

  async function handleSubmit(e : any)  {
    e.preventDefault();
    
    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": `${process.env.REACT_APP_API_URL}`,
        "Access-Control-Allow-Credentials": "true"
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message
      })
    };

    await fetch(`${process.env.REACT_APP_API_URL}/email`, requestOptions)
      .then((res) => {
        setAlertOpen(true)  
      });

    wipeData();
  };

  function GrowTransition(props: GrowProps) {
    return <Grow {...props} />;
  }

  return (
    <ContactContainer id="contact" >
      <FormContainer>
        <ThemeProvider theme={fontTheme}>
          <Typography variant="h3" align="center" mb={2}>
            Contact Us
          </Typography>
          <Typography variant="body1" sx={{ textAlign: "justify" }}>
            For inquiries pertaining to membership or collaborating with our publication, please reach out using the form below.
          </Typography>
        </ThemeProvider>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            type="email"
          />
          <TextField
            fullWidth
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            margin="normal"
            required
            multiline
            rows={4}
          />
          <Button
            fullWidth
            type="submit"
            sx={{
              mt: 2,
              backgroundColor: "#1F271B;",
              color: "#EEE",
              "&:hover": {
                backgroundColor: "#111",
              },
            }}
          >
            Submit
          </Button>
        </form>
      </FormContainer>
      <FooterContainer>
        <Button
          fullWidth
          type="submit"
          size="large"
          onClick={() => window.open("https://account.venmo.com/pay?recipients=ouaasa", "_blank")}
          sx={{
            backgroundColor: "#353535",
            color: "#EEE",
            "&:hover": {
              backgroundColor: "#111",
            },
            width: "10%",
            minWidth: "150px",
            margin: "0.5rem",
            boxSizing: "border-box"
          }}
        >
          Support Us!
        </Button>
        <span>
          <ThemeProvider theme={colorFooterTheme}>
            <IconButton aria-label="email" href="mailto: ouaasa.magazine@gmail.com">
              <EmailIcon fontSize="large" color="primary"/>
            </IconButton>
            <IconButton aria-label="instagram" onClick={() => window.open("https://www.instagram.com/tapioka.mag/", "_blank")}>
              <InstagramIcon fontSize="large" color="primary"/>
            </IconButton>
          </ThemeProvider>
        </span>
      </FooterContainer>
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        TransitionComponent={GrowTransition}
        message="Form Successfully Sent"
      />
    </ContactContainer> 
  );
}

export default Contact;