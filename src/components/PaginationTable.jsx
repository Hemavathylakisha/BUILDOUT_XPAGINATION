import React, { useEffect, useState } from "react";

const PAGE_SIZE = 10;

const PaginationTable = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!res.ok) throw new Error("Fetch failed");
        const json = await res.json();
        setData(json);
      } catch (err) {
        alert("failed to fetch data");
        console.error("Error fetching data:", err);
        setError(true);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentData = data.slice(startIndex, startIndex + PAGE_SIZE);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  if (error) return null;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee Data</h2>
      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr style={{ background: "#f2f2f2" }}>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((employee, index) => (
            <tr key={employee.id} data-testid={`row-${index}`} data-id={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
       <button
  onClick={handlePrevious}
  disabled={currentData.length === 0 || currentPage <= 1}
  data-testid="pagination-previous"
>
  Previous
</button>

<button
  onClick={handleNext}
  disabled={currentData.length === 0 || currentPage >= totalPages}
  data-testid="pagination-next"
>
Next
</button>
      </div>
    </div>
  );
};

export default PaginationTable;
