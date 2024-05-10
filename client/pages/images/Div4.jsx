import { Typography, Card, CardContent, CardMedia, CardActions, Button } from '@mui/material';
import React from 'react';
import nutri from  './images/nutri.jpeg'
import Diet from './images/diet.jpeg'
import Smoke from  './images/smoke.jpg'
import Mental from './images/mental.jpg'

function Div4() {
    const whiteBoxStyle = {
        backgroundColor: 'white',
        height: '700px',
        padding: '20px',
         // Adjust the margin to push it below the viewport
        zIndex: 2, // Ensure the white box appears above the overlay
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const cardContainerStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '80px', // Adjust spacing between cards
    };

    const cardStyle = {
        margin: '0 10px', // Add margin to each card
        maxWidth: 345,
    };

    return (
        <div style={whiteBoxStyle}>
            {/* Content of the white box */}
            <Typography variant='h2' align='center'>Blog</Typography>
            
            {/* Card section */}
            <div style={cardContainerStyle}>
                <Card sx={cardStyle}>
                    <CardMedia
                        component="img"
                        alt="blog1"
                        height="140"
                        image={nutri}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Nutritions
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Good food is not just about taste, and diet is not just about achieving an ideal weight or dress size....
                        </Typography>
                    </CardContent>
                    <CardActions>
                        
                    <Button size="small" component="a" href="https://novainstituteforhealth.org/focus-areas/food-and-nutrition/?gad_source=1&gclid=Cj0KCQjwqpSwBhClARIsADlZ_TlHzgX0nQBHglgqgG189qlPKqccIFKhKcZyBcQQbfO_jQdLdAyOcp0aAp6JEALw_wcB" target="_blank">Learn More</Button>

                    </CardActions>
                </Card>
                <Card sx={cardStyle}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image={Diet}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Healthy Diet
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        human health are apt to become moot very soon. The impact of our prevailing diets on the planet is fast becoming the only thing that really matters...
                        </Typography>
                    </CardContent>
                    <CardActions>
                        
                    <Button size="small" component="a" href="https://foodtank.com/news/2019/03/healthy-diet-healthy-planet-an-excerpt-from-the-truth-about-food/" target="_blank">Learn More</Button>
                    </CardActions>
                </Card>
                <Card sx={cardStyle}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image={Smoke}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                           Smoking Causes Cancer
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Smoking has serious negative effects on your overall health and life expectancy. 1 in 2 smokers will die of a tobacco-related illness...
                        </Typography>
                    </CardContent>
                    <CardActions>
                        
                    <Button size="small" component="a" href="https://croi.ie/heart/risk-factors/smoking/?gad_source=1&gclid=Cj0KCQjwqpSwBhClARIsADlZ_TnZfGxQ_O_8ZzFbcb9FENZJDWfVkgJyvMg2shnfJmWYVS2gqroIAb4aAnZuEALw_wcB" target="_blank">Learn More</Button>
                    </CardActions>
                </Card>
                <Card sx={cardStyle}>
                    <CardMedia
                        component="img"
                        alt="green iguana"
                        height="140"
                        image={Mental}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Mental Health 
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                        Every day in every corner of the globe millions of people suffer from mental health issues.....
                        </Typography>
                    </CardContent>
                    <CardActions>
                        
                    <Button size="small" component="a" href="https://www.shamrockway.org/truthabout?gad_source=1&gclid=Cj0KCQjwqpSwBhClARIsADlZ_Tmf1z59txpHHJn6sa6RZUqQ26kvYFPXTL4z7Y670fqsQE9kmRj0mpgaAkUBEALw_wcB" target="_blank">Learn More</Button>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
}

export default Div4;
