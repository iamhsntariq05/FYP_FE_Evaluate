import React from "react";
import { CircularCard } from "./CircularCard";
import response from "./response.json";
import { useStyles } from "./styles";

const Step3 = () => {
  const stats: any = response.statistics;
  const classes = useStyles();

  return (
    <div>
      <div className={classes.step3Container}>
        {Object.keys(stats).map((key: any, index: any) => {
          return (
            <div key={index}>
              <CircularCard title={key} value={stats[key]} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Step3;
