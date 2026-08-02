import { BrowserRouter,Routes,Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import LostItems from "../pages/LostItems";
import FoundItems from "../pages/FoundItems";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout";
import FoundItemDetails from "../pages/FoundItemDetails";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOtp from "../pages/VerifyOtp";
import ResetPassword from "../pages/ResetPassword";
import ProtectedRoute from "../pages/ProtectedRoute";
import ReportLostItem from "../pages/ReportLostItem";
import ReportFoundItem from "../pages/ReportFoundItem";
import MyLostItems from "../pages/MyLostItems";
import MyFoundItems from "../pages/MyFoundItems";
import EditLostItem from "../pages/EditLostItem";
import FoundMatches from "../pages/FoundMatches";
import PendingRequests from "../pages/Pendingrequests";
import SentRequests from "../pages/SentRequests";
import Admin from "../pages/Admin";

function AppRoutes(){
    return(
        <BrowserRouter>
        <Routes>
            <Route element={<MainLayout />} >
            <Route path="/" element={<Home/>}/>
              
                
              <Route path="/lost-items" element={<LostItems/>}/>
              <Route path="/found-items" element={<FoundItems/>}/>

               </Route>
               <Route path="/found-items/:id" element={<FoundItemDetails/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>

              <Route path="/profile" element={<ProtectedRoute>   
                <Profile/>
                </ProtectedRoute>
                }/>
                <Route path="/report-lost-item" element={ <ProtectedRoute>   <ReportLostItem/>      </ProtectedRoute> }/>
                <Route path="/report-found-item" element={<ProtectedRoute><ReportFoundItem /></ProtectedRoute>} />
                <Route path="/my-lost-items" element ={<ProtectedRoute> <MyLostItems/>    </ProtectedRoute>}/>
                <Route path="/my-found-items" element={<ProtectedRoute><MyFoundItems /></ProtectedRoute>} />
                <Route path ="/edit-lost-item/:id" element={<ProtectedRoute><EditLostItem/></ProtectedRoute>}/>
                <Route path ="/matches/:lostItemId" element ={ <ProtectedRoute>  <FoundMatches/></ProtectedRoute>}/>

              
              <Route  path="/pending-requests" element={ <ProtectedRoute> <PendingRequests /></ProtectedRoute>}/>
              <Route path="/contact-requests" element={<ProtectedRoute><SentRequests /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute requiredRole="Admin"><Admin /></ProtectedRoute>} />

              <Route path="/sent-requests"element={<ProtectedRoute><SentRequests /></ProtectedRoute>}/>


              <Route path="/forgot-password" element={<ForgotPassword/>}/>
              <Route path="/verify-otp" element={<VerifyOtp/>}/>
              <Route path ="/reset-password" element={<ResetPassword/>}/>
                <Route path="*" element={<NotFound/>}/>
               
        </Routes>
        </BrowserRouter>
    )
}
export default AppRoutes;
