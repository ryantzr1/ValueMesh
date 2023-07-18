import React, { useEffect, useState } from "react";
import axios from "axios";
import PeopleCluster from "../components/PeopleCluster/PeopleCluster";
import AddConnectionModal from "../components/AddConnectionForm/AddConnection";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import SignOut from "../components/signOut";

const supabase = createClientComponentClient();

function Dashboard() {
  const [people, setPeople] = useState([]);
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("none");

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        try {
          const response = await axios.get(
            `/api/getConnections?userId=${user.id}`
          ); // Get data for the current user
          console.log(response.data);
          setPeople(response.data);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log("failed ");
      }
    };

    fetchData();
  }, []);

  const filters = [
    "All",
    "Investor",
    "Accelerator",
    "Professor",
    "Internship?",
    "Others",
  ];
  const sorts = [
    "None",
    "Name: A-Z",
    "Name: Z-A",
    "Value: Low-High",
    "Value: High-Low",
  ];

  const filteredPeople =
    filter === "All"
      ? people
      : people.filter((person) => {
          const regexInvestor = /investor/i; // Regular expression to match "investor" case-insensitively
          const regexAccelerator = /accelerator/i; // Regular expression to match "accelerator" case-insensitively
          const regexProfessor = /professor/i; // Regular expression to match "accelerator" case-insensitively
          const regexInternship = /intern/i; // Regular expression to match "accelerator" case-insensitively

          if (filter === "Investor") {
            return regexInvestor.test(person.industry);
          } else if (filter === "Accelerator") {
            return regexAccelerator.test(person.industry);
          } else if (filter === "Professor") {
            return regexProfessor.test(person.industry);
          } else if (filter === "Internship?") {
            return regexInternship.test(person.tags);
          } else if (filter === "Others") {
            return (
              !regexInvestor.test(person.industry) &&
              !regexAccelerator.test(person.industry) &&
              !regexProfessor.test(person.industry) &&
              !regexInternship.test(person.tags)
            );
          }

          return false; // Invalid filter option
        });

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    switch (sort) {
      case "None":
        return 0;
      case "Name: A-Z":
        return a.name.localeCompare(b.name);
      case "Name: Z-A":
        return b.name.localeCompare(a.name);
      case "Value: Low-High":
        return a.value - b.value;
      case "Value: High-Low":
        return b.value - a.value;
      default:
        return 0;
    }
  });

  return (
    <div className="container mx-auto p-4">
      <AddConnectionModal />
      <div className="filter-container">
        {filters.map((filterOption) => (
          <button
            key={filterOption}
            className={`filter-button ${
              filterOption === filter ? "active" : ""
            }`}
            onClick={() => setFilter(filterOption)}
          >
            {filterOption}
          </button>
        ))}
      </div>
      <div className="sort-container">
        <label htmlFor="sort">Sort by: </label>
        <span style={{ marginRight: "8px" }}></span>

        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="text-center"
          style={{ padding: "8px" }}
        >
          {sorts.map((sortOption) => (
            <option key={sortOption} value={sortOption}>
              {sortOption}
            </option>
          ))}
        </select>
      </div>
      <PeopleCluster title={`People: ${filter}`} people={sortedPeople} />
      <footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 30px",
          borderTop: "0.5px solid #d3d3d3",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          {/* <a
            href="https://yourwebsite.com"
            style={{ textDecoration: "none", color: "black" }}
          >
            © Your Company Name
          </a> */}
          <a
            // href="https://yourtwitter.com"
            target="_blank"
            rel="noreferrer noopener"
            style={{ textDecoration: "none", color: "black" }}
          >
            Created by: ryantzr 😊
          </a>
        </div>

        <div
          style={{
            display: "flex",
            gap: "20px",
          }}
        >
          {/* <a
            href="https://yourwebsite.com/faq"
            target="_blank"
            rel="noreferrer noopener"
            style={{ textDecoration: "none", color: "black" }}
          >
            FAQs
          </a>
          <a
            href="https://yourwebsite.com/privacy-policy"
            target="_blank"
            rel="noreferrer noopener"
            style={{ textDecoration: "none", color: "black" }}
          >
            Privacy Policy
          </a>
          <a
            href="https://yourwebsite.com/terms"
            target="_blank"
            rel="noreferrer noopener"
            style={{ textDecoration: "none", color: "black" }}
          >
            Terms of Use
          </a> */}
        </div>
      </footer>

      <SignOut></SignOut>
    </div>
  );
}

export default Dashboard;
