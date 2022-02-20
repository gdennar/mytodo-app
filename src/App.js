import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Reset from "./Reset";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <div className="App">
     <Router>
				<AuthProvider>
					<Routes>
						
							<Route path="/" element={<Login />} />
						
						<Route exact path="/register" element={<Register />} />
						<Route exact path="/reset" element={<Reset />} />
            <Route element = {<PrivateRoute />}>
						<Route exact path="/dashboard" element={<Dashboard />}/>
            </Route>
					</Routes>
				</AuthProvider>
			</Router>
    </div>
  );
}

export default App;
