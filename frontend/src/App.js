// import '@fortawesome/fontawesome-free/css/all.min.css';
// index.js or App.js
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "./App.css"
import { AppLayout } from './components/AppLayout';
import { CivicBot } from './components/CivicBot';

function App() {
  return (
    <div>
      <AppLayout />
      {/* <CivicBot/> */}
    </div>
  );
}

export default App;



//✅ making Registration and Login differently.In registration we have to create a controller which takes any thing in attributes and values to find things.
//✅ making the timer showing in otp , when timer will over then only user can again send otp.
//✅ making Registration then only it shows upload and display issue in header and if not login then also it will do not show.
//✅ user can report the issue at display issue.
//✅ making user profile component ,which contain there name and phone number ,showing there uploaded issues and update button at there uploaded issues, so that user can correct there misstake uploaded issues.
//✅ in Display issue only accepted and reported will show.
//✅ Status can store multipal things like accepted ,reported,etc..
// taking user location automatically .