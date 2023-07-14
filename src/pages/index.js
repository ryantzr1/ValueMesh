import React, { useEffect, useState } from "react";
import axios from "axios";
import PeopleCluster from "../components/PeopleCluster/PeopleCluster";
import AddConnectionModal from "../components/AddConnectionForm/AddConnection";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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
  const sorts = ["none", "increasing", "decreasing"];

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
            return regexInternship.test(person.notes);
          } else if (filter === "Others") {
            return (
              !regexInvestor.test(person.industry) &&
              !regexAccelerator.test(person.industry) &&
              !regexProfessor.test(person.industry) &&
              !regexInternship.test(person.notes)
            );
          }

          return false; // Invalid filter option
        });

  const sortedPeople = [...filteredPeople].sort((a, b) => {
    if (sort === "none") return 0;
    if (sort === "increasing") return a.value - b.value;
    if (sort === "decreasing") return b.value - a.value;
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
          left: 0,
          bottom: 0,
          width: "100%",
          color: "black", // Change as needed
          textAlign: "left",
        }}
      >
        Created by: ryantzr 😊
      </footer>
    </div>
  );
}

export default Dashboard;
