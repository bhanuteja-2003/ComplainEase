import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import RightNav from "./RightNav";
import ComplaintsList from "./ComplaintsList";
import Complaint from "./Complaint";
import Profile from "./Profile";

const ComplaintPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [sentMessages, setSentMessages] = useState([]);
  const [gotMessages, setGotMessages] = useState([]);
  useEffect(() => {
    const fetchComplaints = async () => {
      const response = await fetch(
        "http://localhost:5001/complaints/sentComplaints",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();

      setComplaints(data.complaints);
    };
    const fetchMessages = async () => {
      const response = await fetch(
        "http://localhost:5001/messages/sentMessages",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      setSentMessages(data);

      const response2 = await fetch(
        "http://localhost:5001/messages/gotMessages",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data2 = await response2.json();
      setGotMessages(data2);
    };

    fetchMessages();

    fetchComplaints();
  }, []);

  const [onInbox, setOnInbox] = useState(true);
  const [onSent, setOnSent] = useState(false);
  const [got, setGot] = useState(false);
  const[profile,setprofile]=useState(false);

  const clickOnInbox = () => {
    setOnInbox(true);
    setOnSent(false);
    setGot(false);
    setprofile(false);
    setActiveComplaint(false);
  };
  const clickOnSent = () => {
    setOnInbox(false);
    setOnSent(true);
    setGot(false);
    setprofile(false);
    setActiveComplaint(false);
  };
  const clickOnGot = () => {
    setOnInbox(false);
    setActiveComplaint(false);
    setOnSent(false);
    setGot(true);
    setprofile(false);
  };
  const clickOnprofile =()=>{
    setOnInbox(false);
    setActiveComplaint(false);
    setOnSent(false);
    setGot(false);
    setprofile(true);

  }

  const [activeComplaint, setActiveComplaint] = useState(false);

  const handleComplaintClick = (item) => {
    setActiveComplaint(item);
    setOnInbox(false);
    setOnSent(false);
    setGot(false);
    setprofile(false);
  };

  console.log(onInbox, onSent, got);

  return (
    <Grid container xs={12}>
      <Grid item xs={3}>
        <section className="flex gap-6  fixed p-0">
          <RightNav
            clickOnInbox={clickOnInbox}
            clickOnSent={clickOnSent}
            clickOnGot={clickOnGot}
            clickOnprofile={clickOnprofile}

          />
        </section>
      </Grid>
      <Grid item xs={9}>
        {activeComplaint && <Complaint activeComplaint={activeComplaint} />}

        {onInbox && (
          <ComplaintsList
            complaints={complaints}
            handleComplaintClick={handleComplaintClick}
          />
        )}
        {onSent && (
          <ComplaintsList
            complaints={sentMessages}
            handleComplaintClick={handleComplaintClick}
          />
        )}
        {got && (
          <ComplaintsList
            complaints={gotMessages}
            handleComplaintClick={handleComplaintClick}
          />
        )}
        {profile && (
          <Profile/>

        )}
      </Grid>
    </Grid>
  );
};

export default ComplaintPage;
