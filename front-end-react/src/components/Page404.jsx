// import '../../../../front-end-shared/css/404.css'
import './Page404.css'

export function Page404() {
  return (
    <div className="container-404">
        <div className="notfound">
            <div>
                <h2>Error<br/>404</h2>
                <div className="notfound-404">
                    <h1>!</h1>
                </div>
            </div>
            <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable. <a href="#">Back to homepage</a></p>
        </div>
    </div>
  );
}