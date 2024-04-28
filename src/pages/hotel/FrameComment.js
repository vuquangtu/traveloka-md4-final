import React, { useEffect, useState } from "react";
import axios from "../../config/privateAxios";
import { useParams } from "react-router-dom";
import CustomerReview from "./CustomerReview";

function FrameComment() {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/reviews/hotel/${id}`, {
          params: { page: currentPage },
        })
        .then((res) => {
          setReviews(res.data.content);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let startPage = Math.max(0, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + 3);
  if (currentPage > 1) {
    startPage = currentPage - 1;
    endPage = Math.min(totalPages, currentPage + 2);
  }

  return (
    <div
      style={{
        backgroundColor: "rgb(247, 249, 250)",
      }}
    >
      <div>
        {reviews.map((review, index) => (
          <CustomerReview key={index} review={review} />
        ))}
      </div>

      <div className="space-x-2 items-center flex justify-end">
        {startPage > 0 && (
          <div>
            <button
              className="mb-2 bg-slate-200 hover:bg-slate-300 justify-items-end rounded-lg px-3 py-3"
              style={{
                color: "#0194F3",
                fontWeight: 700,
              }}
            >
              ...
            </button>
          </div>
        )}
        {[...Array(endPage - startPage)].map((_, index) => {
          const pageNumber = startPage + index;
          const isActive = pageNumber === currentPage;
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`mb-2 bg-slate-200 hover:bg-slate-300 justify-items-end rounded-lg px-3 py-3 ${
                isActive
                  ? "bg-sky-400 text-red-500 font-bold"
                  : "text-sky-500 font-bold hover:bg-slate-300"
              }`}
            >
              {pageNumber + 1}
            </button>
          );
        })}
        {endPage < totalPages && (
          <div>
            <button
              className="mb-2 bg-slate-200 hover:bg-slate-300 justify-items-end rounded-lg px-3 py-3"
              style={{
                color: "#0194F3",
                fontWeight: 700,
              }}
            >
              ...
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default FrameComment;
