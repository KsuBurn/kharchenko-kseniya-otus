import {FC} from 'react';
import {NavLink} from 'react-router-dom';

export const ErrorPage: FC = () => {
  return (
    <div>
      <p>Page not found</p>
      <div>
        Go back to <NavLink to={'/'}>main page</NavLink>
      </div>
    </div>
  )
}
