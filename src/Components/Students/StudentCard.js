import React, { useEffect, useState } from "react";

import AddIcon from "@material-ui/icons/Add";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Chip from "@material-ui/core/Chip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import { TagFacesRounded } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import _ from "lodash";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    width: 60,
    height: 60,
  },
  rowDiv: {
    display: "flex",
    flexDirection: "row",
    paddingLeft: 80,
  },
  tag: {
    paddingLeft: 5,
    marginRight: 5,
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  grade: {
    paddingLeft: 20,
  },
}));

const StudentCard = ({
  firstName,
  lastName,
  pic,
  email,
  company,
  skill,
  tags = [],
  grades,
  changeValue,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [newTag, setNewTag] = React.useState("");
  const [_tags, _setNewTags] = useState(tags);

  useEffect(() => {
    if (!_.isEqual(tags, _tags) && !_.isEmpty(tags)) {
      _setNewTags(tags);
    }
  }, [tags, _tags]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClickAway = () => {
    if (newTag) {
      changeValue("tags", [..._tags, newTag]);
      setNewTag("");
    }
  };

  const average = _.mean(_.map(grades, (p) => parseInt(p)));

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            src={pic}
            className={classes.avatar}
          ></Avatar>
        }
        action={
          <CardActions disableSpacing>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              {expanded ? <RemoveIcon /> : <AddIcon />}
            </IconButton>
          </CardActions>
        }
        title={
          <Typography
            variant="h5"
            aria-readonly
          >{`${firstName} ${lastName}`}</Typography>
        }
        subheader={
          <div>
            <Typography color="textSecondary">{`Email: ${email}`}</Typography>
            <Typography color="textSecondary">{`Company: ${company}`}</Typography>
            <Typography color="textSecondary">{`Skill: ${skill}`}</Typography>
            <Typography color="textSecondary">{`Average: ${average}%`}</Typography>
            <div className={classes.row} id={firstName}>
              {_.map(_tags, (tag) => (
                <Chip
                  className={classes.tag}
                  label={tag}
                  id={tag}
                  variant="outlined"
                />
              ))}
            </div>
            <ClickAwayListener onClickAway={handleClickAway}>
              <TextField
                placeholder="Add a new tag"
                value={newTag}
                onChange={(e) => {
                  setNewTag(e.target.value);
                }}
              />
            </ClickAwayListener>
          </div>
        }
      />

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {_.map(grades, (grade, i) => {
            return (
              <div className={classes.rowDiv}>
                <Typography variant="body2" color="textSecondary" component="p">
                  {`Test ${i + 1}`}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="p"
                  className={classes.grade}
                >
                  {grade}%
                </Typography>
              </div>
            );
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default StudentCard;
