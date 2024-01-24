import React from 'react';
import { Grid, Typography, Button, Box } from '@mui/material';
// import myteam from '../images/myteam.jpg';
import Link from 'next/link';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Hero = () => {

    return (
        <Box style={{
            width: '100%',
            display: 'flex',
            minHeight: '600px',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Grid container spacing={6} style={{
                display: 'flex',
                alignItems: 'center',
                maxWidth: '1300px',
                padding: '50px',
            }}>
                <Grid item xs={12} md={7}>
                    <Typography variant="h3" fontWeight={700} style={{
                        paddingBottom: '15px',
                    }}>
                        Household Survey  Parivar Register (Urban)
                    </Typography>
                    <Typography style={{
                        fontSize: '1.3rem',
                        lineHeight: 1.6,
                        marginBottom: '4.8rem',
                        opacity: 0.6
                    }}  >
                        Efficiently collect and manage urban household data to maintain an updated Parivar Register,
                        ensuring accurate and essential demographic information for government and civic planning in your city.
                    </Typography>
                    <Link href="/apk/SurveyV1.5.apk" download>
                        <Button
                            variant="contained"
                            color="primary"
                            style={{ marginLeft: 5 }}
                        >
                            Download the Application
                        </Button>
                    </Link>

                    <Button
                        variant="string"
                        style={{ marginLeft: 5, backgroundColor: 'white', color: "#000" }}
                        endIcon={<ArrowDownwardIcon />}

                    >
                        Learn More
                    </Button>


                </Grid>
                <Grid item xs={12} md={5}>
                    <img src={'/urban/images/banner.jpg'} alt="My Team" style={{
                        width: '100%',
                    }} />

                </Grid>
            </Grid>
        </Box>
    );
};

export default Hero;