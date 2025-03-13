import { useState, useEffect } from "react";

interface Bowler {
  bowlerId: number;
  bowlerLastName?: string;
  bowlerMiddleInit?: string;
  bowlerFirstName?: string;
  teamName: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  phoneNumber?: string;
}

export default function App() {
  return (
    <>
      <Heading />
      <Table />
    </>
  );
}

const Heading = () => {
  return (
    <>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Bowling League</h1>
      <p>
        This table shows all the bowlers in the bowling league database on the
        Marlins and Sharks teams
      </p>
    </>
  );
};

function Table() {
  const [bowlers, setBowlers] = useState<Bowler[]>([]);

  useEffect(() => {
    fetch("https://localhost:5000/bowlingleague")
      .then((res) => res.json())
      .then((data) => {
        setBowlers(data);
        console.log(data);
      });
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Bowlers</h1>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Team Name
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Address
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>City</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>State</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Zip</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Phone Number
            </th>
          </tr>
        </thead>
        <tbody>
          {bowlers.map(
            (bowler) =>
              (bowler.teamName === "Marlins" ||
                bowler.teamName === "Sharks") && (
                <BowlerRow key={bowler.bowlerId} bowler={bowler} />
              )
          )}
        </tbody>
      </table>
    </>
  );
}

const BowlerRow: React.FC<{ bowler: Bowler }> = ({ bowler }) => {
  return (
    <tr>
      <td style={{ border: "1px solid black", padding: "8px" }}>{`${
        bowler.bowlerFirstName || ""
      } ${bowler.bowlerMiddleInit || ""} ${bowler.bowlerLastName || ""}`}</td>
      <td style={{ border: "1px solid black", padding: "8px" }}>
        {bowler.teamName}
      </td>
      <td style={{ border: "1px solid black", padding: "8px" }}>
        {bowler.address}
      </td>
      <td style={{ border: "1px solid black", padding: "8px" }}>
        {bowler.city}
      </td>
      <td style={{ border: "1px solid black", padding: "8px" }}>
        {bowler.state}
      </td>
      <td style={{ border: "1px solid black", padding: "8px" }}>
        {bowler.zip}
      </td>
      <td style={{ border: "1px solid black", padding: "8px" }}>
        {bowler.phoneNumber}
      </td>
    </tr>
  );
};
