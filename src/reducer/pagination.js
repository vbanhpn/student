import { actionType } from "../action/actionType";
import studentData from "../studentData";
const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }
  return range;
};
const calculateTotalPage = () => {
  const itemPerPage = 5;
  switch (studentData.length % itemPerPage) {
    case 0: {
      return studentData.length / itemPerPage;
    }
    default:
      return Math.floor(studentData.length / itemPerPage) + 1;
  }
};
// tự động tạo trang theo số lượng sinh viên
const fetchPageNumbers = () => {
  const totalBlocks = 5;
  const totalPages = calculateTotalPage();
  if (totalPages > totalBlocks) {
    let pages = [];
    return [1, ...pages, totalPages];
  }
  return range(1, totalPages);
};
export const pagination = (
  state = {
    total: calculateTotalPage(),
    currentPage: 1,
    pagesNumber: fetchPageNumbers(), /// tự động đếm trang
  },
  action
) => {
  switch (action.type) {
    case actionType.MOVE_TO_NEXTPAGE: {
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    }
    case actionType.MOVE_TO_PREVIOUSPAGE: {
      return {
        ...state,
        currentPage: state.currentPage - 1,
      };
    }
    case actionType.MOVE_EXACTLY_TO_PAGE: {
      return {
        ...state,
        currentPage: action.payload.page,
      };
    }
    case actionType.INCREASE_PAGENUMBER: {
      return {
        ...state,
        pagesNumber: state.pagesNumber.map((number) => number + 1),
      };
    }
    case actionType.DECREASE_PAGENUMBER: {
      return {
        ...state,
        pagesNumber: state.pagesNumber.map((number) => number - 1),
      };
    }

    default:
      return state;
  }
};
