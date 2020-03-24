import React, { Fragment } from "react";
import { Typography, Box, Grid, Container } from "@material-ui/core";
import ProductCard from "./productcard";

const ProductGrid = props => {
  return (
    <Fragment>
      <section className="home-product-listing">
        <Container>
          {props.title && (
            <Box display="flex" justifyContent="center">
              <Typography variant="h2" className="section-title">
                {props.title}
              </Typography>
            </Box>
          )}
          <Grid container spacing={5}>
            {props.allProducts &&
              props.allProducts.map((product, index) => (
                <Fragment key={index}>
                  {product.status === "Publish" && (
                    <Grid item lg={3} md={6} sm={6}>
                      <ProductCard
                        productDetail={product}
                        index={index}
                        key={index}
                        GirdProductView={true}
                      />
                    </Grid>
                  )}
                </Fragment>
              ))}
          </Grid>
        </Container>
      </section>
    </Fragment>
  );
};

export default ProductGrid;
