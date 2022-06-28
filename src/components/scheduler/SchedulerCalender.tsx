import * as React from "react";
import { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Inject,
  ViewsDirective,
  ViewDirective,
} from "@syncfusion/ej2-react-schedule";
import axios from "axios";
import { getOneFaculty } from "src/features/faculty/facultyActions";
import { userType } from "src/types/user.enum";
import { CustomButton } from "../base/CustomButton";
import CustomSnackbar from "../base/CustomSnackbar";

export const SchedulerCalender = () => {
  const baseURL = "http://localhost:8000/api";
  const token = localStorage.getItem("token");

  const [scheduleObj, setScheduleObj] = useState(null);
  const [opens, setOpenS] = useState(false);

  const [scheduleData, setScheduleData] = useState<any>([]);
  const onClickAdd = () => {
    const Data: any[] = [
      {
        Id: 1,
        Subject: "Conference",
        StartTime: new Date(2018, 1, 12, 9, 0),
        EndTime: new Date(2018, 1, 12, 10, 0),
        IsAllDay: false,
      },
      {
        Id: 2,
        Subject: "Meeting",
        StartTime: new Date(2018, 1, 15, 10, 0),
        EndTime: new Date(2018, 1, 15, 11, 30),
        IsAllDay: false,
      },
    ];
    // setScheduleObjaddEvent(Data);
  };
  // private onClickSave(): void {
  //   const Data: any = {
  //     Id: 3,
  //     Subject: "Testing-edited",
  //     StartTime: new Date(2018, 1, 11, 10, 0),
  //     EndTime: new Date(2018, 1, 11, 11, 0),
  //     IsAllDay: false,
  //   };
  //   this.scheduleObj.saveEvent(Data);
  // }
  // private onClickDelete(): void {
  //   this.scheduleObj.deleteEvent(4);
  // }
  const id = localStorage.getItem("id");
  const dispatch = useDispatch();
  useEffect(() => {
    // get all slots
    const getData = async () => {
      if (id) {
        const faculty: any = await dispatch(getOneFaculty(id));
        if (faculty.slots.length > 0) {
          setScheduleData(faculty.slots);
        }
      }
    };
    getData();
  }, []);

  const onActionBegin = (event: any) => {
    if (event.requestType === "eventCreate") {
      let slot = event.addedRecords;
      if (slot.length > 0) {
        slot = slot[0];
        setScheduleData([...scheduleData, slot]);
      }
    }
  };
  const handleSaveSlots = async () => {
    if (!id || localStorage.getItem("type") !== userType.FACULTY) return;
    // filter free slots
    const filterSlots = scheduleData.filter((slot: any) => slot.Subject.toLowerCase() === "free");

    if (filterSlots.length > 0) {
      await axios.patch(
        `${baseURL}/scheduler/time-slots/${id}`,
        {
          slots: filterSlots,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpenS(true);
    }
  };

  return (
    <div>
      <div>
        {/* <ButtonComponent id="add" title="Add" onClick={this.onClickAdd.bind(this)}>
        Add
      </ButtonComponent>
      <ButtonComponent id="edit" title="Edit" onClick={this.onClickSave.bind(this)}>
        Edit
      </ButtonComponent>
      <ButtonComponent id="delete" title="Delete" onClick={this.onClickDelete.bind(this)}>
        Delete
      </ButtonComponent>{" "} */}
        <ScheduleComponent
          ref={(t: any) => {
            console.log("here", t);
            // this.scheduleObj = t;
            setScheduleObj(t);
          }}
          width="100%"
          height="550px"
          selectedDate={new Date(2018, 1, 15)}
          eventSettings={{ dataSource: scheduleData }}
          actionBegin={onActionBegin}
          delayUpdate="true"
          onChange={(e: any) => console.log(e)}
        >
          <ViewsDirective>
            <ViewDirective option="Day" />
            <ViewDirective option="Week" />
            <ViewDirective option="WorkWeek" />
            <ViewDirective option="Month" />
          </ViewsDirective>
          <Inject services={[Day, Week, WorkWeek, Month]} />
        </ScheduleComponent>
        <CustomButton loading={false} handleClick={handleSaveSlots} text={"Save Free Slots"} />
      </div>
      <CustomSnackbar
        message={"Time Slots saved successfully!"}
        open={opens}
        vertical="bottom"
        horizontal="center"
        handleClose={() => setOpenS(false)}
        type={"success"}
      />
    </div>
  );
};
