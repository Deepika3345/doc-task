import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import docsServices from "./docsService";

const initialState = {
  documents: [],
  docs: {},
  isLoading: false,
  isSuccess: false,
  isError: false,
  edit: {
    edit: {},
    isedit: false,
  },
  message: "",
};
const docSlice = createSlice({
  name: "docs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all docs
      .addCase(fetchDocs.pending, (state) => {
        (state.isLoading = true),
          (state.isError = false),
          (state.isSuccess = false),
          (state.message = "");
      })
      .addCase(fetchDocs.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.isSuccess = true),
          (state.message = ""),
          (state.documents = action.payload);
      })
      .addCase(fetchDocs.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.isSuccess = false),
          (state.message = action.payload);
      })
      // single doc
      .addCase(fetchDoc.pending, (state) => {
        (state.isLoading = true),
          (state.isError = false),
          (state.isSuccess = false),
          (state.message = "");
      })
      .addCase(fetchDoc.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.isSuccess = true),
          (state.message = ""),
          (state.docs = action.payload);
      })
      .addCase(fetchDoc.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.isSuccess = false),
          (state.message = action.payload);
      })
      // create doc
      .addCase(createNewDoc.pending, (state) => {
        (state.isLoading = true),
          (state.isError = false),
          (state.isSuccess = false),
          (state.message = "");
      })
      .addCase(createNewDoc.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.isError = false),
          (state.isSuccess = true),
          (state.message = ""),
          (state.docs = action.payload);
      })
      .addCase(createNewDoc.rejected, (state, action) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.isSuccess = false),
          (state.message = action.payload);
      })
      // Remove Doc
      .addCase(removeDoc.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
        state.message = "";
      })
      .addCase(removeDoc.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
        state.documents = state.documents.filter(
          (doc) => doc.id !== action.payload.id
        );
      })
      .addCase(removeDoc.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })

      // Edit ticket
    
      .addCase(editDoc.fulfilled, (state, action) => {
        state.edit = { edit: action.payload, isedit: true };
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "";
      })
    
  },
});
export default docSlice.reducer;
// all docs
export const fetchDocs = createAsyncThunk(
  "GET/DOCUMENTS",
  async (_, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token;
      return await docsServices.getDocs(token);
    } catch (error) {
      const message = response.data.error.message;
      return thunkAPI.rejectWithValue(message)
    }
  }
);
// Single doc

export const fetchDoc = createAsyncThunk("DOC/SINGLE", async (id, thunkAPI) => {
  try {
    const token = await thunkAPI.getState().auth.user.token;
    return await docsServices.getDoc(id, token);
  } catch (error) {
    const message = error.message.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});
// Create doc
export const createNewDoc = createAsyncThunk(
  " DOC/CREATE",
  async (formData, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token;
      return await docsServices.createDoc(formData, token);
    } catch (error) {
      const message = error.message.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Delete doc
export const removeDoc = createAsyncThunk(
  " DOC/DELETE",
  async (id, thunkAPI) => {
    try {
      const token = await thunkAPI.getState().auth.user.token;
      return await docsServices.dltDoc(id, token);
    } catch (error) {
      const message = error.message.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Update doc
export const updateDoc = createAsyncThunk(
  "DOC/UPDATE",
  async (newData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
       const data =await docsServices.updateDocService(newData._id, newData, token);
      //  console.log(data)
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//  Update doucuments
export const editDoc = createAsyncThunk("EDIT/DOC",async(data) => {
  // console.log(data)
  return data;
});
