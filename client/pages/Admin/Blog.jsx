import { Typography, Card, CardContent, CardMedia, CardActions, Button } from '@mui/material';
import React from 'react';
import nutri from '../images/nutri.jpeg';
import Diet from '../images/diet.jpeg';
import Smoke from '../images/smoke.jpg';
import Mental from '../images/mental.jpg';
import Navbar from '../../components/Navbar';
import Layout from '../../components/Layout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
function Blog() {
    const whiteBoxStyle = {
        
        height: 'auto', // Change height to auto to fit content
       
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const cardContainerStyle = {
        display: 'grid', // Change to grid layout
        gridTemplateColumns: 'repeat(2, 1fr)', // 2 columns with equal width
        gap: '20px', // Adjust spacing between cards
        marginTop: '30px',
    };

    const cardStyle = {
        maxWidth: 345,
    };
    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        marginBottom: '20px', // Adjust spacing between text and button
    };

    return (
        <div>
            <Navbar pageTitle="blog " />
            <Layout>
            <Button component={Link} to="/admindash">
                                    <ArrowBackIcon sx={{ fontSize: 40, color: 'background.bg2' }} /></Button>
                
        <div style={whiteBoxStyle}>
            
          
            
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
                    <div style={buttonContainerStyle}>
                <Button variant='outlined'>Update</Button>
            </div>
                    
                   
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
                    <div style={buttonContainerStyle}>
                <Button variant='outlined'>Update</Button>
            </div>
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
                    <div style={buttonContainerStyle}>
                <Button variant='outlined'>Update</Button>
            </div>
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
                        Mental health is an essential component of overall well-being, encompassing emotional, psychological, and social aspects of our lives.
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" component="a" href="https://www.shamrockway.org/truthabout?gad_source=1&gclid=Cj0KCQjwqpSwBhClARIsADlZ_Tmf1z59txpHHJn6sa6RZUqQ26kvYFPXTL4z7Y670fqsQE9kmRj0mpgaAkUBEALw_wcB" target="_blank">Learn More</Button>
        
                     
                    </CardActions>
                    <div style={buttonContainerStyle}>
                <Button variant='outlined'>Update</Button>
            </div>
                </Card>
            </div>
        </div></Layout></div>
    );
}

export default Blog;
