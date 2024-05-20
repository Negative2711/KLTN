// src/redux/reducers/userReducer.js
const initialState = {
    name: '',
    email: '',
    // Thêm các thuộc tính khác nếu cần
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  };
  
  export default userReducer;
  