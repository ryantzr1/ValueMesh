import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import SharedPersonCard from "../../components/PersonCard/SharedContactCard";
import UserContext from "../../UserContext";
import styles from "../../styles/contact.module.css";
import mongoose from "mongoose";

const Contact = ({ id }) => {
  const [person, setPerson] = useState(null);
  const { loading, user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const fetchPerson = async () => {
      if (!loading) {
        try {
          const response = await axios.get(`/api/person/${id}`);

          // Create a new ObjectId for the _id field
          response.data.data._id = new mongoose.Types.ObjectId();

          // Assign the userId field with the authenticated user's id
          if (user) {
            response.data.data.userId = user.uid;
          }
          response.data.data.notes = "";

          setPerson(response.data.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchPerson();
  }, [id, loading, router, user]);

  const handleSignIn = () => {
    router.push("/login?redirect=" + router.asPath);
  };

  const handleAddToDashboard = () => {
    if (!user) {
      handleSignIn();
    }
  };

  return (
    <div className={styles.container}>
      {person ? (
        <div className="flex flex-col items-center">
          <SharedPersonCard person={person} />
          {!user && (
            <button className={styles.button} onClick={handleAddToDashboard}>
              Sign In to Add to Dashboard
            </button>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

Contact.getInitialProps = ({ query }) => {
  return { id: query.id };
};

export default Contact;
