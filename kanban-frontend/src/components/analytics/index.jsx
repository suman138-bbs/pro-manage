import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import axios from "../../api/axios";
import GreenDot from "../../assets/Green.svg";

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({});
  useEffect(() => {
    const getAnalytics = async () => {
      const res = await axios.get("/app/get-analytics");
      setAnalytics(res.data.analytics);
      setLoading(false);
    };
    getAnalytics();
  }, []);
  console.log(analytics);
  return (
    <div className={style.analytics_container}>
      <h2>Analytics</h2>
      <div className={style.analytics}>
        {loading ? (
          <h1>Loading.....</h1>
        ) : (
          <>
            {" "}
            <div>
              <div>
                <h4>
                  <img src={GreenDot} alt="" />
                  <span>Backlog Tasks</span>
                </h4>
                <h4>{analytics.backlogTasks}</h4>
              </div>
              <div>
                <h4>
                  <img src={GreenDot} alt="" />
                  <span>To-do Tasks</span>
                </h4>
                <h4>{analytics.todoTasks}</h4>
              </div>
              <div>
                <h4>
                  <img src={GreenDot} alt="" />
                  <span>In-Progress Tasks</span>
                </h4>
                <h4>{analytics.inProgressTasks}</h4>
              </div>
              <div>
                <h4>
                  <img src={GreenDot} alt="" />
                  <span>Completed Tasks</span>
                </h4>
                <h4>{analytics.completedTasks}</h4>
              </div>
            </div>
            <div>
              <div>
                <h4>
                  <img src={GreenDot} alt="" />
                  <span>Low Priority</span>
                </h4>
                <h4>{analytics.lowPriorityTasks}</h4>
              </div>
              <div>
                <h4>
                  <img src={GreenDot} alt="" />
                  <span>Moderate Priority</span>
                </h4>
                <h4>{analytics.moderatePriorityTasks}</h4>
              </div>
              <div>
                <h4>
                  <img src={GreenDot} alt="" />
                  <span>High Priority</span>
                </h4>
                <h4>{analytics.highPriorityTasks}</h4>
              </div>
              <div>
                <h4>
                  <img src={GreenDot} alt="" />
                  <span>Due Date Tasks</span>
                </h4>
                <h4>{analytics.dueDateTasks}</h4>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;
