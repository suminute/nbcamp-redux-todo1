import shortid from "shortid";

const initialState = [
  {
    id: shortid.generate(),
    todoId: "",
    contents: "댓글1",
    date: new Date(),
  },
];

const reviews = (state = initialState, action) => {
  switch (action.type) {
    case "SAVE_REVIEW":
      return [...state, action.payload];

    case "DELETE_REVIEW":
      return state.filter((review) => review.id !== action.payload);

    default:
      return state;
  }
};

export default reviews;
