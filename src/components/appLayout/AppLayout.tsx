import React from "react";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import { Header } from "./Header";
import { SideNav } from "./SideNav";
import { Chatbot } from "./Chatbot";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

interface Props {
  children: React.ReactNode;
}

export function AppLayout(props: Props) {
  const classes = useStyles();
  console.log("App Layout Rendered");

  return (
    <div className={classes.root}>
      <Header />
      <SideNav />
      <Chatbot />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}
