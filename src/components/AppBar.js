import React, { useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import PersonIcon from "@material-ui/icons/Person";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { selectContact } from "../actions/contactActions";

const useStyles = makeStyles((theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: "#1f2935",
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    listDiv: {
      minHeight: 150,
      maxHeight: 250,
    },
    dropDownMenu: {
      width: "250px !important",
      height: "45px !important",
      fontSize: theme.typography.body1.fontSize,
      lineHeight: theme.typography.body1.lineHeight,
    },
  })
);

const MyAppBar = () => {
  const classes = useStyles();
  const [isMenuOpen, setMenuPopup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const selectedContact = useSelector((state) => state.contact.selectedContact);
  const contactsList = useSelector((state) => state.contact.contactsList);
  const dispatch = useDispatch();

  const handleMenuOpen = (event) => {
    let target = event.currentTarget;
    if (contactsList.length > 0) {
      setMenuPopup(true);
      setAnchorEl(target);
    }
  };
  const handleMenuClose = () => {
    setMenuPopup(false);
    setAnchorEl(null);
  };
  const selectMenu = (item) => {
    dispatch(selectContact(item));
    handleMenuClose();
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      {contactsList.length > 0 && (
        <Menu
          style={{ padding: 0 }}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          id={"primary-search-account-menu"}
          keepMounted
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          open={isMenuOpen}
          onClose={handleMenuClose}
          MenuListProps={{ disablePadding: true }}
          classes={{ list: classes.listDiv }}
        >
          {contactsList.map((contact, index) => (
            <MenuItem
              key={index}
              className={classes.dropDownMenu}
              onClick={() => selectMenu(contact)}
            >
              {contact.firstName + " " + contact.lastName}
            </MenuItem>
          ))}
        </Menu>
      )}
      <Toolbar>
        <div>
          {selectedContact.id && (
            <Typography variant="h6" noWrap>
              Hi,
              <span style={{ color: "#008080" }}>
                {(selectedContact.firstName
                  ? selectedContact.firstName.toString().toUpperCase()
                  : "") +
                  " " +
                  (selectedContact.lastName
                    ? selectedContact.lastName.toString().toUpperCase()
                    : "")}
              </span>
            </Typography>
          )}
        </div>
        <div className={classes.grow} />
        <div>
          <IconButton
            edge="end"
            aria-label="Help"
            aria-haspopup="true"
            color="inherit"
            onClick={handleMenuOpen}
          >
            <PersonIcon />
            <ArrowDropDownIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MyAppBar;
