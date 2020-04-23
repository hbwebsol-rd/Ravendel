import React, { Fragment, useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  Button,
  Backdrop,
  CircularProgress,
  TextField,
  IconButton,
  Divider,
  Box,
  RadioGroup,
  Radio,
  FormControlLabel,
  Typography,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Alert from "../utils/Alert";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { pageUpdateAction, pageAction } from "../../store/action/";
import TinymceEditor from "./TinymceEditor.js";
import clsx from "clsx";
import { isEmpty } from "../../utils/helper";
import viewStyles from "../viewStyles";

var defaultObj = {
  status: "Publish",
  title: "",
  meta: {
    title: "",
    description: "",
    keywords: "",
  },
};

const EditPage = (props) => {
  const classes = viewStyles();
  const [editPremalink, setEditPermalink] = useState(false);
  const [page, setPage] = useState(defaultObj);
  //const [showEditor, setshowEditor] = useState(false);

  /* useEffect(() => {
    var slugVal = page.title.replace(/[^A-Z0-9]/gi, "-");
    setPage({ ...page, url: slugVal.toLowerCase() });
  }, [page.title]); */

  useEffect(() => {
    if (props.match.params.id) {
      props.pageAction(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(props.pageState.page)) {
      setPage({ ...props.pageState.page });
    }
  }, [props.pageState.page]);

  const updatePage = (e) => {
    e.preventDefault();
    props.pageUpdateAction(page);
  };

  const handleChange = (e) => {
    setPage({ ...page, [e.target.name]: e.target.value });
  };

  const changePermalink = () => {
    setEditPermalink(!editPremalink);
  };

  const metaChange = (e) => {
    setPage({
      ...page,
      meta: { ...page.meta, [e.target.name]: e.target.value },
    });
  };

  return (
    <Fragment>
      <Alert />

      {props.pageState.loading && (
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" /> <br /> Loading
        </Backdrop>
      )}

      <form>
        <Grid container className="topbar">
          <Grid item lg={6}>
            <Typography variant="h4">
              <Link to="/all-pages">
                <IconButton aria-label="Back">
                  <ArrowBackIcon />
                </IconButton>
              </Link>
              <span style={{ paddingTop: 10 }}>Edit Page</span>
            </Typography>
          </Grid>

          <Grid item lg={6} className="text-right padding-right-2">
            <Button color="primary" variant="contained" onClick={updatePage}>
              Save
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.cancelBtn}
            >
              <Link to="/all-pages" style={{ color: "#fff" }}>
                Discard
              </Link>
            </Button>
          </Grid>
        </Grid>

        <Grid container spacing={4} className={classes.secondmainrow}>
          <Grid item lg={9} md={12}>
            <Box>
              <Card>
                <CardHeader title="Page Information" />
                <Divider />
                <CardContent>
                  <TextField
                    id="title"
                    label="Title"
                    name="title"
                    onChange={handleChange}
                    variant="outlined"
                    value={page.title}
                    className={clsx(classes.marginBottom, classes.width100)}
                  />

                  <Grid item md={12}>
                    {page.title ? (
                      <span style={{ marginBottom: 10, display: "block" }}>
                        <strong>Link: </strong>
                        https://www.google.com/product/
                        {editPremalink === false && page.url}
                        {editPremalink === true && (
                          <input
                            id="url"
                            name="url"
                            value={page.url}
                            onChange={handleChange}
                            variant="outlined"
                            className={classes.editpermalinkInput}
                          />
                        )}
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={changePermalink}
                          className={classes.editpermalinkInputBtn}
                        >
                          {editPremalink ? "Ok" : "Edit"}
                        </Button>
                      </span>
                    ) : null}
                  </Grid>
                  <TinymceEditor value={page.content} />
                </CardContent>
              </Card>
            </Box>

            <Box component="span" m={1}>
              <Card>
                <CardHeader title="Meta Information" />
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item md={6}>
                      <TextField
                        id="meta-title"
                        label="Meta Title"
                        name="title"
                        value={page.meta.title}
                        onChange={metaChange}
                        variant="outlined"
                        className={clsx(classes.width100)}
                      />
                    </Grid>

                    <Grid item md={6}>
                      <TextField
                        id="meta-keyword"
                        label="Meta Keyword"
                        name="keywords"
                        value={page.meta.keywords}
                        onChange={metaChange}
                        variant="outlined"
                        className={clsx(classes.width100)}
                      />
                    </Grid>

                    <Grid item md={12}>
                      <TextField
                        id="meta-description"
                        label="Meta-description"
                        name="description"
                        value={page.meta.description}
                        onChange={metaChange}
                        variant="outlined"
                        className={clsx(classes.marginBottom, classes.width100)}
                        multiline
                        rows="4"
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </Grid>

          <Grid item lg={3} md={12}>
            <Box>
              <Card>
                <CardHeader title="Status" />
                <Divider />
                <CardContent>
                  <RadioGroup
                    defaultValue="Publish"
                    name="status"
                    onChange={handleChange}
                    row
                    value={page.status}
                  >
                    <FormControlLabel
                      value="Publish"
                      control={<StyledRadio />}
                      label="Publish"
                    />
                    <FormControlLabel
                      value="Draft"
                      control={<StyledRadio />}
                      label="Draft"
                    />
                  </RadioGroup>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Fragment>
  );
};

const StyledRadio = (props) => {
  return (
    <Radio
      className="radioRoot"
      disableRipple
      color="default"
      checkedIcon={<span className="radioIcon radiocheckedIcon" />}
      icon={<span className="radioIcon" />}
      {...props}
    />
  );
};

const mapStateToProps = (state) => {
  return { pageState: state.pages };
};

const mapDispatchToProps = {
  pageUpdateAction,
  pageAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPage);
