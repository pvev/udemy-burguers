// import React from "react";
// import classes from "./NavigationItems.module.css";

// import NavigationItem from "./NavigationItem/NavigationItem";

// const navigationItems = (props) => {
//   return (
//     <ul className={classes.NavigationItems} onClick={props.closeSidebar}>
//       <NavigationItem link="/" exact>
//         Burger Builder
//       </NavigationItem>
//       {props.isAuthenticated ? (
//         <NavigationItem link="/orders">Orders</NavigationItem>
//       ) : null}
//       {!props.isAuthenticated ? (
//         <NavigationItem link="/auth">Authenticate</NavigationItem>
//       ) : (
//         <NavigationItem link="/logout">Logout</NavigationItem>
//       )}
//     </ul>
//   );
// };

// export default navigationItems;
import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

describe("Component Navigation", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  it("should render two navigation items if not authenticated", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render three navigation items if  authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("should render the logout navigation item if  authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)
    ).toEqual(true);
  });
});
