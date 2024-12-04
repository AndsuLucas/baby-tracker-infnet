import {Outlet} from "react-router-dom";
import "./styles.scss";
import {UserProvider} from "./data/AuthProvider";
import {BabyProvider} from "./data/BabyProvider";

export default function App() {
    return (
        <div className="App">
            <main>
                <UserProvider>
                    <BabyProvider>
                        <Outlet/>
                    </BabyProvider>
                </UserProvider>
            </main>
            <footer></footer>
        </div>
    );
}
