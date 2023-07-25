import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import PeopleCluster from "../components/PeopleCluster/PeopleCluster";
import AddConnectionModal from "../components/AddConnectionForm/AddConnection";
import SignOut from "../components/signOut";
import UserContext from "../UserContext";
import { useRouter } from "next/router";

function Dashboard() {
  const [people, setPeople] = useState([]);
  const [sort, setSort] = useState("none");
  const [selectedTag, setSelectedTag] = useState("All");
  const { loading, user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (loading) {
        // We are still checking for the user
        return;
      }
      if (!user) {
        // No user detected, let's redirect to login
        router.push("/login");
      } else {
        // User is authenticated, let's fetch the data
        try {
          const response = await axios.get(
            `/api/getConnections?userId=${user.uid}`
          );
          setPeople(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [loading, user, router]);

  const sorts = [
    "None",
    "Name: A-Z",
    "Name: Z-A",
    "Value: Low-High",
    "Value: High-Low",
  ];

  // Extract unique tags for filtering
  const allTags = ["All", ...new Set(people.flatMap((person) => person.tags))];

  const filteredPeople =
    selectedTag !== "All"
      ? people.filter((person) => person.tags.includes(selectedTag))
      : people;

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <AddConnectionModal />
      <div className="filter-sort-container">
        <label htmlFor="tag">Filter by tag: </label>
        <select
          id="tag"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
          className="text-center"
          style={{ padding: "8px", marginLeft: "8px", marginRight: "32px" }}
        >
          {allTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        <label htmlFor="sort">Sort by: </label>
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
      <PeopleCluster title={`People: ${selectedTag}`} people={sortedPeople} />
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
          <a
            target="_blank"
            rel="noreferrer noopener"
            style={{ textDecoration: "none", color: "black" }}
          >
            Created by: ryantzr 😊
          </a>
        </div>
      </footer>

      <SignOut></SignOut>
    </div>
  );
}

export default Dashboard;
