import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/AboutPage.css";

const AboutPage = () => {
  const [team, setTeam] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = 3;

  useEffect(() => {
    fetch("http://localhost:8000/team-members")
      .then((res) => res.json())
      .then((data) => setTeam(data))
      .catch((err) => console.error("Error fetching team:", err));
  }, []);

  useEffect(() => {
    if (team.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % team.length);
    }, 3000); // Slowed down for better UX

    return () => clearInterval(interval);
  }, [team.length]);

  const visibleMembers = [];
  for (let i = 0; i < cardsPerView; i++) {
    const idx = (currentIndex + i) % team.length;
    visibleMembers.push(team[idx]);
  }

  return (
    <div className="container py-5 about-wrapper">
      {/* Hero Section */}
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold">About Us</h1>
        <p className="lead text-muted">
          Global provider of engineered systems and solutions for the off-highway market.
        </p>
      </div>

      {/* Overview */}
      <section className="mb-5">
        <h2 className="mb-3">Company Overview</h2>
        <p className="text-secondary fs-5">
          Founded in 2015, our company has grown into a global leader delivering precision-engineered components...
        </p>
      </section>

      {/* Mission */}
      <section className="mb-5">
        <h2 className="mb-3">Our Mission</h2>
        <p className="text-secondary fs-5">
          To deliver innovative, reliable, and scalable engineering solutions that drive performance...
        </p>
      </section>

      {/* Values Grid */}
      <section className="mb-5">
        <h2 className="mb-4">Our Values</h2>
        <div className="row g-4">
          {["Innovation", "Excellence", "Integrity", "Global Reach"].map((value, i) => (
            <div className="col-md-6 col-lg-3" key={i}>
              <div className="card h-100 shadow-sm text-center border-0">
                <div className="card-body">
                  <h5 className="card-title fw-semibold">{value}</h5>
                  <p className="card-text">
                    We embrace emerging technologies to stay ahead of the curve.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section>
        <h2 className="mb-4 text-center">Our Team</h2>
        <div className="row g-4 justify-content-center">
         {visibleMembers.map((member, index) => {
  if (!member) return null; // Skip if member is undefined

  return (
    <div className="col-md-4 px-2" key={member._id || index}>
      <div className="card h-100 shadow-sm border-0 text-center" style={{ width: "18rem" }}>
        <img
          src={member.imageUrl || "https://via.placeholder.com/200x200?text=No+Image"}
          alt={member.name || "Team member"}
          className="card-img-top"
          style={{ objectFit: "cover", height: "200px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{member.name || "Unnamed"}</h5>
          <h6 className="text-muted">{member.role || "Role not specified"}</h6>
          <p className="card-text">{member.description || "No description available."}</p>
          <a href={`/#/team/${member._id}`} className="btn btn-primary">
            View Profile
          </a>
        </div>
      </div>
    </div>
  );
})}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;