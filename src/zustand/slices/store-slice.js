import storeApi from "../../apis/store";

const initialState = {
    storeId: 0,
    selectedStoreDetails :null,
}

export const createStoreSlice = (set) =>({
    ...initialState,
    setStoreId: (storeId) => {
        console.log("setting store Id to be ", storeId )
        set(()=>({
            storeId: storeId
        }))
    },
    setSelectedStoreDetails : async (storeId,isAuthenticated) => {
        try{
            let result 
           if(isAuthenticated){
            console.log("Fetching data from Backend, storeId",storeId)
        
      result = await storeApi.getStoreByIdLoggedIn(storeId);
      console.log("result from getting event details, loggedIn", result.data); // run แล่้ว ได่
    } else {
        console.log("Fetching data from Backend, storeId",storeId)
        result = await storeApi.getStoreByIdAnonymous(storeId);
        console.log("result from getting event details, anonymous", result.data); // run แล่้ว ได่
    }
    // เรียก update storeDetail
      set(() => ({
        selectedStoreDetails: result.data,
      }));
        } catch(err){
            console.log("error from fetching store details", err);
        }
    }


})