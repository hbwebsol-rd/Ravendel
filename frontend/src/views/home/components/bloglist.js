import React, { Fragment } from "react";
import {
  Typography,
  Button,
  Grid,
  Box,
  CardMedia,
  CardContent,
  CardActions,
  Card,
  Container,
  CardActionArea
} from "@material-ui/core";
import { Link } from "react-router-dom";

const BlogListing = props => {
  return (
    <Fragment>
      <section className="blog-section-homepage">
        <Container>
          <Box display="flex" justifyContent="center">
            <Typography variant="h2" className="section-title">
              {props.title}
            </Typography>
          </Box>
          <Grid container spacing={4}>
            {props.recentlyBlogs &&
              props.recentlyBlogs.map((blog, index) => (
                <Grid item lg={4} md={6} sm={6} key={index}>
                  <Card>
                    <Link to={`blog/${blog.id}`}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="140"
                          image={blog.featured_image}
                          title="Contemplative Reptile"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h4" component="h2">
                            {blog.title}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            color="textSecondary"
                            component="p"
                          >
                            {blog.description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Link>
                    <CardActions>
                      <Link to={`blog/${blog.id}`}>
                        <Button size="small" color="primary">
                          Learn More
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
      </section>
    </Fragment>
  );
};

export default BlogListing;
