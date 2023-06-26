import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import shortid from "shortid";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const todos = useSelector((state) => state.todos);

  const reviews = useSelector((state) => state.reviews);
  const [contents, setContents] = useState("");
  const dispatch = useDispatch();
  const review = reviews.filter((review) => review.todoId === id);

  const todo = todos.filter((todo) => todo.id === id)[0];

  return (
    <div>
      {todo.id}
      <br />
      {todo.title}
      <br />
      {todo.body}
      <br />
      {todo.isDone.toString()}
      <br />
      <button onClick={() => navigate("/")}>이전 화면으로</button>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          dispatch({
            type: "SAVE_REVIEW",
            payload: {
              id: shortid.generate(),
              todoId: id,
              contents: contents,
              date: new Date(),
            },
          });

          setContents("");
        }}>
        <label>댓글</label>
        <input
          value={contents}
          onChange={(e) => {
            setContents(e.target.value);
          }}
        />
        <button>저장</button>
      </form>
      <div>
        {review
          .sort((a, b) => {
            return b.date - a.date;
          })
          .map((review) => {
            return (
              <div key={review.id}>
                <p>{review.contents}</p>
                <p>{review.date.toString()}</p>
                <button
                  onClick={() => {
                    dispatch({
                      type: "DELETE_REVIEW",
                      payload: review.id,
                    });
                  }}>
                  삭제
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Detail;
